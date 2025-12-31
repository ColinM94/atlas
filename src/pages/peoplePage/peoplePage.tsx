import { useAppStoreSlice } from 'stores/useAppStore/useAppStore';
import { List } from 'components/list/list';

import { defaultPerson } from 'constants/defaults';

export const PeoplePage = () => {
  const { peopleLayout } = useAppStoreSlice('peopleLayout');

  return (
    <List
      collection="people"
      layout={peopleLayout}
      defaultData={defaultPerson}
      inputs={[
        {
          inputType: 'text',
          propertyKey: 'name',
        },
      ]}
      items={(dataItem) => ({
        id: dataItem.id,
        name: dataItem.name,
        data: dataItem,
      })}
      mainPropertyKey="name"
    />
  );
};
