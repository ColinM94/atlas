import { isObject } from "./isObject";

/**
 * Compares two objects by value, including nested objects.
 *
 * @param object1 - The first object to compare.
 * @param object2 - The second object to compare.
 * @returns `true` if the objects are equal, otherwise `false`.
 */
export const areObjectsEqual = (
  object1: object,
  object2: object,
  ignoreKeys?: string[]
): boolean => {
  if (!object1 || !object2) return false;

  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (const key of objKeys1) {
    if (ignoreKeys?.includes(key)) continue;

    // @ts-expect-error Might not be an object
    const value1 = object1[key];
    // @ts-expect-error Might not be an object
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if (
      (isObjects && !areObjectsEqual(value1, value2, ignoreKeys)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};
