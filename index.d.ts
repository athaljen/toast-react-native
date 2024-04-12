import React, { ReactNode } from "react";

declare module "toast-react-native" {
  export interface ShowToastConfig {
    message: string;
    duration?: number;
  }

  export interface ToastProviderProps {
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
