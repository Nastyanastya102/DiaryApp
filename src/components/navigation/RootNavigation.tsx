import React, { useEffect, useState } from 'react';
import { Animated, AppState, StyleSheet, View } from 'react-native';
import CoverScreen from '../../screens/CoverScreen';
import StackNavigator from './StackNavigator';

const RootNavigation: React.FunctionComponent = () => {
  const [showCoverScreen, setShowCoverScreen] = useState<boolean>(false);
  const [coverScreenOpacity] = useState<any>(new Animated.Value(1));

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  });

  const _handleAppStateChange = (nextAppState: any) => {
    if (nextAppState !== 'active') {
      Animated.timing(coverScreenOpacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start(() => {
        setShowCoverScreen(true);
      });
      return;
    }

    setTimeout(() => {
      Animated.timing(coverScreenOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setShowCoverScreen(false);
      });
    }, 1);
  };

  return (
    <View style={styles.root}>
      <StackNavigator />
      {showCoverScreen && <CoverScreen opacity={coverScreenOpacity} />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default RootNavigation;
