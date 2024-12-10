import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HOST_IP } from '../config';

const ReviewScreen = () => {
  const route = useRoute();
  const { product_id } = route.params;
  const [reviews, setReviews] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`${HOST_IP}/reviews/${product_id}`)
      .then((response) => {
        const reviewsData = response.data || [];
        setReviews(reviewsData);

        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
          const avgRating = totalRating / reviewsData.length;
          setAverageRating(avgRating.toFixed(2));
        }
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [product_id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const users = {};
      for (const review of reviews) {
        if (!users[review.user_id]) {
          try {
            const response = await axios.get(`${HOST_IP}/users/${review.user_id}`);
            users[review.user_id] = {
              username: response.data.username,
              profilePic: response.data.profile_picture,
            };
          } catch (error) {
            console.error(`Error fetching user data for user_id ${review.user_id}:`, error);
          }
        }
      }
      setUserDetails(users);
      setLoading(false);
    };

    if (reviews.length > 0) {
      fetchUserDetails();
    }
  }, [reviews]);

  const renderReviewBars = (stars, percentage) => (
    <View style={styles.reviewRow}>
      <Text style={styles.starText}>{stars} star</Text>
      <View style={styles.reviewBar}>
        <View style={[styles.filledBar, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );

  const renderReviews = () => (
    reviews.map((review, index) => (
      <View key={index} style={styles.reviewContainer}>
        <Image source={{ uri: userDetails[review.user_id]?.profilePic || 'https://via.placeholder.com/50' }} style={styles.profilePic} />
        <View style={styles.reviewContent}>
          <View style={styles.reviewHeader}>
            <Text style={styles.userName}>{userDetails[review.user_id]?.username || 'Unknown User'}</Text>
            <StarRatingDisplay
              rating={review.rating}
              starSize={16}
              color='#de7006'
              style={styles.starRating}
            />
          </View>
          <Text style={styles.reviewDate}>{new Date().toLocaleDateString()}</Text>
          <Text style={styles.reviewDetail}>{review.detail_review}</Text>
        </View>
      </View>
    ))
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.overallScore}>
          <Text style={styles.scoreText}>{averageRating}</Text>
          <Text style={styles.outOfText}>/5</Text>
        </View>
        <StarRatingDisplay
          rating={parseFloat(averageRating)}
          starSize={25}
          color='#de7006'
          style={{ alignSelf: 'center', marginVertical: 10 }}
        />
        <Text style={styles.reviewCount}>{reviews.length} reviews</Text>
        
        {renderReviewBars(5, 58)}
        {renderReviewBars(4, 25)}
        {renderReviewBars(3, 10)}
        {renderReviewBars(2, 5)}
        {renderReviewBars(1, 2)}

        <View style={styles.reviewTabs}>
          <Text style={styles.tabText}>Top</Text>
          <Text style={styles.tabText}>Recent</Text>
        </View>
        
        {renderReviews()}

        <TouchableOpacity 
          style={styles.reviewButton} 
          onPress={() => navigation.navigate('WriteReviewScreen', { product_id })}
        >
          <Text style={styles.reviewButtonText}>Write a review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  overallScore: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 35,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  outOfText: {
    fontSize: 25,
    alignSelf: 'flex-end',
    paddingBottom: 4,
    color: 'grey',
  },
  reviewCount: {
    marginBottom: 17,
    marginTop: 4,
    color: 'grey',
    textAlign: 'center',
    fontSize: 18
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  starText: {
    width: 60,
    color: 'grey',
    fontSize: 15
  },
  reviewBar: {
    flex: 1,
    backgroundColor: '#E2E9F0',
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  filledBar: {
    backgroundColor: '#de7006',
    height: '100%',
    borderRadius: 5,
  },
  percentageText: {
    width: 40,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'right',
  },
  reviewTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 23,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#828280'
  },
  reviewContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 1
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 17,
    fontWeight: '500',
  },
  starRating: {
    marginLeft: 10,
  },
  reviewDate: {
    color: 'grey',
    fontSize: 16,
  },
  reviewDetail: {
    marginTop: 8,
    fontSize: 17
  },
  reviewButton: {
    backgroundColor: '#de7006',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default ReviewScreen;
