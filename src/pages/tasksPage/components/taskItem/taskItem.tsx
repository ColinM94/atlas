import * as React from "react";

import { Button } from "components/button/button";
import { Task } from "types/task";
import { updateRecord } from "services/database/updateRecord";
import { classes } from "utils/classes";
import { formatDate } from "utils/formatDate";
import { TaskEditor } from "../taskEditor/taskEditor";

import styles from "./styles.module.scss";

interface Props {
  task: Task;
  className?: string;
}

export const TaskItem = (props: Props) => {
  const { task, className } = props;

  const [showContextMenu, setShowContextMenu] = React.useState(false);

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
    <>
      <div className={classes(styles.container, className)}>
        <div className={styles.row}>
          <div className={classes(styles.name, task.done && styles.nameDone)}>
            {task.name}
          </div>

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
            icon="edit"
            layer={1}
            onClick={() => setShowContextMenu(true)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.dueDate}>
            {task.dueDate ? formatDate(task.dueDate, "utc", ".") : ""}
          </div>
        </div>
      </div>

      <TaskEditor
        show={showContextMenu}
        setShow={setShowContextMenu}
        task={task}
      />

      {/* <ContextMenu
        show={showContextMenu}
        setShow={setShowContextMenu}
        buttons={[
          {
            type: "secondary",
            label: "Delete Task",
            icon: "delete",
            layer: 2,
            iconClassName: styles.buttonIcon,
            className: styles.checkButton,
            onClick: handleDelete,
          },
        ]}
      /> */}
    </>
  );
};
