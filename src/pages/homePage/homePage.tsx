import { Button } from 'components/button/button';

import linkedinIcon from 'assets/images/linkedin.png';
import githubIcon from 'assets/images/github.png';
import reactIcon from 'assets/images/react.svg';
import jsIcon from 'assets/images/js.svg';
import tsIcon from 'assets/images/ts.svg';
import sassIcon from 'assets/images/sass.svg';
import firebaseIcon from 'assets/images/firebase.svg';
import nodeIcon from 'assets/images/node.png';
import expressIcon from 'assets/images/express-js.png';

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

        <div className={styles.sections}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>The tech I use all the time</div>
            <div className={styles.icons}>
              <a target="_blank" href="https://react.dev" title="ReactJS">
                <img src={reactIcon} className={styles.icon} />
              </a>

              <a
                target="_blank"
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                title="Javascript"
              >
                <img src={jsIcon} className={styles.icon} />
              </a>

              <a target="_blank" href="https://www.typescriptlang.org/docs/" title="Typescript">
                <img src={tsIcon} className={styles.icon} />
              </a>

              <a target="_blank" href="https://www.typescriptlang.org/docs/" title="SASS">
                <img src={sassIcon} className={classes(styles.icon, styles.sassIcon)} />
              </a>

              <a target="_blank" href="https://firebase.google.com" title="Firebase">
                <img src={firebaseIcon} className={classes(styles.icon, styles.sassIcon)} />
              </a>

              <a target="_blank" href="https://nodejs.org/en" title="Node JS">
                <img src={nodeIcon} className={classes(styles.icon, styles.nodeIcon)} />
              </a>

              <a target="_blank" href="https://expressjs.com" title="Express JS">
                <img src={expressIcon} className={classes(styles.icon, styles.nodeIcon)} />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Links to my socials</div>
            <div className={styles.icons}>
              <a target="_blank" href="https://www.linkedin.com/in/colinm94" title="Linkedin">
                <img src={linkedinIcon} className={styles.icon} />
              </a>

              <a target="_blank" href="https://github.com/ColinM94" title="GitHub">
                <img src={githubIcon} className={classes(styles.icon, styles.githubIcon)} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
