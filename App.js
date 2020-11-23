/***
* @author Evgeniya Zemlyanaya @zzemlyanaya
*/
'use strict';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TodoScreen from './Screens/TodoScreen';
import LoginScreen from './Screens/LoginScreen';
 import ArchiveScreen from './Screens/ArchiveScreen'


export default function App() {

  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Todo" component={TodoScreen} />
        <MainStack.Screen name="Archive" component={ArchiveScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
