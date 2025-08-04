import { classes } from "utils/classes";
import { deleteDocument } from "services/database/deleteDocument";
import { Button } from "components/button/button";
import { Note } from "types/notes";

import styles from "./styles.module.css";

interface Props {
  note: Note;
  onDeleteClick: () => void;
  className?: string;
}

export const NoteCardHeader = (props: Props) => {
  const { note, onDeleteClick, className } = props;

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.heading}>{note.heading}</div>
      <Button
        icon="delete"
        onClick={onDeleteClick}
        className={styles.deleteButton}
      />
    </div>
  );
};
