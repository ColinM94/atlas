/**
 * Formats a date into a string in the format "DD.MM.YY", based on the given mode (local or UTC).
 *
 * @param date - The date to be formatted. Can be a `Date` object, a timestamp (number), or a string.
 * @param mode - The mode for formatting the date. Can be either 'local' (default) or 'utc'. Determines whether the local or UTC time is used.
 * @returns A string representing the formatted date in "DD.MM.YY" format.
 */
export const formatDate = (
  date: Date | number | string,
  mode: "local" | "utc" = "local"
) => {
  if (typeof date === "string") {
    date = new Date(date.replaceAll(".", "-"));
  }

  const value = typeof date === "number" ? new Date(date) : date;

  let day;
  let month;
  let year;

  if (mode === "utc") {
    day = value.getUTCDate();
    month = value.getUTCMonth() + 1;
    year = value.getUTCFullYear() % 100;
  } else {
    day = value.getDate();
    month = value.getMonth() + 1;
    year = value.getFullYear() % 100;
  }

  const dayString = day.toString().padStart(2, "0");
  const monthString = month.toString().padStart(2, "0");
  const yearString = year.toString().padStart(2, "0");

  return dayString + "-" + monthString + "-" + yearString;
};
