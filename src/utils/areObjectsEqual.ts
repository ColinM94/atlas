import { isObject } from './isObject';

/**
 * Deeply compares two objects
 */
export const areObjectsEqual = (
  a: unknown,
  b: unknown,
  ignoreKeys?: readonly PropertyKey[]
): boolean => {
  if (a === b) {
    return true;
  }

  if (!isObject(a) || !isObject(b)) {
    return false;
  }

  const obj1 = a as Record<PropertyKey, unknown>;
  const obj2 = b as Record<PropertyKey, unknown>;

  const keys1 = Reflect.ownKeys(obj1);
  const keys2 = Reflect.ownKeys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (ignoreKeys?.includes(key)) continue;

    if (!areObjectsEqual(obj1[key], obj2[key], ignoreKeys)) {
      return false;
    }
  }

  return true;
};
