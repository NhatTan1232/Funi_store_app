import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const product = {
  id: 11,
  name: 'Ottawa table',
  price: '75,490,000',
  type: 'Table',
  color: [
    {
      color_id: 1,
      color_name: 'saddlebrown',
      picture: require('./assets/productPicture/ottawa_brown.jpg')
    }
  ],
  detail: 'Defined by smooth, rounded edges and a sensual minimalism, the Ottawa dining table creates a serene atmosphere in your dining room. Unique, twig-like legs inspired by nature accentuate the natural beauty of the oval Ottawa dining table. Need extra seats? Just pull out the clever, built-in extension leaf and go from a 4-person family meal to a dinner party seating 14.',
};

const writeReviewScreen = () => {
  const [rating, setRating] = useState(0.0);
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      aspect: [3, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages(prevImages => [...prevImages, ...selectedImages].slice(0, 6));
    }
  };

  const handleDeleteImage = (uri) => {
    setImages(images.filter(image => image !== uri));
  };

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Rating:', rating);
    console.log('Review:', review);
    console.log('Images:', images);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productInfo}>
        <Image source={product.color[0].picture} style={styles.productImage} resizeMode='contain' />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productColor}>Color: {product.color[0].color_name}</Text>
        </View>
      </View>
      <StarRating
        rating={rating}
        onChange={setRating}
        enableHalfStar={false}
        starSize={40}
        color='#de7006'
        style={styles.rating}
      />
      <Text style={styles.headingRate}>Rate this product</Text>
      <View style={styles.reviewHeading}>
        <Text style={styles.heading}>Write a review</Text>
        <Text style={styles.charCount}>{review.length}/300</Text>
      </View>
      <TextInput
        style={styles.reviewInput}
        multiline
        numberOfLines={4}
        maxLength={300}
        placeholder="What did you think of the style, size, color?"
        placeholderTextColor={'#adadad'}
        value={review}
        onChangeText={setReview}
      />
      <Text style={styles.heading}>Add photo or video</Text>
      <View style={images.length > 0 ? styles.previewContainer : null}>
        {images.length > 0 && images.map((img, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: img }} style={styles.previewImage} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(img)}>
              <Icon name="close-circle" size={24} color="grey" />
            </TouchableOpacity>
          </View>
        ))}
        {images.length < 6 && (
          <TouchableOpacity
            style={[styles.addMediaButton, images.length > 0 && styles.addMediaButtonSmall]}
            onPress={pickImage}
          >
            <Icon name="camera-outline" size={26} color="#030303" style={styles.icon} />
            {images.length === 0 ? 
              <Text style={styles.addMediaText}>Add photo or video</Text> :
              <Text style={styles.addMediaText}>Add</Text>
            }
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default WriteReviewScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  productDetails: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productColor: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  headingRate: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  reviewHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  rating: {
    alignSelf: 'center',
  },
  reviewInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    height: 125,
    textAlignVertical: 'top',
  },
  charCount: {
    alignSelf: 'flex-end',
    marginBottom: 13,
    fontSize: 14,
    color: '#888',
  },
  addMediaButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  addMediaButtonSmall: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  addMediaText: {
    color: '#adadad',
    fontSize: 16,
  },
  icon: {
    marginVertical: 5
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: '#de7006',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});
