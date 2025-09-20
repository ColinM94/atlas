import { Outlet, useNavigate } from "@tanstack/react-router";

import { Section } from "types/section";
import { Icon } from "components/icon/icon";
import { Children } from "types/general";
import { Button } from "components/button/button";

import styles from "./styles.module.scss";

interface Props {
  section: Section;
  children: Children;
}

export const SectionPage = (props: Props) => {
  const { section } = props;

  const navigate = useNavigate();

  if (!section) throw "Section Undefined";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          onClick={() => navigate({ to: "/home" })}
          type="secondary"
          icon="arrow_back"
          layer={0}
          className={styles.backButton}
        />

        <Icon icon={section.icon} className={styles.headerIcon} />
        <div className={styles.headerName}>{section.name}</div>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
