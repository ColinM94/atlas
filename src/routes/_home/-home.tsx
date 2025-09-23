import { useNavigate } from "@tanstack/react-router";

import { Section } from "types/section";
import { sections } from "constants/sections";
import { Icon } from "components/icon/icon";

import styles from "./styles.module.scss";

export const Home = () => {
  const navigate = useNavigate();

  const renderSection = (section: Section) => {
    return (
      <div
        onClick={() => {
          void navigate({
            to: `/${section.id}`,
          });
        }}
        key={section.id}
        className={styles.section}
      >
        <Icon icon={section.icon} className={styles.sectionIcon} />
        <div className={styles.sectionName}>{section.name}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {Object.values(sections).map((section) => renderSection(section))}
    </div>
  );
};
