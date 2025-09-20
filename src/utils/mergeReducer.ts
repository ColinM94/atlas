export const mergeReducer = <T>(state: T, update: Partial<T>): T => {
  return { ...state, ...update };
};
