import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { Task } from "types/task";
import { MainLayout } from "layouts/mainLayout/mainLayout";

import { TasksCreator } from "./components/tasksCreator/tasksCreator";
import { TaskItem } from "./components/taskItem/taskItem";
import styles from "./styles.module.scss";

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

  return (
    <MainLayout
      buttons={[
        {
          icon: "add",
          onClick: () => setShowCreator(true),
          type: "secondary",
          layer: 1,
        },
      ]}
    >
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>

      <TasksCreator show={showCreator} setShow={setShowCreator} />
    </MainLayout>
  );
};
