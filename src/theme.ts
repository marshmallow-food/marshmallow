import {StatusBarStyle} from 'react-native';
import {Colors} from './constants/colors';

const CommonTheme = {
  gridUnit: 4,
  fontFamily: 'Helvetica',
};

export const LightTheme = {
  barStyle: 'dark-content' as StatusBarStyle,
  colors: {
    background: Colors.white,
    text: Colors.black,
    ...Colors,
  },
  ...CommonTheme,
};

export const DefaultTheme = LightTheme;

export const DarkTheme = {
  barStyle: 'light-content' as StatusBarStyle,
  colors: {
    background: Colors.black,
    text: Colors.white,
    ...Colors,
  },
  ...CommonTheme,
};

export type ThemeType = 'light' | 'dark' | 'system';

export const Themes: Record<ThemeType, typeof DefaultTheme> = {
  light: LightTheme,
  dark: DarkTheme,
  system: DefaultTheme,
};
