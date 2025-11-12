import { Task } from "types/task";
import { Button } from "components/button/button";
import { deleteRecord } from "services/database/deleteRecord";
import { updateRecord } from "services/database/updateRecord";
import { classes } from "utils/classes";
import { formatDate } from "utils/formatDate";

import styles from "./styles.module.scss";

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

  const handleDone = () => {
    void updateRecord<Task>({
      collection: "tasks",
      id: task.id,
      data: {
        done: !task.done,
      },
    });
  };

  return (
    <div
      onClick={() => handleDone()}
      className={classes(styles.container, className)}
    >
      <div className={styles.row}>
        <div className={styles.name}>{task.name}</div>

        <Button
          type="secondary"
          icon={task.done ? "check_box" : "check_box_outline_blank"}
          onClick={() => handleDone()}
          layer={1}
          iconClassName={styles.buttonIcon}
          className={styles.checkButton}
        />

        <Button
          type="secondary"
          icon="delete"
          onClick={() => void handleDeleteRecord()}
          layer={1}
          iconClassName={styles.buttonIcon}
          className={styles.deleteButton}
        />
      </div>

      {/* <div className={styles.row}>
        <div className={styles.description}>I am a description</div>
      </div> */}

      <div className={styles.row}>
        <div className={styles.dueDate}>
          {task.dueDate ? formatDate(task.dueDate, "utc", ".") : ""}
        </div>
      </div>

      {/* <div className={styles.priority} /> */}
    </div>
  );
};
