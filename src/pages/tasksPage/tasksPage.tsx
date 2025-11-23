import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { Task } from "types/task";
import { MainLayout } from "layouts/mainLayout/mainLayout";
import { classes } from "utils/classes";
import { ProgressBar } from "components/progressBar/progressBar";

import { TasksCreator } from "./components/tasksCreator/tasksCreator";
import { TaskItem } from "./components/taskItem/taskItem";
import styles from "./styles.module.scss";

export const TasksPage = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [showCreator, setShowCreator] = React.useState(false);
  const [showGrid, setShowGrid] = React.useState(false);

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
        // {
        //   icon: showGrid ? "grid_view" : "list",
        //   onClick: () => setShowGrid(!showGrid),
        //   type: "secondary",
        //   layer: 1,
        // },
        {
          icon: "add",
          onClick: () => setShowCreator(true),
          type: "secondary",
          layer: 1,
        },
      ]}
      className={styles.container}
    >
      <ProgressBar
        progress={tasks.filter((task) => task.done).length}
        maxProgress={tasks.length}
      />

      <div
        className={classes(
          styles.tasks,
          showGrid ? styles.tasksGrid : styles.tasksList
        )}
      >
        {tasks
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((task) => (
            <TaskItem task={task} key={task.id} className={styles.task} />
          ))}
      </div>

      <TasksCreator show={showCreator} setShow={setShowCreator} />
    </MainLayout>
  );
};
