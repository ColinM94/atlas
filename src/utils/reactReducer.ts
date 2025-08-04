import * as React from "react";

/**
 * A wrapper for React's userReducer function to make it easier to use.
 *
 * @param initialState - The initial state value.
 * @returns A tuple with the current state and a dispatch function to update the state.
 */
export const reactReducer = <T extends {}>(initialState: T) => {
  return React.useReducer((state: T, update: Partial<T>) => {
    return { ...state, ...update };
  }, initialState);
};
