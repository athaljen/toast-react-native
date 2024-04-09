import React, { memo } from "react";
import { Component, ReactNode } from "react";
import { Animated, StyleSheet, View } from "react-native";

type ToastProps = {
  children?: ReactNode;
};

class ToastComponent extends Component<ToastProps> {
  animation: Animated.Value;
  constructor(props: ToastProps | Readonly<ToastProps>) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  showToast() {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(this.animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 2500);
    });
  }

  render(): ReactNode {
    return (
      <View style={styles.toast}>
        {this.props.children}
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [
                {
                  translateY: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 100],
                  }),
                },
              ],
            },
          ]}
        ></Animated.View>
      </View>
    );
  }
}

const ToastRef = React.createRef<ToastComponent>();

const ToastProvider = memo((props: ToastProps) => {
  return <ToastComponent {...props} ref={ToastRef} />;
});

const styles = StyleSheet.create({
  toast: { flex: 1 },
  toastContainer: {
    position: "absolute",
    top: 0,
    height: 100,
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#1c1c1c",
  },
});

export const Toast = () => {
  ToastRef.current?.showToast();
};

export default ToastProvider;
