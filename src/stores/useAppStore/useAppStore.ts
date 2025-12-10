import { useStoreWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

type AppStoreState = {
  showNavbar: boolean;
  darkMode: boolean;
  filmsLayout: 'full' | 'compact';
  booksLayout: 'full' | 'compact';
  peopleLayout: 'full' | 'compact';
};

export const useAppStoreSlice = <K extends keyof AppStoreState>(...keys: [K, ...K[]]) =>
  useStoreWithEqualityFn(
    useAppStore,
    (s) =>
      keys.reduce((obj, key) => {
        obj[key] = s[key];
        return obj;
      }, {} as Pick<AppStoreState, K>),
    shallow
  );

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      showNavbar: false,
      darkMode: false,
      filmsLayout: 'compact',
      booksLayout: 'compact',
      peopleLayout: 'compact',
    }),
    {
      name: 'app',
    }
  )
);
