import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Image,
} from '@rneui/themed'

const IMG_URL = require('./assets/home.png')

export default function App() {
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={IMG_URL}
      />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  imageContainer: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  }
});
