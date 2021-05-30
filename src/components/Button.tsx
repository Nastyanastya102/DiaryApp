// @flow
import * as React from 'react';
import NativeButton from './common/Button';

type WithChildren<T = {}> = T & { children?: React.ReactNode };

type ButtonProps = WithChildren<{
  onPress?: () => void;
  type?: 'ghost' | 'flat' | 'solid';
  disabled?: boolean;
  marginTop?: number;
  marginBottom?: number;
}>;

const Button = ({
  onPress,
  children,
  type,
  disabled,
  marginTop,
  marginBottom,
}: ButtonProps) => {
  return (
    <NativeButton
      onPress={onPress}
      children={children}
      type={type}
      disabled={disabled}
      marginTop={marginTop}
      marginBottom={marginBottom}
    />
  );
};

export default Button;
