import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const myHeaders = new Headers();
myHeaders.append("apikey", "Y8EjkMaRIbyKPNLNTUR3huMYNwhcc1Xq");
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

export const CurrencyContext = createContext({
  dataOutput: {}
})

export const CurrencyProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isStorageEmpty, setStorageEmpty] = useState(true);

  const getStorageData = async () => {
    try {
      const storageData = await AsyncStorage.getItem('key')
      if(storageData !== null) {
        setData(JSON.parse(storageData))
        setStorageEmpty(false);
      } else {
        setStorageEmpty(true);
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getStorageData()
  }, [])

  const getLatestData = async (base) => {
    await fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${base}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      return setData(JSON.parse(result))
    })
    .catch(error => console.log('error', error));

    try {
      await AsyncStorage.setItem('key', JSON.stringify(data))
    } catch (e) {
      console.log(e);
    }
  }

  const value = {
    data,
    setData,
    getLatestData,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
};