import React from 'react';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartProvider } from '../screens/context/CartContext'; 

import HomePage from '../screens/HomePage';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ReviewScreen from '../screens/ReviewScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductScreen from '../screens/ProductScreen';
import UserPage from '../screens/UserPage';

import SearchScreen from '../screens/SearchScreen'
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StoreStack() {
  return (
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
          headerTitleAlign: 'center',
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
          headerTitleAlign: 'center',
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
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerTitleStyle: {
            fontFamily: 'PlayfairDisplay_700Bold',
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: '#ffe6cf',
          },      
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function UserStack({navigation, route}) {
  const { setIsLoggedIn } = route.params;
  
  return (
    <Stack.Navigator initialRouteName="UserPage">
      <Stack.Screen
        name="UserPage"
        component={UserPage}
        options={{
          title: 'Account',
          headerTitleStyle: {
            fontFamily: 'PlayfairDisplay_700Bold',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
        }}
        initialParams={{ setIsLoggedIn }} 
      />
      {/* Add more screens related to the User tab here */}
    </Stack.Navigator>
  );
}

export default function AppNavigator({ setIsLoggedIn }) {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CartProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            height: 60,
          },
          tabBarActiveTintColor: '#d36a06', 
          tabBarInactiveTintColor: '#888',
          tabBarLabelStyle: {
            fontFamily: 'PlayfairDisplay_700Bold',
            fontSize: 14,
          },
          tabBarShowLabel: false,
          tabBarLabelPosition: 'beside-icon'
        }}
      >
        <Tab.Screen 
          name="Store" 
          component={StoreStack} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="home-outline" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={UserStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="person-circle-outline" color={color} size={30} />
            ),
          }}
          initialParams={{ setIsLoggedIn }}
        />
      </Tab.Navigator>
    </CartProvider>
  );
}
