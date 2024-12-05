import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

import Header from '../assets/components/Header';  
import cartIcon from '../assets/icons/cart_icon.png';  
import products from '../assets/components/storeProduct';

const topseller = products.filter(product => [1, 5, 12, 17].includes(product.id));

const categories = [
  { id: '1', name: 'Sofa', icon: require('../assets/icons/sofa_icon.png') },
  { id: '2', name: 'Bed', icon: require('../assets/icons/bed_icon.png') },
  { id: '3', name: 'Table', icon: require('../assets/icons/table_icon.png') },
  { id: '4', name: 'Chair', icon: require('../assets/icons/chair_icon.png') },
  { id: '5', name: 'Storage', icon: require('../assets/icons/storage_icon.png') }
];

const CategoryItem = ({ category, onPress }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <Image source={category.icon} style={styles.categoryIcon} />
    <Text style={styles.categoryName}>{category.name}</Text>
  </TouchableOpacity>
);

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
      <Image source={product.color[0].picture} style={styles.productImage} resizeMode='contain'/>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
    </TouchableOpacity>
  );
};


const HomePage = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (category) => {
    console.log('Clicked on category:', category.name);
    navigation.navigate('CategoryScreen', { categoryName: category.name });
  };

  const handleCartPress = () => {
    navigation.navigate('CartScreen');
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
      <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
        <Image source={cartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
      <View style={styles.searchHeaderContainer}>
        <View style={styles.searchBarContainer}>
          <Image 
            source={require('../assets/icons/search_icon.png')} 
            style={styles.searchIcon} 
          />
          <TextInput 
            style={styles.searchBar} 
            placeholder="Search..." 
            placeholderTextColor="#999" 
          />
        </View>
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryItem category={item} onPress={() => handleCategoryPress(item)} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      <View style={styles.topSalerContainer}>
        <Text style={styles.topSalerTitle}>Top Sellers</Text>
        {topseller.map((product, index) => {
          if (index % 2 === 0) {
            return (
              <View style={styles.row} key={index}>
                <ProductItem product={product} />
                {topseller[index + 1] && (
                  <ProductItem product={topseller[index + 1]} />
                )}
              </View>
            );
          }
          return null;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cartButton: {
    position: 'absolute', 
    top: 40, 
    right: 20, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    width: 25,
    height: 25,
    tintColor: '#333',
  },
  searchHeaderContainer: {
    backgroundColor: '#ffe6cf',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: '#999',
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    elevation: 2,
  },
  categoriesTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 20,
    marginBottom: 8,
    color: '#333',
  },
  categoriesList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 50,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    elevation: 1,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
    borderRadius: 12,
  },
  categoryName: {
    fontSize: 10,
    fontWeight: '500',
    color: '#333',
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

export default HomePage;
