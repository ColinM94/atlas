import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Button } from "components/button/button";

import styles from "./styles.module.scss";

const SectionsLayout = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.sectionHeader}>
      <Button
        icon="arrow_back"
        type="secondary"
        onClick={() => void navigate({ to: "/" })}
      />
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/_sections")({
  component: SectionsLayout,
});

// import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
// import { Button } from "components/button/button";

// import styles from "./styles.module.scss";

// export const Route = createFileRoute("/_sections")({
//   component: Sections,sec
// });
