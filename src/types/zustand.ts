import { StoreApi, UseBoundStore } from "zustand";

export type SetStoreState<T> = {
  (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: false
  ): void;
  (state: T | ((state: T) => T), replace: true): void;
};

export type GetStoreState<T> = () => T;

export type Store<T> = UseBoundStore<StoreApi<T>>;
