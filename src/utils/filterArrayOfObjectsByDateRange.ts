export const filterArrayOfObjectsByDateRange = <T extends { date: string }>(
  items: T[],
  start: string,
  end: string
): T[] => {
  const parse = (str: string) => {
    const [y, m, d] = str.split(".").map(Number);
    return new Date(y, m - 1, d);
  };

  const startDate = parse(start);
  const endDate = parse(end);

  return items.filter((item) => {
    const current = parse(item.date);
    return current >= startDate && current <= endDate;
  });
};
