import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserPage() {
  return (
    <View style={styles.container}>
      <Text>User Page</Text>
      {/* Add your user page content here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
