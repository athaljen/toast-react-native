import {ReactNode} from 'react';
import {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';

export type ToastProps = {
  children?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  duration?: number;
};
export type ToastProviderProps = {
  children: ReactNode;
  style: StyleProp<ViewStyle>;
};
export type ToastState = {message: string; isError?: boolean};
export type ShowToastConfig = {message: string; isError?: boolean};
