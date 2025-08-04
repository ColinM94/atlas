import { Button } from 'components/button/button';
import { pickFromAppStore, useAppStore } from 'stores/useAppStore/useAppStore';

import { Props } from './types';
import styles from './styles.module.scss';

export const Header = (props: Props) => {
  const {} = props;

  const { showNavbar } = pickFromAppStore('showNavbar');

  return (
    <div className={styles.container}>
      <Button
        icon="menu"
        type="secondary"
        onClick={() => {
          useAppStore.setState({
            showNavbar: !showNavbar,
          });
        }}
        // layer={1}
        className={styles.menuButton}
      />

      {showNavbar ? 'Show Nav' : 'Hide Nav'}

      <Button
        icon="settings"
        type="secondary"
        onClick={() => alert('Show Settings')}
        // layer={1}
        className={styles.settingsButton}
      />
    </div>
  );
};
