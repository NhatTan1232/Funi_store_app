import React, { useState } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_IP } from '../config';

const PaymentScreen = () => {
  const [checked, setChecked] = useState('cod');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Maria Le');
  const [street, setStreet] = useState('Sesame St. 18');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const route = useRoute();
  const { cartItems, subtotal } = route.params;
  const navigation = useNavigation();

  const shippingPrice = 200000; 
  const total = subtotal + shippingPrice;

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleOrderSubmit = async () => {
    if (isSubmitting) return; // Ngăn không cho gửi nếu đang trong quá trình xử lý
    setIsSubmitting(true);
  
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (!userId) throw new Error('User ID not found');
  
      const orderData = {
        user_id: userId,
        cart_id: cartItems[0]?.cart_id,
        total_amount: total,
        payment_method: checked,
        name,
        address: street,
      };
  
      const orderResponse = await axios.post(`${HOST_IP}/orders/`, orderData);
  
      if (orderResponse.status === 200) {
        const orderId = orderResponse.data.order_id;
        const orderItems = cartItems.map(item => {
          const unitPrice = parseFloat(item.price.replace(/,/g, ''));
          const totalPrice = unitPrice * item.quantity;
  
          return {
            order_id: orderId,
            product_id: item.product_id,
            color_id: item.color_id,
            quantity: item.quantity,
            unit_price: unitPrice,
            total_price: totalPrice,
          };
        });
  
        await axios.post(`${HOST_IP}/order_items/`, orderItems);
  
        Alert.alert('Order placed successfully');
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.stepIndicator}>
        <View style={styles.stepRow}>
          <View style={styles.step}>
            <Icon name="checkmark-circle-outline" size={26} color="#de7006" />
            <Text style={styles.stepLabel}>Payment</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
            <Icon name="checkmark-circle-outline" size={26} color="#de7006" />
            <Text style={styles.stepLabel}>Shipping</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
            <Icon name="checkmark-circle-outline" size={26} color="grey" />
            <Text style={styles.stepLabel}>Review</Text>
          </View>
        </View>
      </View>

      <Text style={styles.confirmText}>Confirm and submit your order</Text>
      <Text style={styles.termsText}>
        By submitting the order, you agree to our Terms of Use and Privacy Policy.
      </Text>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentInfo}>
          <Image style={styles.paymentIcon} source={require('../assets/cod.jpg')} resizeMode="contain" />
          <Text style={styles.cardDetails}>Cash on delivery</Text>
          <RadioButton
            value="cod"
            status={checked === 'cod' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('cod')}
            color="#de7006"
          />
        </View>
        <View style={styles.paymentInfo}>
          <Image style={styles.paymentIcon} source={require('../assets/momo.png')} resizeMode="contain" />
          <Text style={styles.cardDetails}>MoMo E-Wallet</Text>
          <RadioButton
            value="momo"
            status={checked === 'momo' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('momo')}
            color="#de7006"
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shipping address</Text>
          <TouchableOpacity onPress={handleEditToggle}>
            <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>
        {isEditing ? (
          <View style={styles.addressInfo}>
            <View style={styles.addressRow}>
              <Text style={styles.addressLabel}>Name:</Text>
              <TextInput style={styles.addressInput} value={name} onChangeText={setName} />
            </View>
            <View style={styles.addressRow}>
              <Text style={styles.addressLabel}>Street:</Text>
              <TextInput style={styles.addressInput} value={street} onChangeText={setStreet} />
            </View>
          </View>
        ) : (
          <View style={styles.addressInfo}>
            <View style={styles.addressRow}>
              <Text style={styles.addressLabel}>Name:</Text>
              <Text style={styles.addressDetail}>{name}</Text>
            </View>
            <View style={styles.addressRow}>
              <Text style={styles.addressLabel}>Street:</Text>
              <Text style={styles.addressDetail}>{street}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Order summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryAmount}>đ{subtotal.toLocaleString('vi-VN')}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryAmount}>đ200,000</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabelTotal}>Total</Text>
          <Text style={styles.summaryValueTotal}>đ{total.toLocaleString('vi-VN')}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleOrderSubmit}>
        <Text style={styles.submitButtonText}>Submit order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};




export default PaymentScreen;



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  stepIndicator: {
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  step: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  stepCircleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#de7006',
    marginBottom: 5,
  },
  stepLabel: {
    fontSize: 12,
    marginLeft: 5,
  },
  stepLine: {
    width: 15,
    height: 2,
    backgroundColor: 'grey',
    marginHorizontal: 10,
  },
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingTop: 15,
  },
  termsText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  editText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#de7006',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    height: 20,
    width: 50,
    marginRight: 10,
    marginVertical: 10
  },
  cardDetails: {
    flex: 1,
    fontSize: 16,
  },
  expiryDate: {
    fontSize: 16,
    color: '#838382',
  },
  addressInfo: {
    marginTop: 10,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  addressLabel: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  addressDetail: {
    fontSize: 16,
    color: '#252728',
    textAlign: 'right',
    fontWeight: '600',
    flex: 1,
  },
  orderSummary: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    color: '#555',
  },
  summaryLabelTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },
  summaryValueTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },
  submitButton: {
    backgroundColor: '#de7006',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});