import { classes } from "utils/classes";
import { Button } from "components/button/button";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const FormFieldLabel = (props: Props) => {
  const { className, label, subtitle, onClick, showTooltip } = props;

  return (
    <div className={classes(className, styles.container)}>
      <div
        className={classes(
          styles.titleContainer,
          showTooltip && styles.clickable
        )}
        onClick={onClick}
      >
        <div className={styles.title}>{label}</div>

        {showTooltip && (
          <Button
            type="icon"
            icon="question_mark"
            className={styles.tooltipBtn}
            iconClassName={styles.tooltipIcon}
          />
        )}
      </div>

      <div
        className={classes(
          styles.subtitleContainer,
          showTooltip && styles.clickable
        )}
        onClick={onClick}
      >
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};
