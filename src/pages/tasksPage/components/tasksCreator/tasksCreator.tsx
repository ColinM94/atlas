import * as React from "react";

import { InputText } from "components/inputText/inputText";
import { InputDate } from "components/inputDate/inputDate";
import { Button } from "components/button/button";
import { Modal } from "components/modal/modal";
import { mergeReducer } from "utils/mergeReducer";
import { DatabaseRecord } from "types/general";
import { Task } from "types/task";
import { createRecord } from "services/database/createRecord";

import styles from "./styles.module.scss";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const TasksCreator = (props: Props) => {
  const { show, setShow } = props;

  const [newTask, updateNewTask] = React.useReducer(
    mergeReducer<Omit<Task, keyof DatabaseRecord>>,
    {
      dueDate: Date.now(),
      name: "",
      done: false,
    }
  );

  const handleAdd = async () => {
    await createRecord({
      collection: "tasks",
      data: newTask,
    });

    updateNewTask({
      name: "",
      dueDate: 0,
    });

    setShow(false);
  };

  return (
    <Modal
      label="New Task"
      show={show}
      setShow={setShow}
      contentClassName={styles.content}
      className={styles.container}
    >
      <InputText
        label="Task"
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

      <Button
        label="Add Task"
        onClick={() => void handleAdd()}
        type="primary"
        className={styles.createButton}
      />
    </Modal>
  );
};
