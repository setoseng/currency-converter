import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  ImageBackground,
} from 'react-native';
import { Text, Divider, Input } from '@rneui/base';
import tw from 'twrnc';

import DropDownPicker from 'react-native-dropdown-picker';
import bgImg from '../assets/bg.png';
import overlayImg from '../assets/overlay.png';


const myHeaders = new Headers();
myHeaders.append("apikey", "Y8EjkMaRIbyKPNLNTUR3huMYNwhcc1Xq");

const API_URL = `Y8EjkMaRIbyKPNLNTUR3huMYNwhcc1Xq`;
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const MainScreen = () => {
  const [ isInputting, setInputting ] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [toValue, setToValue] = useState(null);
  const [toAmount, setToAmunt] = useState(null);
  const [fromOpen, setFromOpen] = useState(false);
  const [fromValue, setFromValue] = useState(null);
  const [fromAmount, setFromAmount] = useState(null);
  const [items, setItems] = useState([
    {label: 'USD', value: 'usd'},
    {label: 'VND', value: 'VND'}
  ]);

  const requestCurrencyData = async (payload) => {
    const { to, from, amount } = payload;
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
    //requestCurrencyData({to: 'VND', from: 'USD', amount: '120'})
  }, [])

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={bgImg}
        resizeMethod="cover"
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 bg-transparent`}>
          <View style={tw`flex-1 justify-center`}>
            <View style={tw`flex-row h-20 mx-5 justify-between items-center`}>
              <DropDownPicker
                open={toOpen}
                value={toValue}
                items={items}
                setOpen={setToOpen}
                setValue={setToValue}
                setItems={setItems}
                containerStyle={tw`w-25 h-10`}
                labelStyle={tw`p-0 m-0 `}
                textStyle={tw`p-0 m-0`}
              />
              <Input
                value={toAmount}
                onChangeText={(value) => setToAmunt(value)}
                containerStyle={tw`w-30 h-10`}
                keyboardType='number-pad'
                returnKeyType='done'
              />
            </View>
            <View style={tw`flex-row mx-5 justify-between items-center`}>
              <Divider
                style={tw`w-80% my-5`}
                color="#FFF"
                width={1}
                orientation="horizontal"
              />
              <Text>Hello</Text>
            </View>
            <View style={tw`flex-row h-20 mx-5 justify-between items-center`}>
              <DropDownPicker
                open={fromOpen}
                value={fromValue}
                items={items}
                setOpen={setFromOpen}
                setValue={setFromValue}
                setItems={setItems}
                containerStyle={tw`w-25 h-10`}
                labelStyle={tw`p-0 m-0 `}
                textStyle={tw`p-0 m-0`}
              />
              <Input
                value={fromAmount}
                onChangeText={value => setFromAmount(value)}
                style={tw``}
                containerStyle={tw`w-30 h-10`}
                keyboardType='number-pad'
                returnKeyType='done'
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