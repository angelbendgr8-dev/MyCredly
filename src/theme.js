import {createTheme} from '@shopify/restyle';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const palette = {
  blue: '#6294CD',
  green: '#A7E05F',
  darkgreen: '#0CFEBC',
  red: '#F92A4C',
  pink: '#F73B71',
  gray: '#252836',
  black: '#1F1D2B',
  lightBlue: '#29B9DC',
  purple: '#ED62F6',
  white: '#FFFFFF',
  muted: '#8A8D9F',
  faint: '#1E1F20',
  progress: '#522ED2',
  transparent: 'rgba(1,1,1,0.1)',
  warning: '#FFB721',
  light: '#FEFEFE',
};

export const theme = createTheme({
  colors: {
    background: palette.black,
    foreground: palette.white,
    primary: palette.blue,
    success: palette.green,
    success1: palette.darkgreen,
    warning: palette.warning,
    danger: palette.red,
    secondary: palette.gray,
    info: palette.lightBlue,
    light: palette.light,
    muted: palette.muted,
    faint: palette.faint,
    progress: palette.progress,
    transparent: palette.transparent,
    pink: palette.pink,
  },

  spacing: {
    s: 4,
    my2: heightPercentageToDP('2%'),
    my1: heightPercentageToDP('1%'),
    mx1: widthPercentageToDP('1%'),
    my3: heightPercentageToDP('3%'),
    mx3: widthPercentageToDP('3%'),
    mx2: widthPercentageToDP('2%'),
    my4: heightPercentageToDP('4%'),
    my7: heightPercentageToDP('7%'),
    py4: heightPercentageToDP('4%'),
    mx4: widthPercentageToDP('3.5%'),
    py2: heightPercentageToDP('2%'),
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    bold: {
      fontFamily: 'Roboto-Bold',
      fontSize: RFValue(30),
      lineHeight: 39,
      color: 'foreground',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      lineHeight: 21,
      color: 'foreground',
    },
    regular: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      lineHeight: 21,
      color: 'foreground',
    },
  },
});

export type Theme = typeof theme;
export default theme;
