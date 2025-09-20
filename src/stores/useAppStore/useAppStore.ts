import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { sections } from "constants/sections";

type AppStoreState = {
  showNavbar: boolean;
  darkMode: boolean;
  selectedSection: keyof typeof sections;
};

export const useAppStore = createWithEqualityFn<AppStoreState>()(
  () => ({
    showNavbar: false,
    darkMode: false,
    selectedSection: "task",
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
