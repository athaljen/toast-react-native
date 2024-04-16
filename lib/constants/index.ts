import { Dimensions, StatusBar, StyleSheet } from "react-native";

export const safeTop = StatusBar.currentHeight || 0;

export const colors = {
  white: "#ffffff",
  black: "#000000",
  black_gray: "#1c1c1c",
  green: "#59b030",
  red: "#f42434",
  yellow: "#FFD400",
};

export enum ToastType {
  SUCCESS = "SUCCESS",
  INFO = "INFO",
  ERROR = "ERROR",
  WARNING = "WARNING",
}

export const Icons: Record<ToastType, any> = {
  [ToastType.SUCCESS]: require("../assets/success.png"),
  [ToastType.INFO]: require("../assets/info.png"),
  [ToastType.ERROR]: require("../assets/error.png"),
  [ToastType.WARNING]: require("../assets/warning.png"),
};

export const styles = StyleSheet.create({
  flex1: { flex: 1, zIndex: -1, backgroundColor: "transparent" },
});
