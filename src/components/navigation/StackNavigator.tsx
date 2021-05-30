import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { routes } from '../../constants/route';
import LoginScreen from '../../screens/Login';
import TabIcon from '../TabIcon';
import getStackConfig from './StackConfig';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const StackNavigator = (props: any) => {
  return (
    <Stack.Navigator {...props} {...getStackConfig(props)}>
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.ROOT}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const icon = ({ focused }: { focused: boolean }) => {
  return <TabIcon name="code-tags" focused={focused} />;
};

StackNavigator.navigationOptions = {
  title: 'APIs',
  tabBarLabel: 'APIs',
  tabBarIcon: icon,
  drawerIcon: icon,
};

export default StackNavigator;
