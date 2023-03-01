import React, { useState } from 'react'
import {
  View,
  TextInput
} from 'react-native'
import tw from 'twrnc'

const CustomInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[props.containerStyle, isFocused && tw`width-50`]}>
      <TextInput
        {...props}
        style={[props.style, isFocused && tw`border-black `]}
      />
    </View>
  )
}

export default CustomInput