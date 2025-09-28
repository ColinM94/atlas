import { Habit } from "types/habit";
import { HabitsMonth } from "../habitsMonth/habitsMonth";
import styles from "./styles.module.scss";

interface Props {
  year: number;
  habits: Habit[];
}

export const HabitsYear = (props: Props) => {
  const { year, habits } = props;

  return (
    <>
      <div className={styles.heading}>{year}</div>

      {Array.from({ length: 12 }).map((_, index) => (
        <HabitsMonth habits={habits} year={year} month={index} />
      ))}
    </>
  );
};
