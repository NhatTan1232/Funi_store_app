import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Header = () => {
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
    fontWeight: 'bold',
    color: '#000', 
    flex: 1, 
    textAlign: 'center', 
    fontFamily: 'System', 
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
