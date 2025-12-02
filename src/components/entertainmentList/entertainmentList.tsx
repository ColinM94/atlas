import { classes } from "utils/classes";

import { EntertainmentListItem } from "./components/entertainmentLIstItem/entertainmentListItem";
import styles from "./styles.module.scss";
import { Props } from "./types";

export const EntertainmentList = (props: Props) => {
  const { items, layout = "full", aspectRatio, onEditClick } = props;

  return (
    <div
      className={classes(
        styles.container,
        layout === "full" && styles.containerFull,
        layout === "compact" && styles.containerCompact
      )}
    >
      {items.map((item) => (
        <EntertainmentListItem
          item={item}
          onEditClick={onEditClick}
          size={layout}
          key={item.id}
          style={{ aspectRatio }}
          className={classes(styles.item)}
        />
      ))}
    </div>
  );
};
