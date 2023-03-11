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

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const MainScreen = () => {
  const { getLatestData, data } = useContext(CurrencyContext);
  const [isInputting, setIsInputting] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [fromOpen, setFromOpen] = useState(false);
  const [fromCurrency, setFromCurrency] = useState();
  const [isRequesting, setisRequesting] = useState(false);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [toFormatted, setToFormatted] = useState();
  const [fromFormatted, setFromFormatted] = useState();

  const [pickerItems, setPickerItems] = useState([]);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  const buildPickerItems = () => {
    let pickerItem = []
    Object.keys(data.rates).map(item => {
      pickerItem.push({
        label: item,
        value: item,
      })
      setPickerItems(pickerItem, pickerItems)
    })
  }

  useEffect(() => {
    if(data === null || data === undefined){
      getLatestData();
    }

    if(pickerItems === undefined || pickerItems.length == 0) {
      buildPickerItems();
    }

    const firstCurrency = Object.keys(data.rates)[0];
    const defaultToCurrency = 'VND'
    setFromCurrency(data.base);
    setToCurrency(defaultToCurrency);
    setExchangeRate(data.rates[defaultToCurrency]);
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      const fromRates = data.rates[fromCurrency];
      const toRates = data.rates[toCurrency];
      setExchangeRate(toRates / fromRates)
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if(fromCurrency) {
      setFromFormatted(new Intl.NumberFormat('en-IN', {
       style: 'currency',
       currency: fromCurrency,
       maximumFractionDigits: 3,
      }).format(fromAmount));
    } else {
      setFromFormatted(new Intl.NumberFormat('en-IN', {
       style: 'currency',
       currency: 'USD',
       maximumFractionDigits: 3,
      }).format(fromAmount));
    }
    
  },[fromAmount])

  useEffect(() => {
    if(toCurrency) {
      setToFormatted(new Intl.NumberFormat('en-IN', {
       style: 'currency',
       currency: toCurrency,
       maximumFractionDigits: 3,
      }).format(toAmount));
    }
    
  },[toAmount])

  const handleFromAmount = (value) => {
    setAmount(value);
    setAmountInFromCurrency(true);
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
          <View style={tw`flex-2 justify-center`}>
            <View style={tw`flex-row my-8 mx-10 justify-between items-end`}>
              <DropDownPicker
                open={fromOpen}
                value={fromCurrency}
                items={pickerItems}
                setOpen={setFromOpen}
                setValue={setFromCurrency}
                setItems={setPickerItems}
                containerStyle={tw`w-25 h-10`}
                labelStyle={tw`p-0 m-0 `}
                textStyle={tw`p-0 m-0`}
              />
              <CustomInput
                value={fromAmount}
                onChangeText={handleFromAmount}
                style={tw`text-white text-lg border-b border-sky-300`}
                placeholder={fromFormatted}
                placeholderTextColor={'#E6E6E6'}
                keyboardType='number-pad'
                returnKeyType='done'
                containerStyle={tw`w-35`}
                onPressIn={() => {
                  setIsInputting(true)
                  
                }}
                onEndEditing={() => {
                  setIsInputting(false);
                }}
              />
            </View>
            <View style={tw`flex-row my-8 mx-10 justify-between items-center`}>
              <Divider
                style={tw`w-100% my-5`}
                color="#FFF"
                width={1}
                orientation="horizontal"
              />
              {/* <Icon
                name='swap-vertical-sharp'
                type='ionicon'
                iconStyle={tw`text-3xl`}
                containerStyle={tw`border border-white rounded-full w-10 h-10 justify-center bg-white`}
                color='#21CEFF'
              /> */}
            </View>
            <View style={tw`flex-row my-8 mx-10 justify-between items-end`}>
              <DropDownPicker
                open={toOpen}
                value={toCurrency}
                items={pickerItems}
                setOpen={setToOpen}
                setValue={setToCurrency}
                setItems={setPickerItems}
                containerStyle={tw`w-25 h-10`}
                labelStyle={tw`p-0 m-0`}
                textStyle={tw`p-0 m-0`}
              />
              <CustomInput
                value={toAmount}
                onChangeText={handleToAmount}
                disabled="true"
                style={tw`text-white text-xl border-b border-sky-300`}
                placeholder={toFormatted}
                placeholderTextColor={'#E6E6E6'}
                keyboardType='number-pad'
                returnKeyType='done'
                containerStyle={tw`w-35`}
                onPressIn={() => {
                  setIsInputting(true)
                }}
                onEndEditing={() => {
                  setIsInputting(false);
                }}
              />
            </View>
          </View>
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