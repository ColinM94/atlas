/**
 * Checks if the value is a non-null object.
 *
 * @param object - The value to check.
 * @returns `true` if the value is an object and not null, `false` otherwise.
 */
export const isObject = (object: unknown) => {
  return object != null && typeof object === "object";
};
