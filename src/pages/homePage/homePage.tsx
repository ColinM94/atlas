import { useLocation } from "wouter";

import { Section } from "types/section";
import { sections } from "constants/sections";
import { Icon } from "components/icon/icon";

import styles from "./styles.module.scss";
import { MainLayout } from "layouts/mainLayout/mainLayout";

export const HomePage = () => {
  const [, navigate] = useLocation();

  const renderSection = (section: Section) => {
    return (
      <div
        onClick={() => {
          navigate(section.id);
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
    <MainLayout className={styles.container}>
      {Object.values(sections).map((section) => renderSection(section))}
    </MainLayout>
  );
};
