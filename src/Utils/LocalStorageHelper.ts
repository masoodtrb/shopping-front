const prefix = 'hamsa';
export type LocalStorageHelperProps =
  | 'getItem'
  | 'removeItem'
  | 'setItem'
  | 'length'
  | 'clear'
  | 'key';

const localStorageHelper: Record<LocalStorageHelperProps, any> = {
  getItem: (key: string) => window.localStorage.getItem(`${prefix}-${key}`),
  removeItem: (key: string) =>
    window.localStorage.removeItem(`${prefix}-${key}`),
  setItem: (key: string, value: string) =>
    window.localStorage.setItem(`${prefix}-${key}`, value),
  length: window.localStorage.length,
  clear: () => window.localStorage.clear(),
  key: (index: number) => window.localStorage.key(index),
};

export default localStorageHelper;