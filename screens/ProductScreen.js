import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const ProductScreen = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;

  const [selectedColor, setSelectedColor] = useState(product.color[0]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleNavigateToReviews = () => {
    navigation.navigate('ReviewScreen', { productId: product.id });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Detail</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="hearto" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image source={selectedColor.picture} style={styles.productImage} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>${product.oldPrice}</Text>
          <Text style={styles.currentPrice}>${product.price}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={16} color="#FFD700" />
          <AntDesign name="star" size={16} color="#FFD700" />
          <AntDesign name="star" size={16} color="#FFD700" />
          <AntDesign name="star" size={16} color="#FFD700" />
          <AntDesign name="staro" size={16} color="#FFD700" />
          <TouchableOpacity onPress={handleNavigateToReviews}>
            <Text style={styles.reviewText}>4.16 (12 reviews)</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{product.detail}</Text>

        <Text style={styles.colorTitle}>Colors</Text>
        <View style={styles.colorOptions}>
          {product.color.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleColorSelect(item)}>
              <View
                style={[
                  styles.colorCircle,
                  { backgroundColor: item.color_name },
                  selectedColor.color_name === item.color_name && styles.selectedColor,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  favoriteButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default ProductScreen;
