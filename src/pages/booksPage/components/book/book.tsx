import styles from "./styles.module.scss";

export const Book = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <div className={styles.info}>
        <div className={styles.infoName}>The Count of Monte Cristo</div>
        <div className={styles.infoGenre}>Adventure</div>
      </div>
    </div>
  );
};
