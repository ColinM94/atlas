import * as React from "react";

import { subscribeToCollection } from "services/database/subscribeToCollection";
import { Task } from "types/task";
import { MainLayout } from "layouts/mainLayout/mainLayout";
import { classes } from "utils/classes";
import { ProgressBar } from "components/progressBar/progressBar";

import { TaskItem } from "./components/taskItem/taskItem";
import styles from "./styles.module.scss";
import { TaskEditor } from "./components/taskEditor/taskEditor";

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
      className={styles.container}
    >
      <ProgressBar
        progress={tasks.filter((task) => task.done).length}
        maxProgress={tasks.length}
      />

      <div
        className={classes(
          styles.tasks
          // showGrid ? styles.tasksGrid : styles.tasksList
        )}
      >
        {tasks
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => Number(a.done) - Number(b.done))
          .map((task) => (
            <TaskItem task={task} key={task.id} className={styles.task} />
          ))}
      </div>

      <TaskEditor show={showCreator} setShow={setShowCreator} />
    </MainLayout>
  );
};
