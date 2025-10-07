export const nameOfDay = (year: number, month: number, day: number) => {
  return new Intl.DateTimeFormat("en-UK", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
};
