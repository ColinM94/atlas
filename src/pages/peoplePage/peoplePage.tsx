import * as React from 'react';

import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { useAppStore, useAppStoreSlice } from 'stores/useAppStore/useAppStore';
import { List } from 'components/list/list';
import { ListItemData } from 'components/list/types';
import { Person } from 'types/person';
import { subscribeToCollection } from 'services/database/subscribeToCollection';
import { PersonEditor } from './components/filmEditor/personEditor';

import styles from './styles.module.scss';

export const PeoplePage = () => {
  const { peopleLayout } = useAppStoreSlice('peopleLayout');

  const [people, setPeople] = React.useState<Person[]>([]);
  const [showEditor, setShowEditor] = React.useState(false);
  const [selectedPerson, setSelectedPerson] = React.useState<Person | undefined>(undefined);

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Person>({
      collection: 'people',
      onData: (data) => {
        setPeople(data.sort((a, b) => a.name.localeCompare(b.name)));
      },
    });

    return () => {
      unsubcribe?.();
    };
  }, []);

  const handleAdd = () => {
    setShowEditor(true);
  };

  const handleEditClick = (item: ListItemData) => {
    setSelectedPerson(people.find((person) => person.id === item.id));
    setShowEditor(true);
  };

  const handleLayoutClick = () => {
    useAppStore.setState({
      peopleLayout: peopleLayout === 'compact' ? 'full' : 'compact',
    });
  };

  const items: ListItemData[] = people.map((person) => ({
    id: person.id,
    name: person.name,
  }));

  return (
    <MainLayout
      onLayoutClick={handleLayoutClick}
      onAddClick={handleAdd}
      layout={peopleLayout}
      className={styles.container}
    >
      <List items={items} layout={peopleLayout} onEditClick={handleEditClick} />

      <PersonEditor
        show={showEditor}
        setShow={setShowEditor}
        person={selectedPerson}
        onClose={() => setSelectedPerson(undefined)}
      />
    </MainLayout>
  );
};
