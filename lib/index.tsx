import React, { memo } from "react";
import { View } from "react-native";
import ToastComponent from "./components/ToastComponent";
import { ShowToastConfig, ToastProviderProps } from "./types";

const ToastRef = React.createRef<ToastComponent>();

export const Toast = (config: ShowToastConfig) => {
  ToastRef.current?.showToast(config);
};

const ToastProvider = memo((props: ToastProviderProps) => {
  return (
    <View style={props.style}>
      {props.children}
      <ToastComponent ref={ToastRef} />
    </View>
  );
});

export default ToastProvider;
