import { Habit } from "types/habit";
import { HabitsMonth } from "../habitsMonth/habitsMonth";
import styles from "./styles.module.scss";
import React from "react";

interface Props {
  year: number;
  habits: Habit[];
}

function filterHabitDatesByMonth(
  habit: Habit,
  year: number,
  month: number
): Habit {
  const filteredDates: Record<string, boolean> = {};
  for (const dateStr in habit.dates) {
    const [dateYear, dateMonth] = dateStr.split(".").map(Number);
    if (dateYear === year && dateMonth === month) {
      filteredDates[dateStr] = habit.dates[dateStr];
    }
  }
  return {
    ...habit,
    dates: filteredDates,
  };
}

// Memoize HabitsMonth so it only re-renders if props change
const MemoHabitsMonth = React.memo(HabitsMonth);

export const HabitsYear = (props: Props) => {
  const { year, habits } = props;

  // Memoize computed habit data for all months (prevents unnecessary computation)
  const habitsDataAllMonths = React.useMemo(() => {
    return Array.from({ length: 12 }).map((_, index) =>
      habits.map((habit) => filterHabitDatesByMonth(habit, year, index + 1))
    );
  }, [habits, year]);

  return (
    <>
      <div className={styles.heading}>{year}</div>
      {Array.from({ length: 12 }).map((_, index) => (
        <MemoHabitsMonth
          habits={habitsDataAllMonths[index]}
          year={year}
          month={index + 1}
          key={`${year}-${index + 1}`}
        />
      ))}
    </>
  );
};
