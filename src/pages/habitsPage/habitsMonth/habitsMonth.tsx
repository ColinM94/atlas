/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";

import { daysInMonth } from "utils/daysInMonth";
import { classes } from "utils/classes";
import { numberOfDaysInMonth } from "utils/numberOfDaysInMonth";
import { Habit, HabitData } from "types/habit";
import { Button } from "components/button/button";
import { updateRecord } from "services/database/updateRecord";
import { createRecord } from "services/database/createRecord";
import { pb } from "inits/backend";

import { HabitsMonthHeader } from "./components/habitsMonthHeader/habitsMonthHeader";
import styles from "./styles.module.scss";

interface Props {
  year: number;
  month: number;
  habits: Habit[];
  // isCurrentYear: boolean;
}

export const HabitsMonth = (props: Props) => {
  const { habits, year, month } = props;

  const [habitsData, setHabitsData] = React.useState<HabitData[]>([]);
  // const [show, setShow] = React.useState(isCurrentYear);
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

  const numDaysInMonth = daysInMonth(year, month);

  return (
    <div className={styles.container}>
      <HabitsMonthHeader
        year={year}
        month={month}
        numDaysInMonth={numDaysInMonth}
        // show={show}
        // setShow={setShow}
      />

      {habits
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((habit) => (
          <div key={habit.name} className={styles.habit}>
            <div className={styles.habitName}>{habit.name}</div>

            {Array.from({ length: numDays }, (_, i) => {
              const date = formatDate(year, month, i + 1);

              const habitDataItem = habitsData.find(
                (item) => item.habitId === habit.id && item.date === date
              );

              return (
                <Button
                  key={i}
                  type="secondary"
                  layer={1}
                  title={date}
                  onClick={() =>
                    void toggleHabit(date, habit.id, habitDataItem)
                  }
                  iconClassName={styles.habitIcon}
                  className={classes(
                    styles.habitDay,
                    i >= numDaysInMonth && styles.habitDayDisabled,
                    habitDataItem?.isAchieved === undefined
                      ? styles.habitDayUnselected
                      : habitDataItem?.isAchieved
                      ? styles.habitDaySuccess
                      : styles.habitDayFailed
                  )}
                />
              );
            })}
          </div>
        ))}
    </div>
  );
};
