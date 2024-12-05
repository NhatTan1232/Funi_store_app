// App.js
import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './screens/AppNavigator';
import AuthNavigator from './screens/AuthNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator setIsLoggedIn={setIsLoggedIn}/>}
    </NavigationContainer>
  )
}
