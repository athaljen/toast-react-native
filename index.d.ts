import { ReactNode } from "react";

declare module "toast-react-native" {
  type ToastProps = {
    children?: ReactNode;
  };

  class ToastComponent extends React.Component<ToastProps> {
    showToast(): void;
  }

  const ToastRef: React.RefObject<ToastComponent>;

  const ToastProvider: React.FC<ToastProps>;

  const Toast: () => void;

  export default ToastProvider;
  export { Toast };
}
