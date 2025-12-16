import { Button } from 'components/button/button';
import styles from './styles.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          type="secondary"
          label="Login"
          to="login"
          layer={2}
          className={styles.loginButton}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.label}>colinmaher.dev</div>
      </div>
    </div>
  );
};
