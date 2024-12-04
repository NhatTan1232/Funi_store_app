import React from 'react';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from '../screens/context/CartContext';  
import HomePage from '../screens/HomePage';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReviewScreen from '../screens/ReviewScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    console.log('ohno')
    return null;
  }

  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
              title: 'Cart',
              headerTitleStyle: {
                fontFamily: 'PlayfairDisplay_700Bold', 
                fontSize: 20, 
              },
              headerTitleAlign: 'center', 
            }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              title: 'Checkout',
              headerTitleStyle: {
                fontFamily: 'PlayfairDisplay_700Bold', 
                fontSize: 20, 
              },
              headerTitleAlign: 'center', // Center the header title
            }}
          />
          <Stack.Screen
            name="ReviewScreen"
            component={ReviewScreen}
            options={{
              title: 'Reviews',
              headerTitleStyle: {
                fontFamily: 'PlayfairDisplay_700Bold', 
                fontSize: 20, 
              },
              headerTitleAlign: 'center', // Center the header title
            }}
          />
          <Stack.Screen
            name="WriteReviewScreen"
            component={WriteReviewScreen}
            options={{ 
              title: 'Write review',
              headerTitleStyle: {
                fontFamily: 'PlayfairDisplay_700Bold', 
                fontSize: 20, 
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{
              title: 'Product detail',
              headerTitleStyle: {
                fontFamily: 'PlayfairDisplay_700Bold', 
                fontSize: 20, 
              },
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
}
