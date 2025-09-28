import { months } from "constants/general";
import { daysInMonth } from "utils/daysInMonth";
import { Habit } from "types/habit";

import styles from "./styles.module.scss";
import { formatDate } from "utils/formatDate";
import { Button } from "components/button/button";
import { classes } from "utils/classes";

interface Props {
  year: number;
  month: number;
  habits: Habit[];
  // data: HabitDataMonth;
  // onHabitDayClick: (habitId: string, date: string) => void;
}

export const HabitsMonth = (props: Props) => {
  const { habits, year, month } = props;
  // const { data } = props;

  // const { habits, month, numDaysInMonth, year } = data;

  // const formatDate = (year: number, month: number, day: number) =>
  //   `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;

  // const toggleHabit = async (habitId: string, date: string) => {
  //   const habit = Object.values(habits).find((habit) => habit.id === habitId);
  //   if (!habit) return;

  //   const updatedDates = { ...habit.dates, [date]: !habit.dates?.[date] };
  //   const updatedHabit: Habit = { ...habit, dates: updatedDates };

  //   await updateRecord<Habit>({
  //     id: habitId,
  //     collection: "habits",
  //     data: updatedHabit,
  //   });
  // };

  // const sortedHabits =

  const numberOfDays = daysInMonth(year, month);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerMonth}>{months[month]}</div>
      </div>

      <div className={styles.daysOfMonth}>
        {Array.from({ length: numberOfDays }, (_, i) => (
          <div key={i} className={styles.dayOfMonth}>
            {i + 1}
          </div>
        ))}
      </div>
      {/* <div className={styles.header}>
        {month === 12 && <div className={styles.headerYear}>{year}</div>}
        <div className={styles.headerMonth}>{months[month - 1]}</div>
      </div> */}

      {habits.map((habit) => {
        // const habit = habits[habitId];

        return (
          <div key={habit.name} className={styles.habit}>
            <div className={styles.habitName}>{habit.name}</div>

            {Array.from({ length: numberOfDays }, (_, i) => {
              const date = formatDate(year, month, i + 1);

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
                  // onClick={() => void toggleHabit(habit.id, date)}
                  iconClassName={styles.habitIcon}
                  className={classes(styles.habitDay, className)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
