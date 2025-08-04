import { classes } from "utils/classes";
import { Icon } from "components/icon/icon";

import styles from "./styles.module.css";

interface Props {
  label?: string;
  value: boolean;
  surface?: 0 | 1 | 2;
  setValue: (value: boolean) => void;
  placeholder?: HTMLInputElement["placeholder"];
  type?: "text" | "email" | "password";
  className?: string;
}

export const InputCheckbox = (props: Props) => {
  const { value, setValue, label, surface = 0, className, ...rest } = props;

  return (
    <label
      onClick={() => setValue(!value)}
      className={classes(styles.container, className)}
    >
      {label}

      <Icon
        icon={value ? "check_box" : "check_box_outline_blank"}
        className={styles.icon}
      />
    </label>
  );
};
