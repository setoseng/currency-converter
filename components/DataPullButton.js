import React, { useContext, useState} from 'react'
import { Image, Button } from '@rneui/base';
import { Icon } from '@rneui/themed';
import tw from 'twrnc';
import { ActivityIndicator } from 'react-native';

import { CurrencyContext } from '../context/currency';


const DataPullButton = () => {
  const { data, getLatestData } = useContext(CurrencyContext)
  const [isFetching, setIsFetching] = useState(false);
  
  const handleLatestPull = () => {
    setIsFetching(true);
    getLatestData('USD');
    setIsFetching(false);
  }

  return (
    <Button
      type="clear"
      onPress={handleLatestPull}
      style={tw`border-white border rounded-lg h-10 w-12 justify-center`}
    >
      {
        isFetching
        ?
          <ActivityIndicator color="#FFF" />
        :
         <Icon
            name='md-cloud-download-outline'
            type='ionicon'
            iconStyle={tw`text-white`}
            color='#21CEFF'
          />
    }
    </Button>
  )
}

export default DataPullButton