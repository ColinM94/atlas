import * as React from "react";

import { Icon } from "components/icon/icon";
import { classes } from "utils/classes";
import { Button } from "components/button/button";

import styles from "./styles.module.css";

interface Props {
  description?: string;
  onDeleteClick?: () => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  className: string;
}

export const ListItem = (props: Props) => {
  const {
    description,
    onMouseDown,
    onTouchStart,
    onDeleteClick,
    style,
    className,
  } = props;

  return (
    <>
      <div style={style} className={classes(styles.container, className)}>
        <div
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          className={styles.dragContainer}
        >
          <Icon icon="drag_indicator" className={styles.dragIcon} />
        </div>

        <div className={styles.description}>{description}</div>

        <div className={styles.buttons}>
          {onDeleteClick && (
            <Button
              icon="delete"
              onClick={onDeleteClick}
              className={styles.deleteButton}
            />
          )}
        </div>
      </div>
    </>
  );
};
