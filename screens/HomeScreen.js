import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { Button } from '@rneui/base';

import tw from 'twrnc';

const imgUrl = require('../assets/home.png');

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
        <ImageBackground
          source={imgUrl}
          resizeMethod="cover"
          style={tw`flex-1`}
        >
          <View style={tw`flex-2 justify-end mb-20`}>
            <Text style={tw`text-white text-center text-6xl`}>Kurrency</Text>
            <Text style={tw`text-white text-center text-2xl`}>Easy Exchange</Text>
          </View>
          <View style={tw`flex-1 justify-end`}>
            <Button
              size="lg"
              title={'Get Started'}
              containerStyle={tw`mx-auto my-10`}
              buttonStyle={tw`w-50 h-15 rounded-md`}
              onPress={() => navigation.navigate('Main')}
            />
          </View>
        </ImageBackground>
    </SafeAreaProvider>
  )
}

export default HomeScreen