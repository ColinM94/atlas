/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";

import { months } from "constants/general";
import { daysInMonth } from "utils/daysInMonth";
import { classes } from "utils/classes";
import { numberOfDaysInMonth } from "utils/numberOfDaysInMonth";
import { Habit, HabitData } from "types/habit";
import { Button } from "components/button/button";
import { updateRecord } from "services/database/updateRecord";
import { createRecord } from "services/database/createRecord";
import { pb } from "inits/backend";
import { nameOfDay } from "utils/nameOfDay";

import styles from "./styles.module.scss";

interface Props {
  year: number;
  month: number;
  habits: Habit[];
}

export const HabitsMonth = (props: Props) => {
  const { habits, year, month } = props;

  const [habitsData, setHabitsData] = React.useState<HabitData[]>([]);

  const numDays = numberOfDaysInMonth(year, month);

  const loadData = async () => {
    const yearString = String(year);
    const monthString = String(month).padStart(2, "0");

    const value = await pb.collection("habitsData").getFullList<HabitData>({
      filter: `date ~ '${yearString}-${monthString}'`,
      requestKey: `habitData_${year}_${month}`,
    });

    setHabitsData(value);
  };

  React.useEffect(() => {
    loadData();
  }, [month, year]);

  const formatDate = (year: number, month: number, day: number) =>
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const toggleHabit = async (
    date: string,
    habitId: string,
    habitData: HabitData | undefined
  ) => {
    if (!habitData) {
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
        id: habitData.id,
        collection: "habitsData",
        data: {
          isAchieved: !habitData.isAchieved,
        },
      });
    }

    loadData();
  };

  const numberOfDays = daysInMonth(year, month);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerMonth}>
          {months[month - 1]} {year}
        </div>
      </div>

      <div className={styles.daysOfMonth}>
        {Array.from({ length: 31 }, (_, i) => {
          const dayName = nameOfDay(year, month, i + 1);

          return (
            <div
              key={i}
              className={classes(
                styles.dayOfMonth,
                i > numberOfDays && styles.dayOfMonthDisabled
              )}
            >
              <div title={dayName} className={styles.dayOfMonthLetter}>
                {dayName[0]}
              </div>
              <div className={styles.dayOfMonthNumber}>{i + 1}</div>
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

              {Array.from({ length: numDays }, (_, i) => {
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

                const habitDataItem = habitsData.find(
                  (item) => item.habitId === habit.id && item.date === date
                );

                return (
                  <Button
                    key={i}
                    type="secondary"
                    // icon={icon}
                    layer={1}
                    title={date}
                    onClick={() =>
                      void toggleHabit(date, habit.id, habitDataItem)
                    }
                    iconClassName={styles.habitIcon}
                    className={classes(
                      styles.habitDay,
                      i > numberOfDays && styles.habitDayDisabled,
                      habitDataItem?.isAchieved
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
