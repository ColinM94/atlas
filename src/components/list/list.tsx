import { classes } from "utils/classes";

import { ListItem } from "./components/listItem/listItem";
import styles from "./styles.module.scss";
import { Props } from "./types";

export const List = (props: Props) => {
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
        <ListItem
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
