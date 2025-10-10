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
    }
  );

  const [showDueDate, setShowDueDate] = React.useState(false);

  const handleAdd = () => {
    void createRecord({
      collection: "tasks",
      data: newTask,
    });
  };

  return (
    <Modal show={show} setShow={setShow} className={styles.container}>
      <InputText
        label="Task"
        value={newTask.name}
        setValue={(name) => updateNewTask({ name })}
        className={styles.nameInput}
      />

      {showDueDate && (
        <InputDate
          label="Due Date"
          type="date"
          value={newTask.dueDate}
          setValue={(dueDate) => updateNewTask({ dueDate })}
          layer={2}
          className={styles.dueDateInput}
        />
      )}

      {!showDueDate && (
        <Button
          label="Add Due Date"
          onClick={() => setShowDueDate(true)}
          type="secondary"
        />
      )}

      <Button
        label="Create"
        onClick={handleAdd}
        type="secondary"
        layer={2}
        className={styles.createButton}
      />
    </Modal>
  );
};
