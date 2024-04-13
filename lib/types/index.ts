import {ReactNode} from 'react';
import {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ToastType} from '../constants';

export type ToastProps = {
  /**Toast message test style */
  textStyle?: StyleProp<TextStyle>;
  /**Toast container style */
  containerStyle?: StyleProp<ViewStyle>;
  /**icon style for the Toast */
  iconStyle?: StyleProp<ImageStyle>;
  /**global Duration for the Toast */
  duration?: number;
};

export type ToastProviderProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
} & ToastProps;

export type ToastState = {message: string; type: ToastType | undefined};

export interface ShowToastConfig {
  /**message to be shown in Toast */
  message: string;
  /**Toast to b shown, default simple Toast will appear without any icons */
  type?: ToastType;
  /**this will override the default duration set globally */
  duration?: number;
}
