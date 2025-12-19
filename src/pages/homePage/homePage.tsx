import { Button } from 'components/button/button';

import linkedinIcon from 'assets/images/linkedin.png';
import githubIcon from 'assets/images/github.png';
import reactIcon from 'assets/images/react.svg';
import jsIcon from 'assets/images/js.svg';
import tsIcon from 'assets/images/ts.svg';
import sassIcon from 'assets/images/sass.svg';

import styles from './styles.module.scss';
import { classes } from 'utils/classes';

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
        <div className={styles.labelContainer}>
          <div className={styles.label}>Colin Maher</div>
          <div className={styles.subLabel}>Software Developer</div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Tech</div>
          <div className={styles.icons}>
            <a target="_blank" href="https://react.dev">
              <img src={reactIcon} className={styles.icon} />
            </a>

            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
              <img src={jsIcon} className={styles.icon} />
            </a>

            <a target="_blank" href="https://www.typescriptlang.org/docs/">
              <img src={tsIcon} className={styles.icon} />
            </a>

            <a target="_blank" href="https://www.typescriptlang.org/docs/">
              <img src={sassIcon} className={classes(styles.icon, styles.sassIcon)} />
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Links</div>
          <div className={styles.icons}>
            <a target="_blank" href="https://www.linkedin.com/in/colinm94">
              <img src={linkedinIcon} className={styles.icon} />
            </a>

            <a target="_blank" href="https://github.com/ColinM94">
              <img src={githubIcon} className={classes(styles.icon, styles.githubIcon)} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
