import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { CartContext } from '../screens/context/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigation = useNavigation();

  const [quantities, setQuantities] = useState(cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity || 1 }), {}));
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    calculateSubtotal();
  }, [quantities]);

  const calculateSubtotal = () => {
    const total = cart.reduce((accumulator, item) => {
      const itemPrice = parseFloat(item.price.replace(/,/g, ''));
      const quantity = quantities[item.id] || 1;
      return accumulator + (itemPrice * quantity);
    }, 0);
    setSubtotal(total);
  };

  const handleQuantityChange = (id, value) => {
    const newQuantities = { ...quantities, [id]: parseInt(value) || 1 };
    setQuantities(newQuantities);
    
    const newCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantities[id] } : item
    );
    setCart(newCart);
  };

  const handleRemoveItem = (id, selectedColor) => {
    const newCart = cart.filter(item => 
      !(item.id === id && item.selectedColor.color_name === selectedColor.color_name)
    );
  

    const newQuantities = { ...quantities };
    delete newQuantities[`${id}-${selectedColor.color_name}`];  
    setQuantities(newQuantities);
    setCart(newCart);
  };
  

  const handleProceedToCheckout = () => {
    navigation.navigate('PaymentScreen');
  };

  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.id === item.id && cartItem.selectedColor.color_name === item.selectedColor.color_name
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;  
      setCart(updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  const renderCartItem = ({ item }) => {
    const selectedColor = item.selectedColor || {};

    return (
      <View style={styles.cartItem}>
        {selectedColor.picture ? (
          <Image source={selectedColor.picture} style={styles.productImage} />
        ) : (
          <View style={styles.productImagePlaceholder}></View>
        )}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productColor}>Color: {selectedColor.color_name || 'Unknown'}</Text>
          <View style={styles.productControls}>
            <Text>Số lượng:</Text>
            <TextInput
              style={styles.quantityInput}
              keyboardType='numeric'
              value={quantities[item.id].toString()}
              onChangeText={(value) => handleQuantityChange(item.id, value)}
            />
            <TouchableOpacity style={styles.trashIcon} onPress={() => handleRemoveItem(item.id, selectedColor)}>
              <Icon name="trash-outline" size={24} color="grey" />
            </TouchableOpacity>
            <Text style={styles.productPrice}>đ{(parseFloat(item.price.replace(/,/g, '')) * quantities[item.id]).toLocaleString('vi-VN')}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => `${item.id}-${item.selectedColor?.color_name || 'default'}`} 
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
