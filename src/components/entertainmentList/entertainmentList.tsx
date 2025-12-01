import { classes } from "utils/classes";
import { useAppStoreSlice } from "stores/useAppStore/useAppStore";

import { EntertainmentListItem } from "./components/entertainmentLIstItem/entertainmentListItem";
import styles from "./styles.module.scss";
import { Props } from "./types";

export const EntertainmentList = (props: Props) => {
  const { items, onEditClick } = props;

  const { filmsLayout } = useAppStoreSlice("filmsLayout");

  return (
    <div
      className={classes(
        styles.container,
        filmsLayout === "full" && styles.containerFull,
        filmsLayout === "compact" && styles.containerCompact
      )}
    >
      {items.map((item) => (
        <EntertainmentListItem
          item={item}
          onEditClick={onEditClick}
          size={filmsLayout}
          key={item.id}
          className={classes(styles.item)}
        />
      ))}
    </div>
  );
};
