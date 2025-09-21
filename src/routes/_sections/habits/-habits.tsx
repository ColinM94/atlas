import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { Habit } from "types/habit";
import { getDateInfo } from "utils/getDateInfo";

import styles from "./styles.module.scss";
import { dateToYearMonthDay } from "utils/dateToYearMonthDay";
import { Icon } from "components/icon/icon";

export const Habits = () => {
  const [habits, setHabits] = React.useState<Habit[]>([]);

  React.useEffect(() => {
    subscribeToCollection({
      collection: "habits",
      setData: setHabits,
    });
  }, []);

  const dates = () => {
    const tempDates: string[] = [];

    for (let i = 0; i < 8; i++) {
      const date = getDateInfo({ daysAgo: i }).date;

      tempDates.push(date.slice(2));
    }

    return tempDates;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headings}>
          <div className={styles.label} />
          {dates().map((date) => (
            <div className={styles.heading}>{date}</div>
          ))}
        </div>

        {habits.map((habit) => (
          <div className={styles.row}>
            <div className={styles.label}>{habit.name}</div>
            {dates().map((date) => (
              <div className={styles.date}>{<Icon icon="check" />}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
