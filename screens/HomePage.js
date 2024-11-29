import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import Header from '../assets/components/Header';  
import cartIcon from '../assets/icons/cart_icon.png';  


const products = [
  {
    id: 1,
    name: 'Bellagio 3 seater sofa',
    price: '89,950,000',
    type: 'Sofa',
    color: [
      {
        color_id: 1,
        color_name: 'brown',
        picture: require('../assets/productPicture/sofa/bellagio_brown.jpg')
      },
      {
        color_id: 2,
        color_name: 'green',
        picture: require('../assets/productPicture/sofa/bellagio_green.jpg')
      }
    ],
    detail: 'The Bellagio 3-seater sofa is a statement piece that commands attention – compelling you to sit and experience its comfort. With its low-back design, clean lines and minimalist aesthetic, this modern sofa offers a tactile experience like no other.',
  },
  {
    id: 5,
    name: 'Carmo corner sofa',
    price: '94,490,000',
    type: 'Sofa',
    color: [
      {
        color_id: 1,
        color_name: 'lightskyblue',
        picture: require('../assets/productPicture/sofa/carmo_blue.jpg')
      },
      {
        color_id: 2,
        color_name: 'saddlebrown',
        picture: require('../assets/productPicture/sofa/carmo_brown.jpg')
      },
      {
        color_id: 3,
        color_name: 'darkblue',
        picture: require('../assets/productPicture/sofa/carmo_dblue.jpg')
      }
    ],
    detail: 'With its cubic Danish design expression, our signature Carmo sofa has been updated for a more refined look and enhanced comfort. Its free-standing design allows you to easily reorganise its modules at any time, for any occasion. Whether you are hosting guests or seeking a quiet moment, Carmo effortlessly adapts to your needs.',
  },
  {
    id: 12,
    name: 'Lugo coffee table',
    price: '29,590,000',
    type: 'Table',
    color: [
      {
        color_id: 1,
        color_name: 'bisque',
        picture: require('../assets/productPicture/table/lugo_beige.jpg')
      },
      {
        color_id: 2,
        color_name: 'silver',
        picture: require('../assets/productPicture/table/lugo_silver.jpg')
      }
    ],
    detail: 'Versatile minimalism that perfectly blends into your living room. The Lugo coffee table’s light look and clean lines will bring a timeless sophistication to your home for years to come. Place the square coffee table alone to accentuate the minimalist style or arrange it above the rectangular Lugo for a dynamic look and extra table space.',
  },
  {
    id: 17,
    name: 'Ottawa chair',
    price: '5,601,500',
    type: 'Chair',
    color: [
      {
        color_id: 1,
        color_name: 'black',
        picture: require('../assets/productPicture/chair/ottawa_chair_black.jpg')
      }
    ],
    detail: 'Visibly inspired by nature with its leaf-shape and curved design, the Ottawa dining chair is truly a unique piece of design furniture. Once you are seated, you will discover that the Ottawa chair is not only characteristic in looks, but also in comfort. The twig-like legs on Ottawa add to the organic chair design, completing its unique look. At the same time, the sculptured seat without upholstery highlights the clean lines and minimal form.',
  },
];



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

const ProductItem = ({ product }) => (
  <View style={styles.productItem}>
    <Image source={product.color[0].picture} style={styles.productImage} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.productPrice}>{product.price}</Text>
  </View>
);

const HomePage = () => {
  const navigation = useNavigation(); 

  const handleCategoryPress = (category) => {
    console.log('Clicked on category:', category.name);
  };

  const handleCartPress = () => {
    navigation.navigate('CartScreen'); 
  };

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
        <Text style={styles.topSalerTitle}>Top Sellers</Text>đ
        {products.map((product, index) => {
          if (index % 2 === 0) {
            return (
              <View style={styles.row} key={index}>
                <ProductItem product={product} />
                {products[index + 1] && (
                  <ProductItem product={products[index + 1]} />
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
    fontSize: 20,
    fontWeight: 'bold',
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

export default HomePage;
