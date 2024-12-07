import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CartContext } from '../screens/context/CartContext';
import { HOST_IP } from '../config';  

const reviews = [
  {
    product_id: 1,
    review: [
      {
        review_id: 1,
        profilePic: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
        rating: 4,
        userName: 'John Doe',
        date: '30 May, 2022',
        reviewDetail: 'Great product! Really enjoyed using it.',            
      },
      {
        review_id: 2,
        profilePic: 'https://png.pngtree.com/thumb_back/fw800/background/20230817/pngtree-lotus-flower-jpg-pink-lotus-flower-image_13023952.jpg',
        rating: 5,
        userName: 'Jane Smith',
        date: '18 Nov, 2022',
        reviewDetail: 'Absolutely loved it! Highly recommend.',
      },
      {
        review_id: 3,
        profilePic: 'https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg',
        rating: 4,
        userName: 'Mike Johnson',
        date: '17 Nov, 2022',
        reviewDetail: 'It was okay, could be better.',
      }
    ],
  }
];

const ProductScreen = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;

  const [selectedColor, setSelectedColor] = useState(product.color[0]);
  const { addToCart } = useContext(CartContext);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      const cartId = await AsyncStorage.getItem('cart_id');
      if (!cartId) {
        Alert.alert('No cart found');
        return;
      }

      const response = await axios.post(`${HOST_IP}/cart_items/`, {  
        cart_id: cartId,
        product_id: product.id,
        quantity: 1,  
        color_id: selectedColor ? selectedColor.color_id : null,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Product added to cart!");
      } else {
        Alert.alert("Failed", "Could not add product to cart");
      }
    } catch (error) {
      console.error('Error adding to cart', error);
      Alert.alert('Failed to add product to cart');
    }
  };

  const handleNavigateToCart = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cartButton} onPress={handleNavigateToCart}>
        <AntDesign name="shoppingcart" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={selectedColor.picture} style={styles.productImage} />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>đ{product.price}</Text>
            <Text style={styles.oldPrice}>{product.oldPrice}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <StarRatingDisplay
              rating={4.16}
              starSize={18}
              color='#de7006'
              starStyle={styles.starRating}
            />
            <TouchableOpacity>
              <Text style={styles.reviewText}>4.16 (12 reviews)</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{product.detail}</Text>

          <Text style={styles.colorTitle}>Colors</Text>
          <View style={styles.colorOptions}>
            {product.color.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleColorSelect(item)}>
                <View
                  style={[styles.colorCircle, { backgroundColor: item.color_name }, selectedColor.color_name === item.color_name && styles.selectedColor]}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartButton: {
    position: 'absolute',
    bottom: 10, 
    right: 10,  
    zIndex: 10, 
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, 
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  productName: {
    fontSize: 25,
    fontFamily: 'PlayfairDisplay_700Bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  oldPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starRating: {
    marginHorizontal: 0, 
  },
  reviewText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  colorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  colorOptions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  addToCartButton: {
    backgroundColor: '#d36a06',
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductScreen;