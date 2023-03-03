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
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const MainScreen = () => {
  const { getLatestData, data } = useContext(CurrencyContext);
  const [isInputting, setIsInputting] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [toOption, setToOption] = useState('VND');
  const [toCurrency, setToCurrency] = useState(1);
  const [fromOpen, setFromOpen] = useState(false);
  const [fromOption, setFromOption] = useState('USD');
  const [fromCurrency, setFromCurrency] = useState(1);
  const [isRequesting, setisRequesting] = useState(false);
  const [conversionRate, setConversionRate] = useState(0);
  const [items, setItems] = useState([
    {label: 'USD', value: 'USD'},
    {label: 'VND', value: 'VND'}
  ]);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  const requestCurrencyData = async () => {
    //getLatestData(fromValue)
    //setFromAmount(1)
    //setToAmount(data.rates[toValue])
    setToAmount(fromAmount * conversionRate);
  };

  useEffect(() => {
    //requestCurrencyData({to: 'VND', from: 'USD', amount: '120'})
    if(data !== null) {
      setFromAmount(1)
      setToAmount(data.rates[toOption])
      setConversionRate(data.rates[toOption])
    }
  }, []);

  const handleToAmount = (value) => setToAmount(value);

  const handleFromAmount = (value) => setFromAmount(value);  

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
                value={fromOption}
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
                value={toOption}
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
          <Button
            title={"Convert"}
            textStyle={tw`text-white`}
            containerStyle={tw`flex-1 mx-auto mt-10`}
            buttonStyle={tw`w-50 h-15 rounded-md`}
            onPress={requestCurrencyData}
            loading={isRequesting}
            disabled={isRequesting}
          />
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