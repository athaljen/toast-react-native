declare module "toast-react-native" {
  import { ReactNode } from "react";

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
