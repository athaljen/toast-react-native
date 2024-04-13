import React, {memo} from 'react';
import {View} from 'react-native';
import ToastComponent from './components/ToastComponent';
import {ShowToastConfig, ToastProviderProps} from './types';
import {styles} from './constants';

const ToastRef = React.createRef<ToastComponent>();

export const Toast = (config: ShowToastConfig) => {
  ToastRef.current?.showToast(config);
};

const ToastProvider = memo((props: ToastProviderProps) => {
  return (
    <View style={[styles.flex1, props.style]}>
      {props.children}
      <ToastComponent ref={ToastRef} />
    </View>
  );
});

export default ToastProvider;
