import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReviewScreen from '../screens/ReviewScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ title: 'Cart' }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ title: 'Checkout' }}
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{ title: 'Reviews' }}
        />
        <Stack.Screen
          name="WriteReviewScreen"
          component={WriteReviewScreen}
          options={{ title: 'Write Review' }}
        />
        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
