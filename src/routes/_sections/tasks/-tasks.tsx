import * as React from "react";

import { Button } from "components/button/button";
import { Table } from "components/table/table";
import { InputText } from "components/inputText/inputText";
import { createRecord } from "services/database/createRecord";
import { subscribeToCollection } from "services/database/subscribeToCollection";
import { deleteRecord } from "services/database/deleteRecord";
import { formatDate } from "utils/formatDate";
import { mergeReducer } from "utils/mergeReducer";
import { Task } from "types/tasks";
import { DatabaseRecord } from "types/general";
import { InputDate } from "components/inputDate/inputDate";

import styles from "./styles.module.scss";

export const Tasks = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const [newTask, updateNewTask] = React.useReducer(
    mergeReducer<Omit<Task, keyof DatabaseRecord>>,
    {
      dueDate: Date.now(),
      name: "",
    }
  );

  React.useEffect(() => {
    subscribeToCollection({
      collection: "tasks",
      setData: setTasks,
    });
  }, []);

  const handleAdd = () => {
    createRecord({
      collection: "tasks",
      data: newTask,
    });
  };

  return (
    <>
      <Table
        data={tasks}
        items={(task) => [
          {
            id: "text",
            type: "text",
            value: task.name,
            heading: "Task",
          },
          {
            id: "dueDate",
            type: "text",
            value: formatDate(task.date || 0),
            heading: "Due Date",
          },
          {
            id: "delete",
            type: "button",
            value: "Delete",
            icon: "delete",
            onClick: () =>
              deleteRecord({
                collection: "tasks",
                id: task.id,
              }),
          },
        ]}
        keyExtractor={(item) => item.id}
      />

      <div className={styles.newTask}>
        <InputText
          label="Name"
          value={newTask.name}
          setValue={(name) => updateNewTask({ name })}
        />

        <InputDate
          label="Due Date"
          type="date"
          value={newTask.dueDate}
          setValue={(dueDate) => updateNewTask({ dueDate })}
          layer={2}
        />

        <Button label="Create" onClick={handleAdd} type="primary" />
      </div>
    </>
  );
};
