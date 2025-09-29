import * as React from "react";

import { months } from "constants/general";
import { daysInMonth } from "utils/daysInMonth";
import { classes } from "utils/classes";
import { Habit, HabitData } from "types/habit";
import { Button } from "components/button/button";
import { subscribeToCollection } from "services/database/subscribeToCollection";

import styles from "./styles.module.scss";
import { updateRecord } from "services/database/updateRecord";
import { createRecord } from "services/database/createRecord";

interface Props {
  year: number;
  month: number;
  habits: Habit[];
}

export const HabitsMonth = (props: Props) => {
  const { habits, year, month } = props;

  const [habitsData, setHabitsData] = React.useState<HabitData[]>([]);

  React.useEffect(() => {
    void subscribeToCollection<HabitData[]>({
      collection: "habitsData",
      onData: setHabitsData,
      filter: 'date >= "2025-01-01" && date <= "2025-01-31"',
    });
  }, []);

  const formatDate = (year: number, month: number, day: number) =>
    `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;

  const toggleHabit = async (habitId: string, date: string) => {
    const habit = habitsData.find(
      (item) => item.habitId === habitId && item.date === date
    );

    if (!habit) {
      await createRecord<HabitData>({
        collection: "habitsData",
        data: {
          date,
          habitId,
          isAchieved: true,
        },
      });
    } else {
      await updateRecord<HabitData>({
        id: habitId,
        collection: "habits",
        data: {
          isAchieved: !habit.isAchieved,
        },
      });
    }
  };

  const numberOfDays = daysInMonth(year, month);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerMonth}>{months[month - 1]}</div>
      </div>

      <div className={styles.daysOfMonth}>
        {Array.from({ length: 31 }, (_, i) => {
          return (
            <div
              key={i}
              className={classes(
                styles.dayOfMonth,
                i > numberOfDays && styles.dayOfMonthDisabled
              )}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      {/* <div className={styles.header}>
        {month === 12 && <div className={styles.headerYear}>{year}</div>}
        <div className={styles.headerMonth}>{months[month - 1]}</div>
      </div> */}

      {habits
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((habit) => {
          // const habit = habits[habitId];

          return (
            <div key={habit.name} className={styles.habit}>
              <div className={styles.habitName}>{habit.name}</div>

              {Array.from({ length: 31 }, (_, i) => {
                const date = formatDate(year, month, i + 1);

                // let icon: MaterialSymbol | undefined = undefined;
                // let className = styles.habitDayUnset;

                // if (habit.dates?.[date] === true) {
                //   // icon = "check";
                //   className = styles.habitDayDone;
                // }

                // if (habit.dates?.[date] === false) {
                //   // icon = "close";
                //   className = styles.habitDayNotDone;
                // }

                const data = habitsData.find(
                  (item) => item.date === date && item.habitId === habit.id
                );

                return (
                  <Button
                    key={i}
                    type="secondary"
                    // icon={icon}
                    layer={1}
                    title={date}
                    onClick={() => void toggleHabit(habit.id, date)}
                    iconClassName={styles.habitIcon}
                    className={classes(
                      styles.habitDay,
                      i > numberOfDays && styles.habitDayDisabled,
                      data?.isAchieved
                        ? styles.habitDayDone
                        : styles.habitDayNotDone
                      // className
                    )}
                  />
                );
              })}
            </div>
          );
        })}
    </div>
  );
};
