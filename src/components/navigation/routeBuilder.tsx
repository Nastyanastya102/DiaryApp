import * as React from 'react';
import { Text, View } from 'react-native';

export const ErroredScreen = ({ message }: { message: string }) => {
  return (
    <View
    // style={{
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}
    >
      <Text>Error: {message}</Text>
    </View>
  );
};

export const optionalRequire = (
  requirer: () => { default: React.ComponentType }
) => {
  try {
    return requirer().default;
  } catch (error) {
    return () => <ErroredScreen message={error.message} />;
  }
};
