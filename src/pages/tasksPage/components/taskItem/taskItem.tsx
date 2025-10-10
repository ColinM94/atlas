import { Task } from "types/task";
import { formatDate } from "utils/formatDate";
import { Button } from "components/button/button";
import { deleteRecord } from "services/database/deleteRecord";

import styles from "./styles.module.scss";
import { classes } from "utils/classes";

interface Props {
  task: Task;
  className?: string;
}

export const TaskItem = (props: Props) => {
  const { task, className } = props;

  const handleDeleteRecord = async () => {
    const response = await deleteRecord({
      collection: "tasks",
      id: task.id,
    });

    if (!response.success) {
      alert("Failed to delete record");
    }
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.header}>
        <div className={styles.text}>
          <div className={styles.name}>{task.name}</div>
          <div className={styles.description}>
            {task.description || "I am a description"}
          </div>
        </div>

        <Button
          type="secondary"
          icon="delete"
          onClick={() => void handleDeleteRecord()}
          layer={1}
          iconClassName={styles.deleteButtonIcon}
          className={styles.deleteButton}
        />
      </div>

      <div className={styles.dueDate}>
        {task.dueDate ? formatDate(task.dueDate) : ""}
      </div>
    </div>
  );
};
