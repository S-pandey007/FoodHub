import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome'); // Navigate after delay
    }, 2000); // Delay for 2 seconds

    return () => clearTimeout(timer); // Cleanup timeout
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../AnimationJson/SplashAnimation.json')} // Replace with your Lottie animation file
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your background color here
  },
});

export default SplashScreen;
