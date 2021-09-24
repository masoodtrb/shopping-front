import {
    toast,
    ToastContent,
    ToastOptions,
    ToastContainer,
  } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  export type ToastifyPositions =
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left'
    | undefined;
  
  const showToastify = (content: ToastContent, options?: ToastOptions) =>
    toast(content, { position: 'top-center', ...options });
  
  showToastify.success = (content: ToastContent, options?: ToastOptions) =>
    toast.success(content, { position: 'top-center', ...options });
  
  showToastify.info = (content: ToastContent, options?: ToastOptions) =>
    toast.info(content, { position: 'top-center', ...options });
  
  showToastify.error = (content: ToastContent, options?: ToastOptions) =>
    toast.error(content, { position: 'top-center', ...options });
  
  showToastify.warning = (content: ToastContent, options?: ToastOptions) =>
    toast.warning(content, { position: 'top-center', ...options });
  
  showToastify.dark = (content: ToastContent, options?: ToastOptions) =>
    toast.dark(content, { position: 'top-center', ...options });
  
  export { showToastify, ToastContainer };
  