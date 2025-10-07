import { classes } from "utils/classes";
import { nameOfDay } from "utils/nameOfDay";
import { months } from "constants/general";

import styles from "./styles.module.scss";

interface Props {
  year: number;
  month: number;
  numDaysInMonth: number;
  //   show: boolean;
  //   setShow: (show: boolean) => void;
}

export const HabitsMonthHeader = (props: Props) => {
  const { year, month, numDaysInMonth } = props;

  return (
    <>
      <div
        //   onClick={() => setShow(!show)}
        className={styles.heading}
      >
        {/* <Button
          layer={1}
          icon={show ? "arrow_drop_up" : "arrow_drop_down"}
          type="secondary"
        /> */}

        <div className={styles.headingMonth}>
          {months[month - 1]} {year}
        </div>
      </div>

      <div className={styles.daysOfMonth}>
        {Array.from({ length: numDaysInMonth }, (_, i) => {
          const dayName = nameOfDay(year, month, i + 1);

          return (
            <div
              key={i}
              className={classes(
                styles.dayOfMonth,
                i > numDaysInMonth && styles.dayOfMonthDisabled
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
    </>
  );
};
