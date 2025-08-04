import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

interface AppStoreState {
  showNavbar: boolean;
  darkMode: boolean;
  user: any;
}

interface AppStoreActions {}

export const useAppStore = create<AppStoreState>(() => ({
  showNavbar: false,
  darkMode: false,
  user: undefined,
}));

export const pickFromAppStore = <
  K extends keyof (AppStoreState & AppStoreActions)
>(
  ...keys: [K, ...K[]]
) =>
  useAppStoreShallow((s) =>
    keys.reduce((obj, key) => {
      obj[key] = s[key];
      return obj;
    }, {} as Pick<AppStoreState & AppStoreActions, K>)
  );

const useAppStoreShallow = <T,>(
  selector: (state: AppStoreState & AppStoreActions) => T
) => {
  return useStoreWithEqualityFn(useAppStore, selector, shallow);
};
