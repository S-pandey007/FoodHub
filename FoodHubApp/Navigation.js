import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen'
import WelcomScr from './Screens/WelcomScr';
import HomeScreen from './Screens/HomeScreen';
const Stack = createStackNavigator()
const Navigation = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Welcome" component={WelcomScr} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation