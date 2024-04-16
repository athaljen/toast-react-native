import React, { Component } from "react";
import {
  Animated,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
} from "react-native";
import { ShowToastConfig, ToastProps, ToastState } from "../types";
import { colors, Icons, safeTop } from "../constants";

let timeOut: any;

class ToastComponent extends Component<ToastProps, ToastState> {
  private animation: Animated.Value;
  private panResponser: PanResponderInstance;
  private transitionY: Animated.Value;

  static defaultProps: ToastProps = {
    duration: 2500,
  };

  constructor(props: ToastProps | Readonly<ToastProps>) {
    super(props);
    this.state = { message: "", type: undefined };
    this.animation = new Animated.Value(0);
    this.props.duration;
    this.transitionY = new Animated.Value(-safeTop);
    this.panResponser = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          this.transitionY.setValue(gesture.dy);
        }
      },
      onPanResponderEnd: () => {
        this.deAnimate();
      },
    });
  }

  animate() {
    Animated.parallel([
      Animated.spring(this.animation, {
        useNativeDriver: true,
        bounciness: 15,
        toValue: 1,
      }),
      Animated.spring(this.transitionY, {
        useNativeDriver: true,
        toValue: safeTop,
        bounciness: 15,
      }),
    ]).start(() => {});
  }

  deAnimate() {
    clearTimeout(timeOut);
    Animated.parallel([
      Animated.spring(this.animation, {
        useNativeDriver: true,
        bounciness: 15,
        toValue: 0,
      }),
      Animated.spring(this.transitionY, {
        useNativeDriver: true,
        toValue: -safeTop,
        bounciness: 15,
      }),
    ]).start(() => {});
    setTimeout(() => {
      this.setState({ message: "", type: undefined });
    }, 500);
  }

  showToast(config: ShowToastConfig) {
    // this.animation.resetAnimation();
    this.setState({ message: config.message, type: config.type });

    this.animate();
    timeOut = setTimeout(() => {
      this.deAnimate();
    }, config.duration || this.props.duration);
  }

  renderIcon = () => {
    if (!this.state.type) return;
    return (
      <Animated.Image
        style={[styles.icon, this.props.iconStyle]}
        source={Icons[this.state.type]}
        resizeMode="contain"
      />
    );
  };

  render() {
    return (
      <Animated.View
        {...this.panResponser.panHandlers}
        style={[
          styles.toastContainer,
          this.props.containerStyle,
          {
            // opacity: this.animation,
            transform: [
              { translateY: this.transitionY },
              {
                scale: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      >
        {this.renderIcon()}
        <Text style={[styles.message, this.props.textStyle]} numberOfLines={4}>
          {this.state.message}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    marginHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: colors.black_gray,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    overflow: "hidden",
    zIndex: 999,
  },
  message: {
    color: colors.white,
    flex: 1,
    textAlign: "left",
    marginLeft: 8,
    marginVertical: 5,
  },
  iconContainer: {
    height: 25,
    width: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginRight: 15,
  },
  icon: { height: 28, width: 28, margin: 5 },
});

export default ToastComponent;
