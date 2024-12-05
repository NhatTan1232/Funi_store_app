import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

const LoginScreen = ({ route, navigation }) => {
  const { setIsLoggedIn } = route.params;
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const passwordInputRef = createRef();

  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={require('../assets/login_background.png')} // Replace with your background image path
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
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  placeholder="Enter Email"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
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
                onPress={() => setIsLoggedIn(true)}  
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
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
