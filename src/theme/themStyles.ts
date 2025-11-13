import { Dimensions, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT ,fontScale } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH > 768; 

const sizes = {
    SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SCALE: fontScale,

  Width: SCREEN_WIDTH,
  Height: SCREEN_HEIGHT,
  Scale: fontScale,

  ScreenPadding: wp(isTablet ? '3%' : '5%'),
  Padding: wp(isTablet ? '3%' : '4%'),
  Radius: wp(isTablet ? '3%' : '4.5%'),
  Base: wp(isTablet ? '1.5%' : '2%'),
  LowBase: wp(isTablet ? '0.8%' : '1%'),
  header: wp(isTablet ? '8%' : '12.4%'),
  Field: wp(isTablet ? '8%' : '11%'),
  HighBase: wp(isTablet ? '3%' : '4%'),
  Header: isTablet ? hp('9%') : hp('6.5%'),

  paddingXS: wp(isTablet ? '1.5%' : '2%'),
  paddingS: wp(isTablet ? '2%' : '3%'),
  paddingM: wp(isTablet ? '3%' : '4%'),
  paddingL: wp(isTablet ? '4%' : '6%'),

  marginXS: wp(isTablet ? '1.5%' : '2%'),
  marginS: wp(isTablet ? '2%' : '3%'),
  marginM: wp(isTablet ? '3%' : '4%'),
  marginL: wp(isTablet ? '4%' : '6%'),

  fontXS: hp(isTablet ? '1.2%' : '1.3%'),
  fontS: hp(isTablet ? '1.4%' : '1.6%'),
  fontM: hp(isTablet ? '1.8%' : '2%'),
  fontL: hp(isTablet ? '2.2%' : '2.5%'),
  fontXL: hp(isTablet ? '2.8%' : '3%'),
  fontXXL: hp(isTablet ? '3.5%' : '4%'),

  iconS: hp(isTablet ? '1.8%' : '2%'),
  iconM: hp(isTablet ? '2.5%' : '3%'),
  iconL: hp(isTablet ? '3.5%' : '4%'),

  buttonHeightS: hp(isTablet ? '4.5%' : '5%'),
  buttonHeightM: hp(isTablet ? '5.5%' : '6%'),
  buttonHeightL: hp(isTablet ? '6.5%' : '7%'),
};

const colors = {
   greyishBlue:'#E9ECF1',
  primaryBackground: '#F8CEEC',
  primaryBackgroundGradient: ['#A88BEB', '#F8CEEC'],

  cardBackground: '#FFFFFF',
  pinkGradient: ['#FAD0C4', '#FFD1FF'],

  gold: '#FFD65A',
  yellow: '#FFE59A',
  orange: '#FF855D',
  red: '#F46B45',
  blue: '#58C3FF',
  green: '#4CAF50',
  tealBlue:'#4DD0E1',
  purple: '#9A5BFF',
  grey: '#E0E0E0',

  textDark: '#1F1F1F',
  textGrey: '#9A9A9A',
  textLight: '#FFFFFF',

  borderLight: '#E8E8E8',
  shadow: 'rgba(0, 0, 0, 0.1)',
  transparent: 'transparent',
  black:'black',
   primary: '#0075CB',
  primary2: '#47B2FF',
  secondary: '#A1D7F0',
  secondary2: '#FEDBDA',
  mixed: '#F3719B',
  CoinCard:'#FFF6D2',

  background: '#F8F8FF',
  questionPaperBackground: '#E3E4E6',
  modalBackground: 'rgba(0,0,0,0.5)',
  borderColor: '#000000',
  disable: '#D9D9D9',

  textPrimary: '#6A6A6A',

  success: '#228B22',
  successBackground:'#E9F8EA',
  error: '#D70040',
  rating: '#FFBB1D',

  white: '#FFFFFF',

  gradientPrimary: ['#0075CB', '#47B2FF'],
  gradientPink: ['#FAD0C4', '#FFD1FF'],
  gradientPurple: ['#A88BEB', '#F8CEEC'],
  
};

const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

const textStyles = StyleSheet.create({
  headingXL: {
    fontSize: sizes.fontXXL,
    fontWeight: fontWeights.extraBold,
    color: colors.textDark,
  },
  heading: {
    fontSize: sizes.fontL,
    fontWeight: fontWeights.bold,
    color: colors.textDark,
  },
  subHeading: {
   color: colors.black,
              fontWeight: fontWeights.extraBold,
              fontSize: sizes.fontL,
  },
  body: {
    fontSize: sizes.fontS,
    fontWeight: fontWeights.regular,
    color: colors.textDark,
  },
  small: {
    fontSize: sizes.fontXS,
    fontWeight: fontWeights.regular,
    color: colors.textGrey,
  },
  buttonText: {
    fontSize: sizes.fontM,
    fontWeight: fontWeights.semiBold,
    color: colors.textLight,
    textAlign: 'center',
  },
  successText: {
    fontSize: sizes.fontS,
    color: colors.success,
    fontWeight: fontWeights.bold,
  },
  coinText: {
    fontSize: sizes.fontS,
    fontWeight: fontWeights.bold,
  color:colors.black
  },

  Bold1: {
    fontSize: wp(5),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.59,
    color: colors.textDark,
  },
  Bold2: {
    fontSize: wp(4),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.59,
    color: colors.textDark,
  },
  Bold3: {
    fontSize: wp(3),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.59,
    color: colors.textDark,
  },
  Bold4: {
    fontSize: wp(3.5),
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.59,
    color: colors.textDark,
  },

  Medium1: {
    fontSize: wp(5),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.59,
    color: colors.textDark,
  },
  Medium2: {
    fontSize: wp(4),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.59,
    color: colors.textDark,
  },
  Medium3: {
    fontSize: wp(3),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.59,
    color: colors.textDark,
  },
  Medium4: {
    fontSize: wp(3.5),
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.59,
    color: colors.textDark,
  },

  Regular1: {
    fontSize: wp(5),
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.59,
    color: colors.textPrimary,
  },
  Regular2: {
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.59,
    color: colors.textPrimary,
  },
  Regular3: {
    fontSize: wp(3),
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.59,
    color: colors.textPrimary,
  },
});


export { sizes, colors, fontWeights, textStyles };
