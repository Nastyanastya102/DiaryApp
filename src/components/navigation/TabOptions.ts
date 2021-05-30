export const TabBarOptions = {
  initialRouteName: __DEV__ ? 'AchievementsScreen' : 'MapScreen',
  order: ['MapScreen', 'CreateScreen', 'AchievementsScreen'],
  // Default config for all screens
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  lazy: true,

  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: '#5cb85c',
    },
  },
};
