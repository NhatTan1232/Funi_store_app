import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { CartContext } from '../screens/context/CartContext';  

const ProductScreen = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;

  const [selectedColor, setSelectedColor] = useState(product.color[0]);
  const { addToCart } = useContext(CartContext);  

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    const productWithSelectedColor = {
      ...product,
      selectedColor,  
    };
    addToCart(productWithSelectedColor);  
    
    Alert.alert(
      "Success",
      "Product added to cart!",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
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
            <Text style={styles.oldPrice}>{product.oldPrice}</Text>
            <Text style={styles.currentPrice}>đ{product.price}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <AntDesign name="star" size={16} color="#FFD700" />
            <AntDesign name="star" size={16} color="#FFD700" />
            <AntDesign name="star" size={16} color="#FFD700" />
            <AntDesign name="staro" size={16} color="#FFD700" />
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
    fontSize: 24,
    fontWeight: 'bold',
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
  reviewText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
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
