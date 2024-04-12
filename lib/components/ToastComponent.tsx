import React, {Component} from 'react';
import {
  Animated,
  Image,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
} from 'react-native';
import {Icons} from '../assets';
import {ShowToastConfig, ToastProps, ToastState} from '../types';
import {colors, safeTop} from '../constants';

class ToastComponent extends Component<ToastProps, ToastState> {
  private animation: Animated.Value;
  private panResponser: PanResponderInstance;
  private transitionY: Animated.Value;

  static defaultProps: ToastProps = {
    duration: 2500,
  };
  constructor(props: ToastProps | Readonly<ToastProps>) {
    super(props);
    this.state = {message: '', isError: false};
    this.animation = new Animated.Value(0);
    this.props.duration;
    this.transitionY = new Animated.Value(0);
    this.panResponser = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (gesture.dy < 0) {
          this.transitionY.setValue(gesture.dy);
        }
      },
      onPanResponderEnd: (event, gesture) => {
        Animated.spring(this.animation, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 15,
        }).start();
        this.transitionY.setValue(0);
      },
    });
  }

  showToast({message, isError}: ShowToastConfig) {
    // this.animation.resetAnimation();

    this.setState({message, isError});

    Animated.spring(this.animation, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 15,
    }).start(() => {
      Animated.spring(this.animation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 15,
        delay: this.props.duration,
      }).start(() => {
        this.transitionY.setValue(0);
      });
    });
  }

  renderIcon = () => {
    return (
      <Animated.View
        style={[
          styles.iconContainer,
          this.props.iconContainerStyle,
          {backgroundColor: this.state.isError ? colors.red : colors.green},
          {
            transform: [
              {
                scale: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}>
        <Image
          style={[styles.img, this.props.iconStyle]}
          source={{uri: this.state.isError ? Icons.Cross : Icons.Tick}}
          resizeMode="contain"
        />
      </Animated.View>
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
              {translateY: this.transitionY},
              {
                translateY: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-safeTop, safeTop],
                }),
              },
              {
                scale: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}>
        {this.renderIcon()}
        <Text style={[styles.text, this.props.textStyle]}>
          {this.state.message}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    marginHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: colors.black_gray,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    flexShrink: 1,
    overflow: 'hidden',
  },
  text: {color: colors.white, flex: 1, textAlign: 'left'},
  iconContainer: {
    height: 25,
    width: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginRight: 15,
  },
  img: {height: 15, width: 15},
});

export default ToastComponent;
