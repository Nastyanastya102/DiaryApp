import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Experiment from '../components/Expirement';
import colors from '../constants/colors';
import { fonts } from '../constants/fonts';
import constants from '../constants/spacing';
const backgroundImage = require('../../assets/back.jpeg');

const LoginScreen = () => {
  const [variant] = useState<number>(0);

  const loginButtonRow: (type?: string) => JSX.Element = (type?: string) => {
    return (
      <View
        style={
          type === 'carousel'
            ? styles.carouselButtonRow
            : styles.staticBackgroundButtonRow
        }
      >
        <Button
          onPress={() =>
            // patientLogin(navigation, isBankId, loginWithEmailAndPassword)
            console.log('gvljhn;iub')
          }
        >
          {/* <Image source={bankIdIcon} style={styles.buttonIcon} /> */}
          <Text style={[fonts.button, { color: colors.white }]}>Log in</Text>
        </Button>
      </View>
    );
  };

  // 0: The login screen with a static background
  const staticBackground: JSX.Element = (
    <View style={styles.root}>
      <View style={styles.intro}>
        {/* <Image source={logo} style={styles.staticBackgroundLogo} /> */}
        {/* <Text style={styles.header}>texttt</Text>
        <Text style={{ color: colors.white }}>text2222</Text> */}
      </View>
      {loginButtonRow()}
      <Image
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
    </View>
  );

  // 1: The login screen with a carousel where you can swipe between cards
  const carousel = (
    <View>
      {/* <Image source={logo} style={styles.carouselLogo} /> */}
      {/* <BackgroundCarousel /> */}
      {loginButtonRow('carousel')}
    </View>
  );

  return (
    // @experiment login_screen_carousel
    <Experiment>{variant === 1 ? carousel : staticBackground}</Experiment>
  );
};

export default LoginScreen;

// Fix for some android devices
// const w = Dimensions.get('screen');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: colors.black,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    // height: w.height,
    // width: w.width,
  },
  header: {
    color: '#fff',
  },
  staticBackgroundButtonRow: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    padding: constants.spacingSmall,
    paddingTop: constants.spacingTiny,
    zIndex: 1,
    marginRight: constants.spacing8,
  },
  carouselButtonRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: constants.spacingSmall,
    paddingTop: constants.spacingTiny,
  },
  intro: {
    flex: 1,
    marginHorizontal: constants.screenPaddingHorizontal,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
    marginBottom: constants.spacing32,
  },
  buttonIcon: {
    marginRight: constants.spacing8,
    width: 27,
    height: 26,
  },
  staticBackgroundLogo: {
    zIndex: 1,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: constants.spacing32,
    left: 4,
  },
  carouselLogo: {
    zIndex: 1,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 2 * constants.spacing24,
    left: constants.spacing16,
  },
});
