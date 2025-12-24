import * as React from 'react';

import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { List } from 'components/list/list';
import { defaultTask } from 'constants/defaults';

import { TaskEditor } from './components/taskEditor/taskEditor';
import styles from './styles.module.scss';

export const TasksPage = () => {
  const [showCreator, setShowCreator] = React.useState(false);

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
      {/* <ProgressBar progress={tasks.filter((task) => task.done).length} maxProgress={tasks.length} /> */}

      <List
        items={(item) => ({
          id: item.id,
          name: item.name,
          data: item,
        })}
        defaultData={defaultTask}
        collection="tasks"
        mainPropertyKey="name"
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
