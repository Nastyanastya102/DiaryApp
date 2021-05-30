import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { optionalRequire } from './routeBuilder';

const Stack = createStackNavigator();

export const Screens = [
  {
    getComponent() {
      return optionalRequire(() => require('../../screens/About'));
    },
    name: 'StatusBar',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../../screens/News'));
    },
    name: 'Alert',
  },
  {
    getComponent() {
      return optionalRequire(() => require('../../screens/Notes'));
    },
    name: 'AppAuth',
    options: { title: 'App Auth' },
  },
];

const TabNavigator = () => {
  return (
    <>
      {Screens.map(({ name, options, getComponent }) => (
        <Stack.Screen
          name={name}
          key={name}
          getComponent={getComponent}
          options={options || {}}
        />
      ))}
    </>
  );
};

export default TabNavigator;
