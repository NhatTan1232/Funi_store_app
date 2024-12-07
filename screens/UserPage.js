import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const user = {
  "user_id": 1,
  "username": "NhatjtaN",
  "email": "22521313@gm.uit.edu.vn",
  "phone": "0944444444",
  "password": "456",
  "age": 20,
  "address": "Mac Dinh Chi Street, Tan Hoa Ward, Dong Hoa District, Di An City, Binh Duong Province",
  "profile_picture": "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small_2x/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
};

const UserPage = ({ route }) => {
  const { setIsLoggedIn } = route.params;
  const [profilePicture, setProfilePicture] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [username, setUsername] = useState(user.username);
  const [age, setAge] = useState(user.age);
  const [address, setAddress] = useState(user.address);
  const [mail, setMail] = useState(user.email);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleOpenGallery = async () => {
    // Request permission to access the gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      // Launch the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1], // Optional: aspect ratio for cropping
        quality: 1, // Optional: set image quality
      });

      if (!result.cancelled) {
        setProfilePicture(result.uri); // Set the selected image URI
      }
    } else {
      alert("Permission to access gallery is required!");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profilepic_section}>
        <TouchableOpacity onPress={handleOpenGallery} >
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: user.profile_picture }} // Show selected image or default
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.transparentInput}
          placeholder="Enter your username"
          placeholderTextColor="#333"
          textAlign="right"
          value={username} // Bind the TextInput to the username state
          onChangeText={(text) => setUsername(text)} // Update the username state
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.transparentInput}
          placeholder="Enter your age"
          placeholderTextColor="#333"
          inputMode='numeric'
          textAlign="right"
          value={age.toString()} // Bind the TextInput to the username state
          onChangeText={(text) => {
            const parsedAge = parseInt(text, 10);
            if (!isNaN(parsedAge)) {
              setAge(parsedAge);  // Update age state only if it's a valid number
            }
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.transparentInput}
          placeholder="Enter your phone number"
          placeholderTextColor="#333"
          textAlign="right"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.transparentInput, { height: 80 }]}  // Adjust the height for multiline input
          placeholder="Enter your address"
          placeholderTextColor="#333"
          textAlign="right"
          value={address}  // Bind the TextInput to the address state
          onChangeText={(text) => setAddress(text)}  // Update the address state
          multiline={true}  // Allow multiple lines of input
          numberOfLines={4}  // Optional: set the number of lines to display initially
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.transparentInput}
          placeholder="Enter your email address"
          placeholderTextColor="#333"
          textAlign="right"
          value={mail}
          onChangeText={(text) => setMail(text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Change password</Text>
        <TouchableOpacity onPress={() => setShowPasswordForm(!showPasswordForm)}>
          <Icon 
            name={showPasswordForm ? "chevron-up-outline" : "chevron-down-outline"} 
            color={'#d36a06'} 
            size={25}/>
        </TouchableOpacity>
      </View>

      {showPasswordForm && (
        <>
          <View style={styles.section}>
            <Text style={styles.label}>Old Password</Text>
            <TextInput
              style={styles.transparentInput}
              placeholder="Enter old password"
              placeholderTextColor="#333"
              secureTextEntry
              textAlign="right"
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.transparentInput}
              placeholder="Enter new password"
              placeholderTextColor="#333"
              secureTextEntry
              textAlign="right"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.label, { height: 50 , verticalAlign: 'middle'}]}>Confirm New Password</Text>
            <TextInput
              style={styles.transparentInput}
              placeholder="Confirm new password"
              placeholderTextColor="#333"
              secureTextEntry
              textAlign="right"
              value={confirmNewPassword}
              onChangeText={(text) => setConfirmNewPassword(text)}
            />
          </View>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={console.log('Save clicked')}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutbutton} onPress={() => setIsLoggedIn(false)}>
        <Text style={styles.logoutbuttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default UserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  profilepic_section: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: '#de7006',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    margin: 25,
    width: '90%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  logoutbutton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    margin: 25,
    width: '90%'
  },
  logoutbuttonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '800',
  },
  input: {
    height: 40,
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    flex: 2,
  },
  transparentInput: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    flex: 2,
    color: '#333',  
    backgroundColor: 'transparent', 
  },
  arrowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d36a06',
    padding: 10,
    borderRadius: 4,
  },
  arrowText: {
    fontSize: 24,
    color: '#fff',
  },
  profileImageContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 150, 
    height: 150, 
    borderRadius: 80, 
    borderWidth: 5,
    borderColor: '#ffe6cf', 
  },
  imagePreview: {
    marginTop: 10,
    color: '#888',
  },
});
