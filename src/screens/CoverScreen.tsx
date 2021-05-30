import React from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const logo = require('../../assets/closed-notebook.jpg');

export const CoverScreen = ({ opacity }: { opacity: any }) => (
  <Animated.View style={[styles.coverScreen, { opacity: opacity }]}>
    <Image source={logo} style={styles.image} />
  </Animated.View>
);

const styles = StyleSheet.create({
  coverScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.off_black,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default CoverScreen;
