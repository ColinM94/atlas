import * as React from "react";

import { FormField } from "components/formField/formField";
import { Icon } from "components/icon/icon";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { InputDateProps } from "./types";

export const InputDate = (props: InputDateProps) => {
  const {
    value,
    setValue,
    type = "date",
    time = "startOfDay",
    mode = "local",
    className,
    inputClassName,
    placeholder,
    disabled,
    min,
    ...rest
  } = props;

  const ref = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let date = e.target.valueAsDate;

    if (type === "date") {
      let offset = 0;

      if (mode === "local") {
        offset = new Date().getTimezoneOffset() * 60000;
      }

      let timestamp = date?.getTime() || 0;

      if (time === "endOfDay") timestamp += 86399999;

      date = new Date(timestamp - offset);
    }

    if (type === "datetime") date = new Date(e.target.value);

    setValue(date?.getTime() || 0);
  };

  const formatISOLocal = (d: Date, slice: number) => {
    const z = (n: number) => (n < 10 ? "0" : "") + n;

    let string: string;

    if (mode === "utc") {
      string =
        d.getUTCFullYear() +
        "-" +
        z(d.getUTCMonth() + 1) +
        "-" +
        z(d.getUTCDate()) +
        "T" +
        z(d.getUTCHours()) +
        ":" +
        z(d.getUTCMinutes());
    } else {
      string =
        d.getFullYear() +
        "-" +
        z(d.getMonth() + 1) +
        "-" +
        z(d.getDate()) +
        "T" +
        z(d.getHours()) +
        ":" +
        z(d.getMinutes());
    }

    return string.slice(0, slice);
  };

  const date = () => {
    let sliceAmount = 10;
    if (type === "date") sliceAmount = 10;
    if (type === "datetime") sliceAmount = 16;
    // if (type === 'time') sliceAmount = 20;

    const utcDate = new Date(value || 0);

    const result = formatISOLocal(utcDate, sliceAmount);

    return result;
  };

  const inputType = () => {
    if (type === "date") return "date";
    if (type === "datetime") return "datetime-local";
  };

  return (
    <FormField
      className={classes(className, styles.container)}
      {...rest}
      onClick={() => ref.current?.showPicker()}
    >
      <input
        type={inputType()}
        value={date()}
        onChange={handleChange}
        className={classes(styles.input, inputClassName)}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        ref={ref}
      />

      <Icon icon="calendar_month" className={styles.icon} />
    </FormField>
  );
};
