import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

const Header = () => {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.storeName}>Home Essence</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    backgroundColor: '#ffe6cf', 
    paddingHorizontal: 40, 
    paddingVertical: 40, 
    width: '100%', 
  },
  storeName: {
    fontSize: 24,
    color: '#000', 
    flex: 1, 
    textAlign: 'center', 
    fontFamily: 'PlayfairDisplay_700Bold', 
  },
  cartIconContainer: {
    width: 30, 
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    width: '100%',
    height: '100%',
  },
});

export default Header;
