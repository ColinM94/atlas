import { CSSProperties } from "react";

import { Button } from "components/button/button";
import { EntertainmentItem } from "components/entertainmentList/types";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";

interface Props<T> {
  size: "compact" | "full";
  item: EntertainmentItem;
  style?: CSSProperties;
  onEditClick: (item: EntertainmentItem) => void;
  className?: string;
}

export const EntertainmentListItem = <T,>(props: Props<T>) => {
  const { item, size, onEditClick, style, className } = props;

  if (size === "compact") {
    return (
      <div
        title={item.name}
        style={style}
        className={classes(styles.containerCompact, className)}
      >
        <div className={styles.imageContainer}>
          <img src={item.imageUrl} className={styles.image} />
        </div>

        {Boolean(item.rating) && (
          <div className={styles.infoRating}>{item.rating} / 5</div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className={classes(styles.containerFull, className)}>
        {item.backgroundImageUrl && (
          <div
            style={{ backgroundImage: `url(${item.backgroundImageUrl})` }}
            className={styles.backgroundImage}
          />
        )}

        <div className={styles.containerContent}>
          <div className={styles.imageContainer}>
            <img src={item.imageUrl} className={styles.image} />
          </div>

          <div className={styles.content}>
            <div className={styles.info}>
              <div className={styles.infoTitle}>{item.name}</div>
              <div className={styles.infoSub}>{item.subtitle}</div>

              {Boolean(item.rating) && (
                <div className={styles.infoRating}>{item.rating} / 5</div>
              )}
            </div>

            <Button
              icon="edit"
              onClick={() => onEditClick(item)}
              type="transparent"
              className={styles.editButton}
            />
          </div>
        </div>
      </div>
    </>
  );
};
