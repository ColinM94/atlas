import * as React from "react";

import { Button } from "components/button/button";
import { Children } from "types/general";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  label?: string;
  children: Children;
  className?: string;
}

export const Modal = (props: Props) => {
  const { show, setShow, children, label, className } = props;

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useLayoutEffect(() => {
    if (!dialogRef.current) return;

    if (dialogRef.current.open && !show) {
      dialogRef.current.close();
    }

    if (!dialogRef.current.open && show) {
      dialogRef.current.showModal();
    }
  }, [show]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setShow(false)}
      className={classes(styles.container, !show && styles.hidden)}
    >
      <div className={styles.header}>
        <div className={styles.headerLabel}>{label}</div>

        <Button
          type="secondary"
          icon="close"
          onClick={() => setShow(false)}
          layer={1}
          className={styles.headerButton}
        />
      </div>

      <div className={classes(styles.content, className)}>{children}</div>
    </dialog>
  );
};
