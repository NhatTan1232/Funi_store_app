import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

import Header from '../assets/components/Header';  
import searchIcon from '../assets/icons/search_icon.png';  
import products from '../assets/components/storeProduct';
import { AntDesign } from '@expo/vector-icons'; 

const ProductItem = ({ product }) => {
  const navigation = useNavigation();

  const handleProductPress = () => {
    navigation.navigate('ProductScreen', { product });
  };

  return (
    <TouchableOpacity style={styles.productItem} onPress={handleProductPress}>
      <View style={styles.colorCirclesContainer}>
        {product.color.map((colorItem) => (
          <View
            key={colorItem.color_id}
            style={[styles.colorCircle, { backgroundColor: colorItem.color_name }]}
          />
        ))}
      </View>
      <Image source={product.color[0].picture} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}đ</Text>
    </TouchableOpacity>
  );
};

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { categoryName } = route.params;

  const filteredProducts = products.filter((product) => product.type === categoryName);

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen'); 
  };

  const handleBackPress = () => {
    navigation.goBack(); 
  };

  let [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Header />
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
        <Image source={searchIcon} style={styles.searchIcon} />
      </TouchableOpacity>

      <View style={styles.topSalerContainer}>
        <Text style={styles.topSalerTitle}>{categoryName} Products</Text>
        {filteredProducts.length === 0 ? (
          <Text>No products available in this category.</Text>
        ) : (
          filteredProducts.map((product, index) => {
            if (index % 2 === 0) {
              return (
                <View style={styles.row} key={index}>
                  <ProductItem product={product} />
                  {filteredProducts[index + 1] && (
                    <ProductItem product={filteredProducts[index + 1]} />
                  )}
                </View>
              );
            }
            return null;
          })
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 5,
  },
  searchButton: {
    position: 'absolute',
    top: 48,
    right: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    width: 25,
    height: 25,
    tintColor: '#333',
  },
  topSalerContainer: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    elevation: 2,
  },
  topSalerTitle: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
    position: 'relative',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    zIndex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
    textAlign: 'center',
  },
  colorCirclesContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    zIndex: 2,
  },
  colorCircle: {
    width: 11,
    height: 11,
    borderRadius: 5,
    marginRight: 7,
  },
});

export default CategoryScreen;
