import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HeaderStyleInterpolators } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  header: Platform.select({
    default: {
      backgroundColor: colors.headerBackground,
    },
    android: {
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
  }),
  headerTitle: {
    color: colors.headerTitle,
  },
  card: {
    backgroundColor: colors.greyBackground,
  },
});

const getStackConfig = ({
  navigation,
}: {
  navigation: BottomTabNavigationProp<any>;
}) => {
  return {
    cardStyle: styles.card,
    screenOptions: () => ({
      headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
      headerStyle: styles.header,
      headerTintColor: colors.tintColor,
      headerTitleStyle: styles.headerTitle,
      headerPressColorAndroid: colors.tintColor,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('search')}
          style={{ marginRight: 16 }}
        >
          {/* <Ionicons
            name="md-search"
            size={Platform.OS === 'ios' ? 22 : 25}
            color={colors.tintColor}
          /> */}
        </TouchableOpacity>
      ),
    }),
  };
};

export default getStackConfig;
