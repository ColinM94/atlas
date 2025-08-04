import { create } from "zustand";

import { Note } from "types/notes";
import { SetStoreState, Store } from "types/zustand";

interface AppStoreState {
  user: {
    id: string;
  };
  notes: Note[];
}

interface Actions {
  updateAppStore: SetStoreState<AppStoreState>;
}

export const useAppStore: Store<AppStoreState & Actions> = create((set) => ({
  user: {
    id: "",
    email: "",
  },
  notes: [],
  updateAppStore: (update) => set({ ...update }),
}));
