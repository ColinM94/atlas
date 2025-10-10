import * as React from "react";

import { Button } from "components/button/button";
import { Children } from "types/general";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  children: Children;
  className?: string;
}

export const Modal = (props: Props) => {
  const { show, setShow, children, className } = props;

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
      className={classes(styles.container, !show && styles.hidden, className)}
    >
      <Button type="secondary" label="Close" onClick={() => setShow(false)} />
      {children}
    </dialog>
  );
};
