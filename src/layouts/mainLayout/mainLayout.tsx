import { useLocation } from "wouter";

import { Children } from "types/general";
import { Button } from "components/button/button";

import styles from "./styles.module.scss";

interface Props {
  children: Children;
}

export const MainLayout = (props: Props) => {
  const [location, navigate] = useLocation();

  const { children } = props;

  return (
    <>
      <div className={styles.header}>
        {location !== "/" && (
          <Button
            icon="arrow_back"
            type="secondary"
            onClick={() => void navigate("/")}
            layer={0}
            className={styles.backButton}
          />
        )}
      </div>

      {children}
    </>
  );
};
