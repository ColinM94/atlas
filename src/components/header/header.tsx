import { Button } from "components/button/button";
import { useAppStoreSlice } from "stores/useAppStore/useAppStore";

import styles from "./styles.module.scss";

export const Header = () => {
  const { darkMode, showNavbar } = useAppStoreSlice("darkMode", "showNavbar");

  return (
    <div className={styles.container}>
      {/* <Button
        icon="menu"
        type="secondary"
        onClick={() => {
          useAppStore.setState({
            showNavbar: !showNavbar,
          });
        }}
        // layer={1}
        className={styles.menuButton}
      /> */}

      {showNavbar ? "Show Nav" : "Hide Nav"}
      {darkMode ? "Dark Mode Yes" : "Dark Mode No"}

      <Button
        icon="settings"
        type="secondary"
        onClick={() => alert("Show Settings")}
        // layer={1}
        className={styles.settingsButton}
      />
    </div>
  );
};
