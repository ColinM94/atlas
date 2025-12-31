import { List } from 'components/list/list';
import { defaultTask } from 'constants/defaults';

export const TasksPage = () => {
  return (
    <>
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
    </>
  );
};
