import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { Habit } from "types/habit";

import { HabitsMonth } from "./habitsMonth/habitsMonth";
import styles from "./styles.module.scss";

export const HabitsPage = () => {
  const [habits, setHabits] = React.useState<Habit[]>([]);

  React.useEffect(() => {
    const unsubscribe = subscribeToCollection<Habit>({
      collection: "habits",
      onData: setHabits,
    });

    return () => {
      void unsubscribe?.();
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getUTCMonth() + 1;

  const years = Array.from(
    { length: currentYear - 2023 + 1 },
    (_, i) => 2025 + i
  );

  const months = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className={styles.container}>
      {years.map((year) => (
        <React.Fragment key={year}>
          {months.map((month) => {
            if (year === currentYear && month > currentMonth) return;

            return (
              <HabitsMonth
                habits={habits}
                year={year}
                month={month}
                isCurrentYear={year === currentYear}
                isCurrentMonth={month === currentMonth}
                key={`${year}.${month}`}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};
