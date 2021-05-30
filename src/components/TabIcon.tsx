import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import { TabBarOptions } from '../components/navigation/TabOptions';
import colors from '../constants/colors';
import About from '../screens/About';
import News from '../screens/News';
import Notes from '../screens/Notes';

interface Props {
  name: string;
  focused?: boolean;
  size?: number;
}

const Tab = createMaterialBottomTabNavigator();

export default class TabIcon extends React.PureComponent<Props> {
  render() {
    const { size = 27, name, focused } = this.props;
    const color = focused ? colors.tabIconSelected : colors.tabIconDefault;

    const platformSize = Platform.select({
      ios: size,
      default: size - 2,
    });

    return (
      <Tab.Navigator {...TabBarOptions}>
        <Tab.Screen component={Notes} name={name as any} />
        <Tab.Screen component={News} name={name as any} />
        <Tab.Screen component={About} name={name as any} />
      </Tab.Navigator>
    );
  }
}
