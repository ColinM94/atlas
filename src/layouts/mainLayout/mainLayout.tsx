import { useLocation } from "wouter";

import { Children, Layout } from "types/general";
import { Button } from "components/button/button";
import { ButtonProps } from "components/button/types";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";

interface Props {
  buttons?: ButtonProps[];
  layout: Layout;
  onLayoutClick?: () => void;
  onAddClick?: () => void;
  children: Children;
  className?: string;
}

export const MainLayout = (props: Props) => {
  const [location] = useLocation();

  const { children, buttons, layout, onLayoutClick, onAddClick, className } =
    props;

  const renderButtons = () => {
    const temp: ButtonProps[] = [];

    if (layout) {
      temp.push({
        type: "secondary",
        icon: layout === "compact" ? "dashboard" : "list",
        onClick: onLayoutClick,
      });
    }

    if (onAddClick) {
      temp.push({
        type: "secondary",
        icon: "add",
        onClick: onAddClick,
      });
    }

    temp.push(...(buttons || []));
    return temp;
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {location !== "/" && (
          <div className={styles.header}>
            <Button
              icon="arrow_back"
              type="secondary"
              onClick={() => history.back()}
              layer={0}
              className={styles.backButton}
            />

            <div className={styles.buttons}>
              {renderButtons().map((button) => {
                if (button.type === "secondary")
                  return <Button {...button} layer={0} />;

                return <Button {...button} />;
              })}
            </div>
          </div>
        )}

        <div className={classes(styles.content, className)}>{children}</div>
      </div>
    </div>
  );
};
