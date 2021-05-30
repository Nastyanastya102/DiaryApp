/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import RootNavigation from './components/navigation/RootNavigation';

// const Section: React.FC<{
//   title: string;
// }> = ({ children, title }) => {
// const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? colors.white : colors.black,
//           },
//         ]}
//       >
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? colors.light : colors.dark,
//           },
//         ]}
//       >
//         {children}
//       </Text>
//     </View>
//   );
// };

const App: React.FunctionComponent = (props: any) => {
  // const isDarkMode: boolean = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: !isDarkMode ? '#000' : '#fff',
  // };

  return (
    <NavigationContainer fallback={<Text>Loading…</Text>}>
      <RootNavigation {...props} />
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
