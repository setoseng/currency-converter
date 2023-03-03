import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Text, Divider, Button } from '@rneui/base';
import { Icon } from '@rneui/themed';
import tw from 'twrnc';

import DropDownPicker from 'react-native-dropdown-picker';
import CustomInput from '../components/CustomInput';
import bgImg from '../assets/bg.png';
import overlayImg from '../assets/overlay.png';

import { CurrencyContext } from '../context/currency';


const myHeaders = new Headers();
myHeaders.append("apikey", "Y8EjkMaRIbyKPNLNTUR3huMYNwhcc1Xq");

const API_URL = `Y8EjkMaRIbyKPNLNTUR3huMYNwhcc1Xq`;
const BASE_URL = 'https://api.exchangeratesapi.io/latest';

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const MainScreen = () => {
  const { getLatestData, data } = useContext(CurrencyContext);
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [isInputting, setIsInputting] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [toOption, setToOption] = useState('VND');
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [fromOpen, setFromOpen] = useState(false);
  const [fromOption, setFromOption] = useState('USD');
  const [fromCurrency, setFromCurrency] = useState()
  const [isRequesting, setisRequesting] = useState(false);
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  
  const [items, setItems] = useState([
    {label: 'USD', value: 'USD'},
    {label: 'VND', value: 'VND'}
  ]);


  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch("https://api.apilayer.com/exchangerates_data/latest?&base=USD", requestOptions)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.info.rate);
        })
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmount = (value) => {
    setAmount(value)
    setAmountInFromCurrency(true)
  };

  const handleToAmount = (value) => {
    setAmount(value);
    setAmountInFromCurrency(false);
  };

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={bgImg}
        resizeMethod="cover"
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 bg-transparent`}>
          <View style={tw`flex-2 justify-end`}>
            <View style={tw`flex-row my-8 mx-10 justify-between items-end`}>
              <DropDownPicker
                open={fromOpen}
                value={currencyOptions}
                items={items}
                setOpen={setFromOpen}
                setValue={setFromOption}
                setItems={setItems}
                containerStyle={tw`w-25 h-10`}
                labelStyle={tw`p-0 m-0 `}
                textStyle={tw`p-0 m-0`}
              />
              <CustomInput
                value={fromAmount}
                onChangeText={handleFromAmount}
                style={tw`text-white text-lg border-b border-sky-300`}
                placeholder={fromAmount.toString()}
                placeholderTextColor={'#e0e0e0'}
                keyboardType='number-pad'
                returnKeyType='done'
                containerStyle={tw`w-35`}
                onPressIn={() => setIsInputting(true)}
                onEndEditing={() => setIsInputting(false)}
              />
            </View>
            <View style={tw`flex-row my-8 mx-10 justify-between items-center`}>
              <Divider
                style={tw`w-80% my-5`}
                color="#FFF"
                width={1}
                orientation="horizontal"
              />
              <Icon
                name='arrow-v'
                type='fontisto'
                containerStyle={tw`border border-white rounded-full w-10 h-10 justify-center bg-white`}
                color='#21CEFF'
              />
            </View>
            <View style={tw`flex-row my-8 mx-10 justify-between items-end`}>
              <DropDownPicker
                open={toOpen}
                value={currencyOptions}
                items={items}
                setOpen={setToOpen}
                setValue={setToOption}
                setItems={setItems}
                containerStyle={tw`w-25 h-10`}
                labelStyle={tw`p-0 m-0`}
                textStyle={tw`p-0 m-0`}
              />
              <CustomInput
                value={toAmount} 
                onChangeText={handleToAmount}
                disabled="true"
                style={tw`text-white text-xl border-b border-sky-300`}
                placeholder={toAmount.toString()}
                placeholderTextColor={'#e0e0e0'}
                keyboardType='number-pad'
                returnKeyType='done'
                containerStyle={tw`w-35`}
                onPressIn={() => setIsInputting(true)}
                onEndEditing={() => setIsInputting(false)}
              />
            </View>
          </View>
          {/* <Button
            title={"Convert"}
            textStyle={tw`text-white`}
            containerStyle={tw`flex-1 mx-auto mt-10`}
            buttonStyle={tw`w-50 h-15 rounded-md`}
            onPress={requestCurrencyData}
            loading={isRequesting}
            disabled={isRequesting}
          /> */}
          { isInputting && 
            <ImageBackground
              source={overlayImg}
              resizeMethod='scale'
              style={tw`flex-1`}
            />
          }
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  )
}

export default MainScreen