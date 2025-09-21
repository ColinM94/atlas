export const dateToYearMonthDay = (
  date: number | Date,
  mode: "utc" | "local" = "local"
) => {
  let _date: Date;

  if (typeof date === "number") {
    _date = new Date(date);
  } else {
    _date = date;
  }

  const year = mode === "utc" ? _date.getUTCFullYear() : _date.getFullYear();
  const month = mode === "utc" ? _date.getUTCMonth() : _date.getMonth();
  const day = mode === "utc" ? _date.getUTCDate() : _date.getDate();

  return `${year}.${("0" + (month + 1)).slice(-2)}.${("0" + day).slice(-2)}`;
};
