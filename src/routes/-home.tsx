import { useNavigate } from "@tanstack/react-router";
import { Icon } from "components/icon/icon";

import { useAppStore } from "stores/useAppStore/useAppStore";
import { Section } from "types/section";
import { sections } from "constants/sections";

import styles from "./styles.module.scss";

export const Home = () => {
  const navigate = useNavigate();

  const renderSection = (section: Section) => {
    return (
      <div
        onClick={() => {
          useAppStore.setState({
            selectedSection: section.id,
          });

          void navigate({
            to: `/${section.id}`,
          });
        }}
        className={styles.section}
      >
        <Icon icon={section.icon} className={styles.sectionIcon} />
        <div className={styles.sectionName}>{section.name}</div>
      </div>
    );
  };

  return (
    <div className={styles.home}>
      {Object.values(sections).map((section) => renderSection(section))}
    </div>
  );
};
