import { EntertainmentListItem } from "./components/entertainmentLIstItem/entertainmentListItem";
import styles from "./styles.module.scss";
import { Props } from "./types";

export const EntertainmentList = (props: Props) => {
  const { items, onEditClick } = props;

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <EntertainmentListItem
          item={item}
          onEditClick={onEditClick}
          key={item.id}
        />
      ))}
    </div>
  );
};
