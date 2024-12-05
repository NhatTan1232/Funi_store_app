import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Sofa', icon: require('../assets/icons/sofa_icon.png') },
  { id: '2', name: 'Bed', icon: require('../assets/icons/bed_icon.png') },
  { id: '3', name: 'Table', icon: require('../assets/icons/table_icon.png') },
  { id: '4', name: 'Chair', icon: require('../assets/icons/chair_icon.png') },
  { id: '5', name: 'Storage', icon: require('../assets/icons/storage_icon.png') }
];

const CategoryItem = ({ category, isSelected, onPress }) => (
  <TouchableOpacity 
    style={[styles.categoryItem, isSelected && styles.selectedCategory]} 
    onPress={onPress}>
    <Image source={category.icon} style={styles.categoryIcon} />
    <Text style={[styles.categoryName, isSelected && styles.selectedCategoryName]}>
      {category.name}
    </Text>
  </TouchableOpacity>
);

const SearchScreen = ({ navigation }) => {

  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    console.log("Selected Category in SearchScreen: ", selectedCategory);

    navigation.navigate('ResultScreen', { 
      productName, 
      selectedCategory,  // Truyền tên category
      priceRange: [minPrice, maxPrice] 
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(prevCategory => prevCategory === category.name ? null : category.name);
  };

  const handleReset = () => {
    setProductName('');
    setSelectedCategory(null);
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <View style={styles.searchBarContainer}>
              <Image source={require('../assets/icons/search_icon.png')} style={styles.searchIcon} />
              <TextInput
                style={styles.searchBar}
                placeholder="Enter product name"
                value={productName}
                onChangeText={setProductName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <CategoryItem 
                  category={item} 
                  isSelected={item.name === selectedCategory}
                  onPress={() => handleCategoryPress(item)} 
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price Range</Text>
            <View style={styles.priceRangeContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min price"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
              />
              <Text style={styles.separator}>-</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Max price"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  emptySpace: {
    width: 24, // Adjust this value if needed to balance the header
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 10,
    marginTop: 10,
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
  selectedCategory: {
    backgroundColor: '#d36a06',
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
  selectedCategoryName: {
    color: '#fff',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInput: {
    height: 45,
    width: '45%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  separator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  priceRangeText: {
    fontSize: 14,
    marginTop: 10,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#d36a06',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#d36a06',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  resetButtonText: {
    color: '#d36a06',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
