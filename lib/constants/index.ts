import {Dimensions, NativeModules} from 'react-native';

export const statusBarHeight = NativeModules?.StatusBarManager?.HEIGHT;
export const safeTop = Math.abs(
  Dimensions.get('screen').height -
    Dimensions.get('window').height -
    statusBarHeight -
    10,
);

export const colors = {
  white: '#ffffff',
  black: '#000000',
  black_gray: '#1c1c1c',
  green: '#59b030',
  red: '#f42434',
};
