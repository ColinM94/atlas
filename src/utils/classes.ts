/**
 * Combines multiple class names into a single string.
 * Filters out falsy values like `false` or `undefined`.
 * @param items - List of class names to combine.
 * @returns {string} A string containing the combined class names, separated by spaces.
 */
export const classes = (...items: (string | false | undefined)[]): string => {
  return items.filter((item) => item).join(' ');
};
