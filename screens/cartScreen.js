import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import products from './assets/components/storeProduct';

const cartScreen = () => {
  const [cart, setCart] = useState(products);
  const [subtotal, setSubtotal] = useState(0);
  const [quantities, setQuantities] = useState(products.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));
  
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
  };

  const handleRemoveItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.color[0].picture} style={styles.productImage} resizeMode='contain' />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productColor}>Color: {item.color[0].color_name}</Text>
        <View style={styles.productControls}>
          <Text>Số lượng:</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType='numeric'
            defaultValue='1'
            value={quantities[item.id].toString()}
            onChangeText={(value) => handleQuantityChange(item.id, value)}
          />
          <TouchableOpacity style={styles.trashIcon} onPress={() => handleRemoveItem(item.id)}>
            <Icon name="trash-outline" size={24} color="grey" />
          </TouchableOpacity>
          <Text style={styles.productPrice}>đ{(parseFloat(item.price.replace(/,/g, '')) * quantities[item.id]).toLocaleString('vi-VN')}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal:</Text>
        <Text style={styles.subtotalAmount}>đ{subtotal.toLocaleString('vi-VN')}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default cartScreen;

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
    borderBottomWidth: 1,
    overflow: 'hidden',
    padding: 10,
    borderBottomColor: '#eeeeee',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 18,
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
    marginVertical: 5,
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



