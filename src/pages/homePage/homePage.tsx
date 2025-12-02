import { sections } from "constants/sections";
import { MainLayout } from "layouts/mainLayout/mainLayout";

import { HomeSection } from "./components/homeSection/homeSection";
import styles from "./styles.module.scss";

export const HomePage = () => {
  return (
    <MainLayout className={styles.container}>
      <div className={styles.sections}>
        {Object.values(sections).map((section) => (
          <HomeSection section={section} />
        ))}
      </div>
    </MainLayout>
  );
};
