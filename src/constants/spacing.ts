// @flow

/*******************************************************************************
 * Ui Specification Variables
 ******************************************************************************/
const pixie = 8;
const hobbit = 12;
const dwarf = 16;
const elf = 24;
const horse = 32;
const giant = 48;
const dragon = 64;

export default {
  maxPushQuestions: 3,

  // Layouting (Deprecated names)
  spacingTiny: pixie,
  spacingAlmostTiny: hobbit,
  spacingExtraSmall: dwarf,
  spacingSmall: elf,
  spacingNormal: horse,
  spacingLarge: giant,
  spacingExtraLarge: dragon,

  spacingPixie: pixie,
  spacingHobbit: hobbit,
  spacingDwarf: dwarf,
  spacingBase: elf,
  spacingHorse: horse,
  spacingGiant: giant,
  spacingDragon: dragon,

  spacing8: pixie,
  spacing12: hobbit,
  spacing16: dwarf,
  spacing24: elf,
  spacing28: 28,
  spacing32: horse,
  spacing48: giant,
  spacing64: dragon,

  // Padding values for screens
  screenPaddingHorizontal: elf,
  screenPaddingVertical: elf,

  // CaseMessages Variables
  spacingCaseMessageItem: dwarf,

  thumbExtraSmall: 32,
  thumbDoctor: 44,
  thumbSmall: 48, // ServiceExplanation
  thumbNormal: 56, // on GuideList
  thumbLarge: 96, // ...
  thumbExtraLarge: 132, // on GuideInfoScreen

  // Fonts
  buttonFontSize: 14,
  bodyFontSize: 17.5,
  smallBodyFontSize: 14.5,
  titleFontSize: 14.5, // serviceExplanation
  linkFontSize: 14.5, // Example: Läs mer på 1177.se ->
  paragraphFontSize: 17.5,
  HeadlineFontSize: 21,
  LargeHeadlineFontSize: 28,
  LargeHeadlineLineHeight: 32,
  disclaimerFontSize: 14.5,

  // Animation
  navigationTime: 600,
  paneAwayOpacity: 0.3,
  coinSpinAnimationTime: 600,

  // zIndex
  zIndexNormal: 1,
  zIndex100: 100, // native ListItem
  zIndex1000: 1000, // videochat

  screenWidth: 320,
  screenWidthSmall: 360,
};
