import * as React from "react";

import { Button } from "components/button/button";

import styles from "./styles.module.scss";
import { Children } from "types/general";
import { classes } from "utils/classes";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  children: Children;
  className?: string;
}

export const Modal = (props: Props) => {
  const { show, setShow, children, className } = props;

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (!dialogRef.current) return;

    console.log(dialogRef.current.open && show);

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
      className={classes(styles.container, !show && styles.hidden, className)}
    >
      <Button type="secondary" label="Close" onClick={() => setShow(false)} />
      {children}
    </dialog>
  );
};
