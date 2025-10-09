import * as React from "react";

import { Table } from "components/table/table";
import { subscribeToCollection } from "services/database/subscribeToCollection";
import { deleteRecord } from "services/database/deleteRecord";
import { formatDate } from "utils/formatDate";
import { Task } from "types/task";

import { TasksCreator } from "./components/tasksCreator/tasksCreator";

export const TasksPage = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Task>({
      collection: "tasks",
      onData: setTasks,
    });

    return () => {
      unsubcribe?.();
    };
  }, []);

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
            value: formatDate(task.dueDate || 0),
            heading: "Due Date",
          },
          {
            id: "delete",
            type: "button",
            value: "Delete",
            icon: "delete",
            onClick: () =>
              void deleteRecord({
                collection: "tasks",
                id: task.id,
              }),
          },
        ]}
        keyExtractor={(item) => item.id}
      />

      <TasksCreator />
    </>
  );
};
