//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navigation from './Component/Navigation/Navigation';
import SplashScreen from 'react-native-splash-screen'

// create a component
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  })
  return (
<Navigation/>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
