import * as React from 'react';

import { subscribeToCollection } from 'services/database/subscribeToCollection';
import { Task } from 'types/task';
import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { ProgressBar } from 'components/progressBar/progressBar';
import { List } from 'components/list2/list';
import { defaultTask } from 'constants/defaults';

import { TaskEditor } from './components/taskEditor/taskEditor';
import styles from './styles.module.scss';

export const TasksPage = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [showCreator, setShowCreator] = React.useState(false);

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Task>({
      collection: 'tasks',
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
          icon: 'add',
          onClick: () => setShowCreator(true),
          type: 'secondary',
          layer: 1,
        },
      ]}
      className={styles.container}
    >
      <ProgressBar progress={tasks.filter((task) => task.done).length} maxProgress={tasks.length} />

      <List
        data={tasks}
        items={(item) => ({
          id: item.id,
          name: item.name,
          data: item,
        })}
        defaultData={defaultTask}
        collection="tasks"
        inputs={[
          {
            inputType: 'text',
            propertyKey: 'name',
          },
          {
            inputType: 'date',
            propertyKey: 'dueDate',
          },
        ]}
      />

      <TaskEditor show={showCreator} setShow={setShowCreator} />
    </MainLayout>
  );
};
