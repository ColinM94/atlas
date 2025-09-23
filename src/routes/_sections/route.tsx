import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

import { Button } from "components/button/button";
import { sections } from "constants/sections";
import { getCurrentRouteName } from "utils/getCurrentRouteName";

import styles from "./styles.module.scss";

const SectionsLayout = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const name = getCurrentRouteName(pathname);
  const section = sections[name || ""];

  return (
    <>
      <div className={styles.header}>
        <Button
          icon="arrow_back"
          type="secondary"
          onClick={() => void navigate({ to: "/" })}
          className={styles.backButton}
        />

        <div className={styles.heading}>
          {/* <Icon icon={section?.icon} className={styles.headingIcon} /> */}
          <div className={styles.headingLabel}>{section?.name}</div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export const Route = createFileRoute("/_sections")({
  component: SectionsLayout,
});
