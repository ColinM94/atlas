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
  onClose?: () => void;
  className?: string;
  contentClassName?: string;
}

export const Modal = (props: Props) => {
  const {
    show,
    setShow,
    children,
    label,
    onClose,
    contentClassName,
    className,
  } = props;

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
    <>
      <div
        onClick={() => setShow(false)}
        className={classes(styles.background, show && styles.backgroundShow)}
      />

      <dialog
        ref={dialogRef}
        onClose={() => {
          onClose?.();
          setShow(false);
        }}
        className={classes(styles.container, !show && styles.hidden, className)}
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

        <div className={classes(styles.content, contentClassName)}>
          {children}
        </div>
      </dialog>
    </>
  );
};
