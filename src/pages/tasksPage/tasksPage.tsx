import * as React from "react";

import { Table } from "components/table/table";
import { subscribeToCollection } from "services/database/subscribeToCollection";
import { deleteRecord } from "services/database/deleteRecord";
import { formatDate } from "utils/formatDate";
import { Task } from "types/task";
import { MainLayout } from "layouts/mainLayout/mainLayout";
import { Button } from "components/button/button";

import { TasksCreator } from "./components/tasksCreator/tasksCreator";

export const TasksPage = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [showCreator, setShowCreator] = React.useState(false);

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Task>({
      collection: "tasks",
      onData: setTasks,
    });

    return () => {
      unsubcribe?.();
    };
  }, []);

  const handleDeleteRecord = async (taskId: string) => {
    const response = await deleteRecord({
      collection: "tasks",
      id: taskId,
    });

    if (!response.success) {
      alert("Failed to delete record");
    }
  };

  return (
    <MainLayout>
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
            onClick: () => void handleDeleteRecord(task.id),
          },
        ]}
        keyExtractor={(item) => item.id}
      />

      <Button
        label="Add Task"
        onClick={() => setShowCreator(true)}
        type="secondary"
        layer={1}
      />

      <TasksCreator show={showCreator} setShow={setShowCreator} />
    </MainLayout>
  );
};
