export type Enum<T> = {
  name: keyof T;
  value: T[keyof T];
};
