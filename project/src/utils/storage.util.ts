export const setItem = (key: string, value: any, useLocal: boolean): any =>
  useLocal
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);

export const getString = (key: string): any => {
  let s = localStorage.getItem(key);
  if (!s) {
    s = sessionStorage.getItem(key);
  }

  return s;
};

export const getObject = <T>(key: string): T | undefined => {
  let s = localStorage.getItem(key);
  if (!s) {
    s = sessionStorage.getItem(key);
  }

  if (!s) return undefined;
  const obj = JSON.parse(s);
  return obj as T;
};

export const deleteItem = (key: string): void => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};
