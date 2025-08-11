import { Button } from "components/button/button";

import styles from "./styles.module.scss";
import { useAppStore } from "stores/useAppStore/useAppStore";

export const Header = () => {
  return (
    <div className={styles.container}>
      <Button
        icon="menu"
        type="secondary"
        onClick={() => {
          useAppStore.setState((state) => ({
            showNavbar: !state.showNavbar,
          }));
        }}
        layer={1}
        className={styles.menuButton}
      />

      <Button
        icon="settings"
        type="secondary"
        onClick={() => alert("Show Settings")}
        layer={1}
        className={styles.settingsButton}
      />
    </div>
  );
};
