import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { useAppStore, useAppStoreSlice } from 'stores/useAppStore/useAppStore';
import { List } from 'components/list/list';

import styles from './styles.module.scss';
import { defaultPerson } from 'constants/defaults';

export const PeoplePage = () => {
  const { peopleLayout } = useAppStoreSlice('peopleLayout');

  const handleAdd = () => {
    setShowEditor(true);
  };

  const handleLayoutClick = () => {
    useAppStore.setState({
      peopleLayout: peopleLayout === 'compact' ? 'full' : 'compact',
    });
  };

  return (
    <MainLayout
      onLayoutClick={handleLayoutClick}
      onAddClick={handleAdd}
      layout={peopleLayout}
      className={styles.container}
    >
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
    </MainLayout>
  );
};
