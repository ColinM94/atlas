import { useLocation } from "wouter";

import { Section } from "types/section";
import { Icon } from "components/icon/icon";

import styles from "./styles.module.scss";

interface Props {
  section: Section;
}

export const HomeSection = (props: Props) => {
  const { section } = props;

  const [, navigate] = useLocation();

  return (
    <div
      onClick={() => {
        navigate(section.id);
      }}
      key={section.id}
      className={styles.container}
    >
      <div className={styles.iconContainer}>
        <Icon icon={section.icon} className={styles.icon} />
      </div>
      <div className={styles.name}>{section.name}</div>
    </div>
  );
};
