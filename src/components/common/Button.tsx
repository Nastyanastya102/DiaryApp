import React, { useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';

// import { fonts } from '../../../common/components/typography/index';

// Base stylesheets shared by all buttons
const styles = StyleSheet.create({
  backgroundBase: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  textBase: {
    //   ...fonts.button,
  },
});

interface Shape {
  pressed: Button;
  disabled: Button;
}

interface Button {
  backgroundColor: string;
  borderColor: string;
  color: string;
}

// Button specific properties for each type of button
const buttonProps: { [key: string]: Button & Shape } = {
  solid: {
    backgroundColor: colors.black,
    borderColor: colors.black,
    color: colors.white,

    pressed: {
      backgroundColor: colors.black,
      borderColor: colors.black,
      color: colors.white,
    },

    disabled: {
      backgroundColor: colors.red_500 + '15',
      borderColor: 'transparent',
      color: colors.white,
    },
  },

  dark: {
    backgroundColor: colors.grey_900,
    borderColor: colors.grey_900,
    color: colors.white,

    pressed: {
      backgroundColor: colors.off_black,
      borderColor: colors.off_black,
      color: colors.white,
    },

    disabled: {
      backgroundColor: colors.off_black + '15',
      borderColor: 'transparent',
      color: colors.white,
    },
  },

  ghost: {
    backgroundColor: colors.white,
    borderColor: colors.off_black,
    color: colors.grey_900,

    pressed: {
      backgroundColor: colors.grey_300,
      borderColor: colors.off_black,
      color: colors.grey_900,
    },

    disabled: {
      backgroundColor: colors.white,
      borderColor: colors.grey_200,
      color: colors.grey_200,
    },
  },

  flat: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    color: colors.grey_900,

    pressed: {
      backgroundColor: colors.grey_300,
      borderColor: colors.grey_300,
      color: colors.grey_900,
    },

    disabled: {
      backgroundColor: colors.white,
      borderColor: colors.white,
      color: colors.grey_200,
    },
  },

  link: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    color: colors.grey_900,

    pressed: {
      backgroundColor: colors.grey_300,
      borderColor: colors.grey_300,
      color: colors.grey_900,
    },

    disabled: {
      backgroundColor: colors.white,
      borderColor: colors.white,
      color: colors.grey_200,
    },
  },
};

interface Overrides {
  buttonColor?: string;
  buttonHighlightColor?: string;
  buttonBackgroundColor?: string;
  textColor?: string;
}

interface Props {
  children?: React.ReactNode;
  type?: 'solid' | 'dark' | 'ghost' | 'flat' | 'link';
  disabled?: boolean;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  isHero?: boolean;
  style?: any;
  overrides?: Overrides;
  onPress?: () => void;
}

interface State {
  pressed: Animated.Value;
}

const Button = (props: Props) => {
  let buttonStyle: { [string: string]: any } = {};
  const [pressed, setPessed] = useState(new Animated.Value(0));

  const togglePressState = (bool: boolean) => {
    if (!props.disabled) {
      Animated.timing(pressed, {
        toValue: bool ? 1 : 0,
        duration: bool ? 50 : 300,
        delay: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  // Method that returns an animated color value that is triggered when pressing a button.
  // Used on backgrounds, borders and texts to highlight a button press.
  const getAnimatedColor = (color: string, highlightColor: string) => {
    return pressed.interpolate({
      inputRange: [0, 1],
      outputRange: [color, highlightColor],
    });
  };

  // Method that returns button root, and button text styles.
  // Fetching props from the buttonProps object that holds specifications for each button.
  const getButtonStyle = (
    type: string,
    disabled: boolean,
    {
      buttonColor: buttonBackgroundColor,
      buttonHighlightColor: overrideBorderColor,
      textColor: overrideTextColor,
    }: Overrides = {}
  ) => {
    const buttonType: string = buttonProps.hasOwnProperty(type)
      ? type
      : 'solid';

    // Link is special since it not formatted the same way as the other types
    if (buttonType === 'link') {
      buttonStyle = {
        background: {
          paddingHorizontal: 0,
          borderWidth: 0,
          borderRadius: 0,
        },
        text: {
          color: disabled
            ? buttonProps.link.disabled.color
            : getAnimatedColor(
                overrideTextColor || buttonProps.link.color,
                overrideTextColor || buttonProps.link.pressed.color
              ),
        },
      };
    } else {
      buttonStyle = {
        background: {
          borderWidth: 2,
          backgroundColor: disabled
            ? buttonProps[buttonType].disabled.backgroundColor
            : getAnimatedColor(
                buttonBackgroundColor ||
                  buttonProps[buttonType].backgroundColor,
                buttonBackgroundColor ||
                  buttonProps[buttonType].pressed.backgroundColor
              ),
          borderColor: disabled
            ? buttonProps[buttonType].disabled.borderColor
            : getAnimatedColor(
                overrideBorderColor || buttonProps[buttonType].borderColor,
                overrideBorderColor ||
                  buttonProps[buttonType].pressed.borderColor
              ),
        },
        text: {
          color: disabled
            ? buttonProps[buttonType].disabled.color
            : getAnimatedColor(
                overrideTextColor || buttonProps[buttonType].color,
                overrideTextColor || buttonProps[buttonType].pressed.color
              ),
        },
      };
    }
  };

  const {
    children = '[No button text added]',
    type = 'solid',
    disabled = false,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 12,
    style,
    overrides,
  } = props;

  getButtonStyle(type, disabled, overrides);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => togglePressState(true)}
      onPressOut={() => togglePressState(false)}
      {...props}
    >
      <Animated.View
        style={[
          styles.backgroundBase,
          buttonStyle.background,
          {
            marginTop,
            marginRight,
            marginBottom,
          },
          style,
        ]}
      >
        {typeof children === 'string' && (
          <Animated.Text style={[styles.textBase, buttonStyle.text]}>
            {children}
          </Animated.Text>
        )}
        {typeof children !== 'string' && children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Button;
