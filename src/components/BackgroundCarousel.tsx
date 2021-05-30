// @flow

import { _t } from 'docly-intl';
import React, { Component } from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../constants/colors';
import constants from '../constants/spacing';
import Experiment from './Expirement';

type Props = {};
type State = {
  swipeX: Animated.Value;
  xPos: Animated.Value;
};

const { screenWidth, screenHeight, isAndroid } = constants;

const getAdjustedFontSize = (size) => {
  switch (deviceSize()) {
    case 'small':
      return 0.65 * size;
    case 'normal':
      if (isAndroid) {
        return 0.9 * size;
      }
    default:
      return size;
  }
};

const getSlide = (e: Object) =>
  Math.round(e.nativeEvent.contentOffset.x / screenWidth) + 1;

const sliderConfig: {
  slideDuration: number;
  disabledOpacity: number;
  arrowHitSlop: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  dotHitSlop: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  maxCards: number;
} = Object.freeze({
  slideDuration: 300,
  disabledOpacity: 0.4,
  arrowHitSlop: {
    top: 12,
    left: 12,
    bottom: 12,
    right: 12,
  },
  dotHitSlop: {
    top: 5,
    left: 5,
    bottom: 5,
    right: 5,
  },
  get maxCards(): number {
    return BackgroundCarousel.cards.length;
  },
});

class BackgroundCarousel extends Component<Props, State> {
  scrollView: Animated.ScrollView;
  leftIndicator: TouchableOpacity;
  rightIndicator: TouchableOpacity;

  state = {
    swipeX: new Animated.Value(0),
    xPos: new Animated.Value(0),
    slide: 1,
    dots: [
      new Animated.Value(1),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ],
  };

  static get cards(): Array<Object> {
    return [
      {
        index: 0,
        image: require('../../../../images/screens/login/carouselle_image_1.png'),
        title: _t('login.carousel.1.header'),
        body: _t('login.carousel.1.body'),
      },
      {
        index: 1,
        image: require('../../../../images/screens/login/carouselle_image_2.png'),
        title: _t('login.carousel.2.header'),
        body: _t('login.carousel.2.body'),
      },
      {
        index: 2,
        image: require('../../../../images/screens/login/carouselle_image_3.jpg'),
        title: _t('login.carousel.3.header'),
        body: _t('login.carousel.3.body'),
      },
      {
        index: 3,
        image: require('../../../../images/screens/login/carouselle_image_4.png'),
        title: _t('login.carousel.4.header'),
        body: _t('login.carousel.4.body'),
      },
    ];
  }

  isFirstSlide = (): boolean => {
    return this.state.slide === 1;
  };

  isLastSlide = (): boolean => {
    return this.state.slide === sliderConfig.maxCards;
  };

  goToSlide = (slide: number): void => {
    let newPos = screenWidth * slide;

    // Clamping!
    if (newPos <= 0) {
      newPos = 0;
    }

    const maxPos = screenWidth * (sliderConfig.maxCards - 1);
    if (newPos >= maxPos) {
      newPos = maxPos;
    }

    // Do the actual scrolling, this triggers the onMomentumScrollEnd
    // event which does the tracking for us
    this.scrollView.getNode().scrollTo({ x: newPos, y: 0, animated: true });
  };

  slideInDirection = (direction: number): void => {
    // The state is the slides numbering from 1
    this.goToSlide(this.state.slide + direction - 1);
  };

  finishedSliding = (e: SyntheticEvent<any>) => {
    const { trackOnce } = this.props;

    const slide = getSlide(e);

    // State had to be set here for manual sliding because it was returning early
    this.setState({ slide });

    // Don't track if the slide hasn't actually moved
    if (slide === this.state.slide) {
      return;
    }

    // Make the dots follow suit
    this.state.dots.forEach((dot, index) => {
      Animated.timing(dot, {
        toValue: index === slide - 1 ? 1 : 0,
        timing: 400,
        useNativeDriver: false,
      }).start();
    });

    // And the arrows
    if (this.leftIndicator) {
      if (this.isFirstSlide()) {
        this.leftIndicator.setOpacityTo(
          sliderConfig.disabledOpacity,
          sliderConfig.slideDuration
        );
      } else {
        this.leftIndicator.setOpacityTo(1, sliderConfig.slideDuration);
      }
    }
    if (this.rightIndicator) {
      if (this.isLastSlide()) {
        this.rightIndicator.setOpacityTo(
          sliderConfig.disabledOpacity,
          sliderConfig.slideDuration
        );
      } else {
        this.rightIndicator.setOpacityTo(1, sliderConfig.slideDuration);
      }
    }

    // Don't record the first slide since it's what's landed on
    if (slide === 1) {
      return;
    }

    trackOnce('LoginCarouselScreen.Seen', {
      ScreenNumber: slide,
    });
  };

