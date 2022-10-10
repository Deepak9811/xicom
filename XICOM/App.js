import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';


import Home from './src/screens/Home';
import DetailsScreen from './src/screens/DetailsScreen';



console.disableYellowBox = true;

export default class App extends Component {
  componentDidMount() {

    setTimeout(() => {
      
      SplashScreen.hide();
    }, 1000);
  
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
           
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const Stack = createNativeStackNavigator();

