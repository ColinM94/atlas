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

  const years = [2025, 2024];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={styles.container}>
      {years.map((year) =>
        months.map((month) => (
          <HabitsMonth
            habits={habits}
            year={year}
            month={month}
            key={`${year}.${month}`}
          />
        ))
      )}
    </div>
  );
};
