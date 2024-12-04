import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../assets/components/Header';  
import searchIcon from '../assets/icons/search_icon.png';  
import products from '../assets/components/storeProduct';

const ProductItem = ({ product }) => {
  const navigation = useNavigation();
  
  const handleProductPress = () => {
    navigation.navigate('ProductScreen', { product }); 
  };

  return (
    <TouchableOpacity style={styles.productItem} onPress={handleProductPress}>
      <Image source={product.color[0].picture} style={styles.productImage} resizeMode='contain'/>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
    </TouchableOpacity>
  );
};

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { categoryName } = route.params;
  
  const filteredProducts = products.filter(product => product.type === categoryName);

  const handleSearchPress = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
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
  searchButton: {
    position: 'absolute', 
    top: 40, 
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
    fontWeight: 'bold',
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
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
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
});

export default CategoryScreen;
