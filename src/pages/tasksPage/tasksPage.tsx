import * as React from 'react';

import { Modal } from 'components/modal/modal';
import { List } from 'components/list/list';
import { defaultTask } from 'constants/defaults';

export const TasksPage = () => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      {/* <ProgressBar progress={tasks.filter((task) => task.done).length} maxProgress={tasks.length} /> */}

      {/* <Button label="Click" onClick={() => setShow(true)} type="secondary" /> */}

      <Modal show={show} setShow={setShow}>
        {show}
      </Modal>

      <List
        items={(item) => ({
          id: item.id,
          name: item.name,
          date: item.dueDate,
          checked: item.checked,
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
    </>
  );
};
