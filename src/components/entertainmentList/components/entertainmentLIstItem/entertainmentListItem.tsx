import { Button } from "components/button/button";
import { EntertainmentItem } from "components/entertainmentList/types";

import styles from "./styles.module.scss";

interface Props<T> {
  item: EntertainmentItem;
  onEditClick: (item: EntertainmentItem) => void;
}

export const EntertainmentListItem = <T,>(props: Props<T>) => {
  const { item, onEditClick } = props;

  return (
    <>
      <div className={styles.container}>
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
