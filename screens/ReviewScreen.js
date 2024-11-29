import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

const reviews = [
  {
    profilePic: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
    rating: 4,
    userName: 'John Doe',
    date: '30 May, 2022',
    reviewDetail: 'Great product! Really enjoyed using it.',
  },
  {
    profilePic: 'https://png.pngtree.com/thumb_back/fw800/background/20230817/pngtree-lotus-flower-jpg-pink-lotus-flower-image_13023952.jpg',
    rating: 5,
    userName: 'Jane Smith',
    date: '18 Nov, 2022',
    reviewDetail: 'Absolutely loved it! Highly recommend.',
  },
  {
    profilePic: 'https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg',
    rating: 4,
    userName: 'Mike Johnson',
    date: '17 Nov, 2022',
    reviewDetail: 'It was okay, could be better.',
  },
];

const reviewScreen = () => {
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
        <Image source={{ uri: review.profilePic }} style={styles.profilePic} />
        <View style={styles.reviewContent}>
          <View style={styles.reviewHeader}>
            <Text style={styles.userName}>{review.userName}</Text>
            <StarRatingDisplay
              rating={review.rating}
              starSize={16}
              color='#de7006'
              style={styles.starRating}
            />
          </View>
          <Text style={styles.reviewDate}>{review.date}</Text>
          <Text style={styles.reviewDetail}>{review.reviewDetail}</Text>
        </View>
      </View>
    ))
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.overallScore}>
          <Text style={styles.scoreText}>4.16</Text>
          <Text style={styles.outOfText}>/5</Text>
        </View>
        <StarRatingDisplay
          rating={4.5}
          starSize={25}
          color='#de7006'
          style={{ alignSelf: 'center', marginVertical: 10}}
        />
        <Text style={styles.reviewCount}>12 reviews</Text>
        
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

        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.reviewButtonText}>Write a review</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

export default ReviewScreen;

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
