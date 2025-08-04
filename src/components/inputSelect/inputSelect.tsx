import { classes } from "utils/classes";

import styles from "./styles.module.css";

interface Props {
  label?: string;
  value: string;
  surface?: 0 | 1 | 2;
  setValue: (value: string) => void;
  placeholder?: HTMLInputElement["placeholder"];
  type?: "text" | "email" | "password";
  className?: string;
}

export const InputText = (props: Props) => {
  const { value, setValue, label, surface = 0, className, ...rest } = props;

  return (
    <label className={classes(styles.container, className)}>
      {label}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classes(styles.input, `surface${surface}`)}
        {...rest}
      />
    </label>
  );
};
