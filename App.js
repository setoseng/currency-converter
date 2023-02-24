import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from '@rneui/base';

import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();
const bgUrl = require('./assets/bg.png');

const headerOption = {
  headerShown: true,
  title: 'Converter',
  headerStyle:  {
    backgroundColor: '#2DBBFE',
  },
  headerTitleStyle: {
    color: '#FFF'
  },
  headerTintColor: '#FFF',
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: 'Converter',
            headerTransparent: true,
            headerTitleStyle: {
              color: '#FFF'
            },
            headerTintColor: '#FFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

