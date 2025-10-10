import { classes } from "utils/classes";
import styles from "./styles.module.scss";
import { Props } from "./types";
import { FormFieldLabel } from "./components/formFieldLabel/formFieldLabel";

export const FormField = (props: Props) => {
  const {
    labelContainerClassName,
    label,
    labelDescription,
    children,
    inputContainerClassName,
    title,
    horizontal,
    required,
    onClick,
    id,
    labelPosition = "before",
    disabled,
    layer,
    className,
  } = props;

  return (
    <div
      title={title}
      className={classes(
        styles.container,
        className,
        horizontal && styles.horizontal,
        onClick && "clickable",
        disabled && styles.disabled
      )}
      id={id}
      onClick={onClick}
    >
      {labelPosition === "after" && (
        <div
          className={classes(styles.inputContainer, inputContainerClassName)}
        >
          {children}
        </div>
      )}

      {label && (
        <FormFieldLabel
          label={`${label}${required ? "*" : ""}`}
          subtitle={labelDescription}
          className={classes(labelContainerClassName, styles.labelContainer)}
        />
      )}

      {labelPosition === "before" && (
        <div
          className={classes(
            styles.inputContainer,
            inputContainerClassName,
            layer !== undefined && `layer${layer}`
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
