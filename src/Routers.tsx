
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screen/SplashScreen';
import HomeScreen from './screen/HomeScreen';


export type RoutersParamList = {
    SplashScreen: undefined,
    HomeScreen: undefined
}



const Stack = createStackNavigator<RoutersParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;