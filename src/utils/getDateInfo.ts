import { dateToYearMonthDay } from "./dateToYearMonthDay";

interface Props {
  daysAgo?: number;
  date?: string;
}

export interface DateData {
  date: string;
  endOfDay: number;
  startOfDay: number;
  todaysDate: string;
  daysAgo: number;
  isFullDay: boolean;
  isFinishedProcessing: boolean;
  processingTime: number;
  isAlreadyProcessed?: boolean;
  /** year.month. e.g. 2024.5 */
  month: string;
  dayOfMonth: number;
}

/** Pass in date or daysAgo and get back info about that day. */
export const getDateInfo = ({ daysAgo, date }: Props) => {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);

  let startDate: Date | undefined;

  if (daysAgo !== undefined) {
    startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    startDate.setTime(startDate.getTime() - 86400000 * daysAgo);
  } else if (date !== undefined) {
    const _date = date.replaceAll(".", "-");

    startDate = new Date(_date);
    startDate.setUTCHours(0, 0, 0, 0);
  }

  if (!startDate) throw Error("Date undefined");

  if (daysAgo === undefined) {
    daysAgo = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / 86400000
    );
  }

  const startOfDay = startDate.getTime();
  const endOfDay = startOfDay + 86399999;
  const dayOfMonth = startDate.getDate();

  const todaysDate = dateToYearMonthDay(currentDate, "utc");
  const daysAgoDate = dateToYearMonthDay(
    new Date(currentDate.getTime() - 86400000 * daysAgo),
    "utc"
  );

  const isFullDay = daysAgo > 0;

  const result: DateData = {
    startOfDay,
    endOfDay,
    date: daysAgoDate,
    todaysDate,
    daysAgo,
    isFullDay,
    isFinishedProcessing: false,
    processingTime: 0,
    month: `${startDate.getUTCFullYear()}.${startDate.getMonth()}`,
    dayOfMonth,
  };

  return result;
};
