import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { ImageStyle } from "react-native-fast-image";

declare module "toast-react-native" {
  export enum ToastType {
    SUCCESS = "SUCCESS",
    INFO = "INFO",
    ERROR = "ERROR",
    WARNING = "WARNING",
  }

  export interface ShowToastConfig {
    /**message to be shown in Toast */
    message: string;
    /**Toast to b shown, default simple Toast will appear without any icons */
    type?: ToastType;
    /**this will override the default duration set globally */
    duration?: number;
  }

  export interface ToastProps {
    /**Toast message test style */
    textStyle?: StyleProp<TextStyle>;
    /**Toast container style */
    containerStyle?: StyleProp<ViewStyle>;
    /**icon style for the Toast */
    iconStyle?: StyleProp<ImageStyle>;
    /**global Duration for the Toast */
    duration?: number;
  }

  export interface ToastProviderProps extends ToastProps {
    style?: ViewStyle;
    children: React.ReactNode;
  }

  export class ToastComponent extends React.Component<ToastProps> {
    showToast(config: ShowToastConfig): void;
  }

  const ToastRef: React.RefObject<ToastComponent>;

  const ToastProvider: React.FC<ToastProviderProps>;

  const Toast: (config: ShowToastConfig) => void;

  export default ToastProvider;
  export { Toast };
}
