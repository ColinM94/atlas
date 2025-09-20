import { classes } from "utils/classes";
import styles from "./styles.module.scss";
import { Props } from "./types";
import { FormFieldLabel } from "./components/formFieldLabel/formFieldLabel";

export const FormField = (props: Props) => {
  const {
    labelContainerClassName,
    label,
    labelDescription,
    tooltipTitle,
    tooltipMessage,
    children,
    inputContainerClassName,
    title,
    horizontal,
    required,
    onClick,
    id,
    labelPosition = "before",
    enableCardContainer,
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
        enableCardContainer && styles.cardContainer,

        onClick && "clickable"
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
          showTooltip={Boolean(tooltipTitle || tooltipMessage)}
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
