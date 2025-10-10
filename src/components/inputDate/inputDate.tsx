import * as React from "react";

import { FormField } from "components/formField/formField";
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
    placeholder,
    disabled,
    min,
    layer,
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

  const handleClick = () => {
    ref.current?.showPicker();
  };

  return (
    <FormField
      className={classes(className, styles.container)}
      disabled={disabled}
      layer={layer}
      {...rest}
      onClick={handleClick}
    >
      <input
        type={inputType()}
        value={date()}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        ref={ref}
      />

      {/* <Button
        type="secondary"
        onClick={handleClick}
        icon="calendar_month"
        layer={layer}
        className={styles.calendarButton}
      /> */}
    </FormField>
  );
};
