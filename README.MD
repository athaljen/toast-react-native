# Toast React Native

## Description

This package provides a simple toast component for React Native applications.

## Installation

Install `toast-react-native` using npm:

```bash
npm install toast-react-native
```

or using yarn:

```bash
yarn add toast-react-native
```

## Usage

```jsx
import React from "react";
import { View, Button } from "react-native";
import ToastProvider, { Toast } from "toast-react-native";

const App = () => {
  const showToast = () => {
    Toast({
      message: "Hello, this is a toast message!",
      duration: 2000 // 2 seconds
    });
  };

  return (
    <ToastProvider>
        <Button title="Show Toast" onPress={showToast} />
    </ToastProvider>
  );
};

export default App;
```

## Props

### `ToastProvider`

- `style`: Style object for the wrapper view around the children.

### `Toast`

- `message` (required): The message to display in the toast.
- `duration` (optional): The duration for which the toast will be visible, in milliseconds. Default is 2000 milliseconds (2 seconds).

## License

This project is licensed under the ISC License.