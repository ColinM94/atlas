import { Link } from "wouter";
import styles from "./styles.module.scss";

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.code}>404</div>
      <div className={styles.message}>Page not found!</div>
      <Link to="/" className={styles.homeButton}>
        Go Back
      </Link>
    </div>
  );
};
