import { Link, useLocation } from "@tanstack/react-router";

import { classes } from "utils/classes";
import { Icon } from "components/icon/icon";

import styles from "./styles.module.css";

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <Link
        to="/notes"
        className={classes(
          styles.link,
          pathname.includes("/notes") && styles.linkActive
        )}
      >
        <Icon icon="notes" />
      </Link>

      <Link
        to="/calendar"
        className={classes(
          styles.link,
          pathname.includes("/calendar") && styles.linkActive
        )}
      >
        <Icon icon="calendar_month" />
      </Link>

      <Link
        to="/tasks"
        className={classes(
          styles.link,
          pathname.includes("/tasks") && styles.linkActive
        )}
      >
        <Icon icon="checklist" />
      </Link>

      <Link
        to="/settings"
        className={classes(
          styles.link,
          pathname.includes("/settings") && styles.linkActive
        )}
      >
        <Icon icon="settings" />
      </Link>
    </div>
  );
};
