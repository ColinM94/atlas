import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { Habit, HabitDataYears } from "types/habit";
import { daysInMonth } from "utils/daysInMonth";
import { getDateInfo } from "utils/getDateInfo";

import { HabitsYear } from "./habitsYear/habitsYear";
import styles from "./styles.module.scss";
import { listRecords } from "services/database/listRecords";

export const HabitsPage = () => {
  const [habits, setHabits] = React.useState<Habit[]>([]);

  React.useEffect(() => {
    void subscribeToCollection<Habit>({
      collection: "habits",
      onData: setHabits,
    });

    void (async () => {
      const response = await listRecords<Habit>({
        collection: "habits",
      });

      if (response.success) {
        const sortedHabits = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setHabits(sortedHabits);
      }
    })();
  }, []);

  // const dataByYear = () => {
  //   const data: HabitDataYears = {};

  //   for (let year = 2020; year <= 2025; year++) {
  //     if (!data[year]) {
  //       data[year] = {};
  //     }

  //     for (let month = 1; month <= 12; month++) {
  //       data[year][month] = {
  //         numDaysInMonth: daysInMonth(year, month),
  //         month,
  //         year,
  //         habits: {},
  //       };

  //       habits.forEach((habit) => {
  //         data[year][month].habits[habit.id] = {
  //           id: habit.id,
  //           name: habit.name,
  //           dates: {},
  //         };
  //       });
  //     }
  //   }

  //   habits.forEach((habit) => {
  //     Object.keys(habit.dates).forEach((date) => {
  //       const { year, month } = getDateInfo({ date });

  //       if (!year || !month) return;

  //       data[year][month].habits[habit.id].dates[date] = habit.dates[date];
  //     });
  //   });

  //   return data;
  // };

  const years = [2025, 2024, 2023];

  return (
    <div className={styles.container}>
      {/* {Object.keys(data).map((year) => {
        const yearData = data[Number(year)];

        return Object.keys(yearData).map((month) => (
          <HabitsMonth
            data={yearData[Number(month)]}
            key={`${year}_${month}`}
          />
        ));
      })} */}

      {years.map((year) => (
        <HabitsYear habits={habits} year={year} />
      ))}
    </div>
  );
};
