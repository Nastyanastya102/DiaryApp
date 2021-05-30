import colors from './colors';

const Platform = { OS: 'web' };

const platformSwitch = (ios, android, def) => {
  switch (Platform.OS) {
    case 'ios':
      return ios;
    case 'android':
      return android;
    default:
      return def;
  }
};

export const webFamily =
  '"Graphik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif';
export const fontFamilies = {
  graphikLight: platformSwitch(
    'GraphikLCApp-Light',
    'Graphik_light',
    webFamily
  ),
  graphikRegular: platformSwitch(
    'GraphikLCApp-Regular',
    'Graphik_regular',
    webFamily
  ),
  graphikMedium: platformSwitch(
    'GraphikLCApp-Medium',
    'Graphik_medium',
    webFamily
  ),
  graphikSemibold: platformSwitch(
    'GraphikLCApp-Semibold',
    'Graphik_semibold',
    webFamily
  ),
  graphikBold: platformSwitch('GraphikLCApp-Bold', 'Graphik_bold', webFamily),
};
export const fonts: any = {
  /* Header Fonts */
  display: {
    // fontFamily: fontFamilies.graphikSemibold,
    fontSize: 36,
    lineHeight: 44,
    color: colors.off_black,
    fontWeight: '600',
  },
  title1: {
    // fontFamily: fontFamilies.graphikSemibold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.off_black,
    fontWeight: '600',
  },
  title2: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 22,
    lineHeight: 28,
    color: colors.off_black,
    fontWeight: '500',
  },
  subhead: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 19,
    lineHeight: 26,
    color: colors.off_black,
    fontWeight: '500',
  },
  intro: {
    // fontFamily: fontFamilies.graphikRegular,
    fontSize: 18,
    lineHeight: 26,
    color: colors.off_black,
  },
  introMedium: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 18,
    lineHeight: 26,
    color: colors.off_black,
  },
  body1: {
    // fontFamily: fontFamilies.graphikRegular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.off_black,
  },
  body1Medium: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 16,
    lineHeight: 24,
    color: colors.off_black,
  },
  body2: {
    // fontFamily: fontFamilies.graphikRegular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.off_black,
  },
  body2Medium: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.off_black,
  },
  body3: {
    // fontFamily: fontFamilies.graphikRegular,
    fontSize: 13,
    lineHeight: 20,
    color: colors.off_black,
  },
  body3Medium: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 13,
    lineHeight: 20,
    color: colors.off_black,
  },
  body4: {
    // fontFamily: fontFamilies.graphikRegular,
    fontSize: 11,
    lineHeight: 18,
    color: colors.off_black,
  },
  body5: {
    // fontFamily: fontFamilies.graphikRegular,
    fontSize: 9,
    lineHeight: 13,
    color: colors.off_black,
    marginBottom: 12,
  },

  tab: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 9,
    lineHeight: 16,
    color: colors.off_black,
    marginBottom: 2,
  },
  button: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: colors.off_black,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textLink: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 18,
    lineHeight: 26,
    color: colors.red_500,
    marginBottom: 12,
  },
  textLinkUnderline: {
    // fontFamily: fontFamilies.graphikMedium,
    fontSize: 9,
    lineHeight: 16,
    color: colors.off_black,
    textDecoration: 'underline',
    marginBottom: 12,
  },

  // web legacy, proper typography components should be used, cleanup later
  body: webFamily,
  header: webFamily,
};
