import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_IP } from '../config';  // Import HOST_IP từ config.js

const LoginScreen = ({ route, navigation }) => {
  const { setIsLoggedIn } = route.params;
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const passwordInputRef = createRef();

  useEffect(() => {
    navigation.setOptions({ setIsLoggedIn });
  }, [navigation, setIsLoggedIn]);

  const handleLogin = async () => {
    if (!username || !userPassword) {
      Alert.alert('Please fill in both username and password');
      return;
    }

    try {
      const response = await axios.post(`${HOST_IP}/login/`, {
        username: username,
        password: userPassword,
      });

      console.log(response.data); 

      if (response.status === 200) {
        const userId = response.data.user_id;
        const cartId = response.data.cart_id;
        if (userId && cartId) {
          setIsLoggedIn(true);
          Alert.alert('Login successful');
          await AsyncStorage.setItem('user_id', userId.toString());
          await AsyncStorage.setItem('cart_id', cartId.toString());
        } else {
          Alert.alert('Login failed', 'User ID or Cart ID is missing');
        }
      }
    } catch (error) {
      console.error('Error logging in', error);
      Alert.alert('Login failed', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={require('../assets/login_background.png')}
        style={styles.imageBackground}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <View>
            <KeyboardAvoidingView enabled>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Welcome</Text>
                <Text style={styles.subHeaderText}>Please login to continue</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(Username) => setUsername(Username)}
                  placeholder="Enter Username"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                  placeholder="Enter Password"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleLogin}
              >
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyleSecondary}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.buttonTextStyle}>SIGNUP</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#d36a06',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 15,
  },
  buttonStyleSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
    height: 40,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#dadae8',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
