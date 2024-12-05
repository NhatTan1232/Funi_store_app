import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const AuthStack = createStackNavigator();

export default function AuthNavigator({ setIsLoggedIn }) {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
        initialParams={{ setIsLoggedIn }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{ headerShown: false }}
        initialParams={{ setIsLoggedIn }}
      />
    </AuthStack.Navigator>
  );
}
