/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Routers from './src/Routers';

const backgroundColor = "#f2f2f2"
// because status bar in ios not really work
const IosRouteSafe = () => (
  <React.Fragment>
    <View style={{backgroundColor: backgroundColor, height: 40}}>
      <StatusBar backgroundColor={backgroundColor} barStyle="light-content" networkActivityIndicatorVisible={false}/>
    </View>
    {/* make sure color is same as header */}
    <View style={{backgroundColor: backgroundColor, flex: 1}}><Routers /></View>
  </React.Fragment>
)
const AndroidRouteSafe = () => (
  <React.Fragment>
    <StatusBar backgroundColor={backgroundColor} barStyle="light-content" networkActivityIndicatorVisible={false}/>
    <SafeAreaView style={{flex:1}}>
      <Routers />
    </SafeAreaView>
  </React.Fragment>
)

export default function () {
  return (<NativeBaseProvider>
    {Platform.OS === "ios" ? <IosRouteSafe /> : <AndroidRouteSafe />}
  </NativeBaseProvider>)
}
