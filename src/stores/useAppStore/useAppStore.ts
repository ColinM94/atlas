import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type AppStoreState = {
  showNavbar: boolean;
  darkMode: boolean;
};

export const useAppStore = createWithEqualityFn<AppStoreState>()(
  () => ({
    showNavbar: false,
    darkMode: false,
  }),
  shallow
);

export const useAppStoreSlice = <K extends keyof AppStoreState>(
  ...keys: K[]
): K[] extends [] ? AppStoreState : Pick<AppStoreState, K> =>
  useAppStore((state) => {
    if (keys.length === 0) return state;
    return Object.fromEntries(keys.map((k) => [k, state[k]])) as Pick<
      AppStoreState,
      K
    >;
  }, shallow);
