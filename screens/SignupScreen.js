import React, { useState, createRef } from 'react';
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
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { HOST_IP } from '../config';  

const SignupScreen = ({ navigation, setIsLoggedIn }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPass, setconfirmPass] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordInputRef = createRef();

  const handleSignUp = async () => {
    if (!userName || !userEmail || !userPassword || !userAge) {
      Alert.alert('Please fill in all fields');
      return;
    }

    if (userPassword !== confirmPass) {
      Alert.alert('Password mismatch', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${HOST_IP}/users/`, { 
        username: userName,
        email: userEmail,
        password: userPassword,
        age: userAge,
      });

      if (response.status === 200) {
        Alert.alert(
          'Sign up successful!',
          'Your account has been created successfully. Please login to continue.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login', { fromSignup: true }),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error signing up', error);
      Alert.alert('Sign up failed', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={require('../assets/signup_background.png')}  // Thay thế bằng đường dẫn đến ảnh nền của bạn
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
                <Text style={styles.headerText}>Sign Up</Text>
                <Text style={styles.subHeaderText}>Create a new account</Text>
              </View>

              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserName) => setUserName(UserName)}
                  placeholder="Enter Username"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current && emailInputRef.current.focus()}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  placeholder="Enter Email"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="email-address"
                  ref={emailInputRef}
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
                  onChangeText={(UserAge) => setUserAge(UserAge)}
                  placeholder="Enter Age"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="numeric"
                  ref={ageInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => ageInputRef.current && ageInputRef.current.focus()}
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
                  ref={passwordInputRef}
                  returnKeyType="next"
                  secureTextEntry={!isPasswordVisible}
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(confirmPass) => setconfirmPass(confirmPass)}
                  placeholder="Confirm Password"
                  placeholderTextColor="#8b9cb5"
                  ref={confirmPasswordInputRef}
                  returnKeyType="next"
                  secureTextEntry={!isConfirmVisible}
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setConfirmVisible(!isConfirmVisible)}
                >
                  <Ionicons
                    name={isConfirmVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSignUp}
              >
                <Text style={styles.buttonTextStyle}>SIGNUP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyleSecondary}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignupScreen;

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
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 8,
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