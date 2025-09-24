import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { updateRecord } from "services/database/updateRecord";
import { Habit } from "types/habit";
import { Button } from "components/button/button";
import { daysInMonth } from "utils/daysInMonth";
import { months } from "constants/general";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";

export const HabitsPage = () => {
  const [habits, setHabits] = React.useState<Habit[]>([]);

  React.useEffect(() => {
    void subscribeToCollection({
      collection: "habits",
      setData: setHabits,
    });
  }, []);

  const sortedHabits = habits.toSorted((a, b) => a.name.localeCompare(b.name));

  const formatDate = (year: number, month: number, day: number) =>
    `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;

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

  const renderMonth = (monthIndex: number) => {
    const year = 2025;
    const totalDays = daysInMonth(year, monthIndex);

    return (
      <div className={styles.month} key={monthIndex}>
        <div className={styles.header}>
          <div className={styles.headerMonth}>{months[monthIndex]}</div>
          <div />
        </div>

        <div className={styles.daysOfMonth}>
          {Array.from({ length: totalDays }, (_, i) => (
            <div key={i} className={styles.dayOfMonth}>
              {i + 1}
            </div>
          ))}
        </div>

        {sortedHabits.map((habit) => (
          <div key={habit.id} className={styles.habit}>
            <div className={styles.habitName}>{habit.name}</div>

            {Array.from({ length: totalDays }, (_, i) => {
              const date = formatDate(year, monthIndex + 1, i + 1);

              // let icon: MaterialSymbol | undefined = undefined;
              let className = styles.habitDayUnset;

              if (habit.dates?.[date] === true) {
                // icon = "check";
                className = styles.habitDayDone;
              }

              if (habit.dates?.[date] === false) {
                // icon = "close";
                className = styles.habitDayNotDone;
              }

              return (
                <Button
                  key={i}
                  type="secondary"
                  // icon={icon}
                  layer={1}
                  onClick={() => void toggleHabit(habit.id, date)}
                  iconClassName={styles.habitIcon}
                  className={classes(styles.habitDay, className)}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerYear}>2025</div>
      </div>
      {months.map((_, index) => renderMonth(index))}
    </>
  );
};
