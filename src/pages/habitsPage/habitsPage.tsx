import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { updateRecord } from "services/database/updateRecord";
import { Habit } from "types/habit";

import { HabitsMonth } from "./habitsMonth/habitsMonth";
import styles from "./styles.module.scss";

export const HabitsPage = () => {
  const [habits, setHabits] = React.useState<Habit[]>([]);

  const years = [2025, 2024, 2023, 2022, 2021];

  React.useEffect(() => {
    void subscribeToCollection({
      collection: "habits",
      setData: setHabits,
    });
  }, []);

  const sortedHabits = habits.toSorted((a, b) => a.name.localeCompare(b.name));

  const toggleHabit = async (habitId: string, date: string) => {
    const habit = habits.find((habit) => habit.id === habitId);
    if (!habit) return;

    const updatedDates = { ...habit.dates, [date]: !habit.dates?.[date] };
    const updatedHabit: Habit = { ...habit, dates: updatedDates };

    await updateRecord<Habit>({
      id: habitId,
      collection: "habits",
      data: updatedHabit,
    });

    setHabits((prev) => prev.map((h) => (h.id === habitId ? updatedHabit : h)));
  };

  return (
    <div className={styles.container}>
      {years.map((year) =>
        Array.from({ length: 12 }, (_, i) => (
          <HabitsMonth
            habits={sortedHabits}
            month={12 - i}
            year={year}
            onHabitDayClick={(habitId, date) => void toggleHabit(habitId, date)}
          />
        ))
      )}
    </div>
  );
};
