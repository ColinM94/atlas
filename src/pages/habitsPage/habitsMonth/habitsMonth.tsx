import { daysInMonth } from "utils/daysInMonth";
import { classes } from "utils/classes";
import { months } from "constants/general";
import { Button } from "components/button/button";
import { Habit } from "types/habit";

import styles from "./styles.module.scss";

interface Props {
  year: number;
  month: number;
  habits: Habit[];
  onHabitDayClick: (habitId: string, date: string) => void;
}

export const HabitsMonth = (props: Props) => {
  const { year, month, habits, onHabitDayClick } = props;

  const totalDays = daysInMonth(year, month);

  const formatDate = (year: number, month: number, day: number) =>
    `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;

  return (
    <div className={styles.container} key={month}>
      <div className={styles.header}>
        {month === 12 && <div className={styles.headerYear}>{year}</div>}
        <div className={styles.headerMonth}>{months[month - 1]}</div>
      </div>

      <div className={styles.daysOfMonth}>
        {Array.from({ length: totalDays }, (_, i) => (
          <div key={i} className={styles.dayOfMonth}>
            {i + 1}
          </div>
        ))}
      </div>

      {habits.map((habit) => (
        <div key={habit.id} className={styles.habit}>
          <div className={styles.habitName}>{habit.name}</div>

          {Array.from({ length: totalDays }, (_, i) => {
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
                onClick={() => void onHabitDayClick(habit.id, date)}
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