  // Breakpoint range for dots and swipe animation
  inputRange = (index: number) => [
    -screenWidth,
    index * screenWidth + -screenWidth / 2,
    index * screenWidth,
    index * screenWidth + screenWidth / 2,
    index * screenWidth + screenWidth,
  ];

  arrowIndicator = (): View => {
    // pointerEvents="box-none" makes wrapper not have pointer events
    // while child elements keep theirs
    return (
      <View style={styles.arrowIndicator} pointerEvents="box-none">
        <TouchableOpacity
          onPress={() => this.slideInDirection(-1)}
          activeOpacity={0.8}
          disabled={this.isFirstSlide()}
          style={
            this.isFirstSlide() && { opacity: sliderConfig.disabledOpacity }
          }
          inputRef={(component) => (this.leftIndicator = component)}
          hitSlop={sliderConfig.arrowHitSlop}
        >
          <Image
            source={require('../../../../images/components/arrow_left.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.slideInDirection(1)}
          activeOpacity={0.8}
          disabled={this.isLastSlide()}
          style={
            this.isLastSlide() && { opacity: sliderConfig.disabledOpacity }
          }
          inputRef={(component) => (this.rightIndicator = component)}
          hitSlop={sliderConfig.arrowHitSlop}
        >
          <Image
            source={require('../../../../images/components/arrow_right.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  dotIndicator = (): View => (
    <View style={styles.dotBase} pointerEvents="box-none">
      {this.constructor.cards.map((card) => (
        <View key={card.index} style={styles.dot}>
          <Pressable
            onPress={() => this.goToSlide(card.index)}
            style={styles.dot}
            hitSlop={sliderConfig.dotHitSlop}
          >
            <Animated.View
              style={[
                styles.activeDot,
                { opacity: this.state.dots[card.index] },
              ]}
            />
          </Pressable>
        </View>
      ))}
    </View>
  );

  render() {
    return (
      <View>
        <Animated.ScrollView
          style={styles.cardList}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          indicatorStyle={'white'}
          directionalLockEnabled={true}
          allowVerticalScroll={false}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={1}
          decelerationRate={0}
          snapToAlignment={'center'}
          alwaysBounce={true}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.xPos } } }],
            { listener: this.finishedSliding, useNativeDriver: true }
          )}
          ref={(component) => (this.scrollView = component)}
        >
          {this.constructor.cards.map((card) => {
            return (
              <View key={card.index} style={styles.card}>
                <Image source={card.image} style={styles.backgroundImage} />
                <Animated.View
                  style={[
                    styles.intro,
                    {
                      opacity: this.state.xPos.interpolate({
                        inputRange: this.inputRange(card.index),
                        outputRange: [0, 0, 1, 0, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      transform: [
                        {
                          translateX: this.state.xPos.interpolate({
                            inputRange: [
                              -screenWidth,
                              card.index * screenWidth,
                              card.index * screenWidth + screenWidth,
                            ],
                            outputRange: [-300, 0, 100],
                            extrapolate: 'clamp',
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Title1 mb="t" style={styles.header}>
                    {card.title}
                  </Title1>
                  <Body1 mb="t" color={colors.white}>
                    {card.body}
                  </Body1>
                </Animated.View>
              </View>
            );
          })}
        </Animated.ScrollView>
        <Experiment name="login_carousel_indicators" track>
          {(variant) => (variant ? this.arrowIndicator() : null)}
        </Experiment>
        {this.dotIndicator()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardList: {
    alignSelf: 'center',
    width: screenWidth,
    height: screenHeight,
    overflow: 'visible',
    backgroundColor: colors.black,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight,
    width: screenWidth,
    zIndex: 0,
  },
  intro: {
    flex: 1,
    marginHorizontal: constants.screenPaddingHorizontal,
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    zIndex: 1,
    marginBottom: 140,
  },
  header: {
    color: '#fff',
    // fontFamily: fontFamilies.graphikBold,
    fontSize: getAdjustedFontSize(42),
    lineHeight: getAdjustedFontSize(48),
    // iOS and Android uses, and renders, fonts and font weight differently.
    ...Platform.select({
      ios: { fontWeight: '800' },
      android: { fontWeight: '300' },
    }),
  },
  card: {
    width: screenWidth,
  },
  dotBase: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 115,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  activeDot: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: colors.red_500,
    opacity: 0,
  },
  get arrowIndicator(): Object {
    return {
      ...this.dotBase,
      justifyContent: 'space-between',
      alignContent: 'center',
      paddingLeft: constants.spacing24,
      paddingRight: constants.spacing24,
      marginBottom: this.dotBase.marginBottom - this.dot.height,
    };
  },
});

export default BackgroundCarousel;
