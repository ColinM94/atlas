import * as React from "react";

import { InputText } from "components/inputText/inputText";
import { InputDate } from "components/inputDate/inputDate";
import { Button } from "components/button/button";
import { Modal } from "components/modal/modal";
import { mergeReducer } from "utils/mergeReducer";
import { DatabaseRecord } from "types/general";
import { Task } from "types/task";
import { createRecord } from "services/database/createRecord";
import { deleteRecord } from "services/database/deleteRecord";
import { updateRecord } from "services/database/updateRecord";
import { defaultTask } from "constants/defaults";

import styles from "./styles.module.scss";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  task?: Task;
}

export const TaskEditor = (props: Props) => {
  const { show, setShow, task } = props;

  const [newTask, updateNewTask] = React.useReducer(
    mergeReducer<Omit<Task, keyof DatabaseRecord>>,
    defaultTask()
  );

  React.useEffect(() => {
    updateNewTask(task || defaultTask());
  }, [show]);

  const handleDelete = async () => {
    if (!task) return;

    const response = await deleteRecord({
      collection: "tasks",
      id: task.id,
    });

    if (!response.success) {
      alert("Failed to delete record");
    }
  };

  const handleUpdate = async () => {
    if (task) {
      await updateRecord({
        id: task?.id,
        collection: "tasks",
        data: newTask,
      });
    } else {
      await createRecord({
        collection: "tasks",
        data: newTask,
      });
    }

    updateNewTask({
      name: "",
      dueDate: 0,
    });

    setShow(false);
  };

  return (
    <Modal
      label={task?.name || "New Task"}
      show={show}
      setShow={setShow}
      contentClassName={styles.content}
      className={styles.container}
    >
      <InputText
        label="Name"
        value={newTask.name}
        setValue={(name) => updateNewTask({ name })}
        className={styles.nameInput}
      />

      <div className={styles.dateRow}>
        <InputDate
          label="Due Date"
          type="date"
          value={newTask.dueDate}
          setValue={(dueDate) => updateNewTask({ dueDate })}
          layer={2}
          disabled={newTask.dueDate === 0}
          className={styles.dueDateInput}
        />

        <Button
          type="secondary"
          layer={1}
          icon={newTask.dueDate === 0 ? "add" : "close"}
          iconColor={newTask.dueDate === 0 ? "secondary" : "danger"}
          onClick={() =>
            updateNewTask({ dueDate: newTask.dueDate === 0 ? Date.now() : 0 })
          }
          className={styles.dueDateButton}
        />
      </div>

      <div className={styles.buttons}>
        {task && (
          <Button
            label="Delete"
            onClick={() => void handleDelete()}
            type="secondary"
            layer={1}
            className={styles.deleteButton}
          />
        )}

        <Button
          label={task ? "Update" : "Add"}
          onClick={handleUpdate}
          type="primary"
          className={styles.createButton}
        />
      </div>
    </Modal>
  );
};
