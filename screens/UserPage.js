import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const UserPage = ({ route }) => {
  const { setIsLoggedIn } = route.params;
  const [profilePicture, setProfilePicture] = useState(null);

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
      <View style={styles.section}>
        <Text style={styles.label}>Profile picture</Text>
        <TouchableOpacity onPress={handleOpenGallery} >
          <Icon name="chevron-forward-outline" color={'#d36a06'} size={25}/>
        </TouchableOpacity>
        {profilePicture && (
          <Text style={styles.imagePreview}>Selected Image: {profilePicture}</Text> 
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Username</Text>
        <TextInput 
          style={styles.transparentInput} 
          placeholder="vonhat_tan" 
          placeholderTextColor="#333" 
          textAlign="right"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput 
          style={styles.transparentInput} 
          placeholder="*****50" 
          textAlign="right"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email address</Text>
        <TextInput 
          style={styles.transparentInput} 
          placeholder="v***************8@gmail.com" 
          textAlign="right"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Change password</Text>
        <TouchableOpacity onPress={console.log('Change pass')} >
          <Icon name="chevron-forward-outline" color={'#d36a06'} size={25}/>
        </TouchableOpacity>
      </View>

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
  imagePreview: {
    marginTop: 10,
    color: '#888',
  },
});
