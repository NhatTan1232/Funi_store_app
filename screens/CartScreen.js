import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import products from '../assets/components/storeProduct';
import { HOST_IP } from '../config';  

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) {
          Alert.alert('No user ID found');
          return;
        }

        const response = await axios.get(`${HOST_IP}/carts/${userId}/items`);  
        setCartItems(response.data);

        const initialQuantities = response.data.reduce((acc, item) => ({ ...acc, [item.cart_item_id]: item.quantity }), {});
        setQuantities(initialQuantities);

      } catch (error) {
        console.error('Error fetching cart items', error);
        Alert.alert('Failed to fetch cart items');
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateSubtotal();
  }, [quantities, cartItems]);

  const calculateSubtotal = () => {
    const total = cartItems.reduce((accumulator, item) => {
      const product = products.find(p => p.id === item.product_id);
      const itemPrice = product ? parseFloat(product.price.replace(/,/g, '')) : 0;
      const quantity = quantities[item.cart_item_id] || 1;
      return accumulator + (itemPrice * quantity);
    }, 0);
    setSubtotal(total);
  };

  const handleQuantityChange = (id, value) => {
    const newQuantities = { ...quantities, [id]: parseInt(value) || 1 };
    setQuantities(newQuantities);

    const newCartItems = cartItems.map(item => 
      item.cart_item_id === id ? { ...item, quantity: newQuantities[id] } : item
    );
    setCartItems(newCartItems);
  };

  const handleRemoveItem = (id) => {
    const newCartItems = cartItems.filter(item => item.cart_item_id !== id);
    setCartItems(newCartItems);

    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  const handleProceedToCheckout = () => {
    const cartItemsWithPrice = cartItems.map(item => {
      const product = products.find(p => p.id === item.product_id);
      return {
        ...item,
        price: product ? product.price : 0
      };
    });
    navigation.navigate('PaymentScreen', { cartItems: cartItemsWithPrice, subtotal });
  };

  const renderCartItem = ({ item }) => {
    const product = products.find(p => p.id === item.product_id);
    const color = product ? product.color.find(c => c.color_id === item.color_id) : null;

    if (!product || !color) {
      return null; 
    }

    return (
      <View style={styles.cartItem}>
        <Image source={color.picture} style={styles.productImage} resizeMode='contain' />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productColor}>Color: {color.color_name}</Text>
          <View style={styles.productControls}>
            <Text>Số lượng:</Text>
            <TextInput
              style={styles.quantityInput}
              keyboardType='numeric'
              value={quantities[item.cart_item_id].toString()}
              onChangeText={(value) => handleQuantityChange(item.cart_item_id, value)}
            />
            <TouchableOpacity style={styles.trashIcon} onPress={() => handleRemoveItem(item.cart_item_id)}>
              <Icon name="trash-outline" size={24} color="grey" />
            </TouchableOpacity>
            <Text style={styles.productPrice}>đ{(parseFloat(product.price.replace(/,/g, '')) * quantities[item.cart_item_id]).toLocaleString('vi-VN')}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.cart_item_id.toString()}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal:</Text>
        <Text style={styles.subtotalAmount}>đ{subtotal.toLocaleString('vi-VN')}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartList: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 18,
  },
  productImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productColor: {
    fontSize: 16,
    color: '#888',
  },
  productControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 40,
    height: 40,
    borderColor: '#eeeeee',
    borderRadius: 100,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 15,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,  
    textAlignVertical: 'center',
  },
  trashIcon: {
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#d36a06',
    marginLeft: 'auto',
  },
  subtotalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtotalAmount: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#d36a06',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    margin: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;