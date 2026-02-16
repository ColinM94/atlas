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

import { HomeLink } from './components/homeLink/homeLInk';
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
        <div className={styles.labelContainer}>
          <div className={styles.label}>Colin Maher</div>
          <div className={styles.subLabel}>Software Developer</div>
        </div>

        <div className={styles.sections}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>The tech I use all the time</div>

            <div className={styles.icons}>
              <HomeLink
                href="https://react.dev"
                title="ReactJS"
                image={reactIcon}
                className={styles.reactLink}
              />

              <HomeLink
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                title="Javascript"
                image={jsIcon}
                className={styles.jsLink}
              />

              <HomeLink
                href="https://www.typescriptlang.org/docs/"
                title="Typescript"
                image={tsIcon}
                className={styles.tsLink}
              />

              <HomeLink
                href="https://www.typescriptlang.org/docs/"
                title="SASS"
                image={sassIcon}
                className={styles.sassLink}
              />

              <HomeLink
                href="https://firebase.google.com"
                title="Firebase"
                image={firebaseIcon}
                className={styles.firebaseLink}
              />

              <HomeLink
                href="https://nodejs.org/en"
                title="Node JS"
                image={nodeIcon}
                className={styles.nodeLink}
              />

              <HomeLink
                href="https://expressjs.com"
                title="Express JS"
                image={expressIcon}
                className={styles.expressLink}
              />
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Links to my socials</div>

            <div className={styles.icons}>
              <HomeLink
                href="https://www.linkedin.com/in/colinm94"
                title="Linkedin"
                image={linkedinIcon}
                className={styles.linkedinLink}
              />

              <HomeLink
                href="https://github.com/ColinM94"
                title="GitHub"
                image={githubIcon}
                className={styles.githubLink}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
