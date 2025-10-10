import { Task } from "types/task";
import { formatDate } from "utils/formatDate";
import { Button } from "components/button/button";
import { deleteRecord } from "services/database/deleteRecord";

import styles from "./styles.module.scss";

interface Props {
  task: Task;
}

export const TaskItem = (props: Props) => {
  const { task } = props;

  const handleDeleteRecord = async () => {
    console.log("deelte");
    const response = await deleteRecord({
      collection: "tasks",
      id: task.id,
    });

    if (!response.success) {
      alert("Failed to delete record");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.name}>{task.name}</div>

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
