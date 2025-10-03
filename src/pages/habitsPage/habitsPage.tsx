/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { Habit } from "types/habit";
import { UnsubscribeFunc } from "pocketbase";

import { HabitsMonth } from "./habitsMonth/habitsMonth";
import styles from "./styles.module.scss";

export const HabitsPage = () => {
  const [habits, setHabits] = React.useState<Habit[]>([]);

  React.useEffect(() => {
    let unsubscribe: UnsubscribeFunc | undefined;

    (async () => {
      unsubscribe = await subscribeToCollection<Habit>({
        collection: "habits",
        onData: setHabits,
      });
    })();

    return () => {
      unsubscribe?.();
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getUTCMonth() + 1;

  const years = () => {
    const tempYears = [];

    for (let i = 2025; i <= currentYear; i++) {
      tempYears.push(i);
    }

    return tempYears;
  };

  const months = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className={styles.container}>
      {years().map((year) => (
        <>
          {months.map((month) => {
            if (year === currentYear && month > currentMonth) return;

            return (
              <HabitsMonth
                habits={habits}
                year={year}
                month={month}
                key={`${year}.${month}`}
              />
            );
          })}
        </>
      ))}
    </div>
  );
};
