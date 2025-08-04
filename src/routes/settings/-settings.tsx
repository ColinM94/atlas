import { useAppStore } from "stores/useAppStore/useAppStore";
import { pb } from "inits/backend";
import { Button } from "components/button/button";

import styles from "./styles.module.css";

export const Settings = () => {
  const handleSignOut = () => {
    pb.authStore.clear();

    useAppStore.setState({
      user: {
        id: "",
      },
    });
  };

  return (
    <>
      <Button
        label="Sign Out"
        onClick={handleSignOut}
        type="secondary"
        className={styles.signOutButton}
      />
    </>
  );
};
