import * as React from "react";

import { MainLayout } from "layouts/mainLayout/mainLayout";
import { useAppStore, useAppStoreSlice } from "stores/useAppStore/useAppStore";
import { List } from "components/list/list";
import { ListItemData } from "components/list/types";
import { Person } from "types/person";

import styles from "./styles.module.scss";
import { subscribeToCollection } from "services/database/subscribeToCollection";
import { PersonEditor } from "./components/filmEditor/personEditor";

export const PeoplePage = () => {
  const { peopleLayout } = useAppStoreSlice("peopleLayout");

  const [people, setPeople] = React.useState<Person[]>([]);
  const [showEditor, setShowEditor] = React.useState(false);
  const [selectedPerson, setSelectedPerson] = React.useState<
    Person | undefined
  >(undefined);

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Person>({
      collection: "people",
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

  const items: ListItemData[] = people.map((person) => ({
    id: person.id,
    name: person.name,
  }));

  return (
    <MainLayout
      buttons={[
        {
          type: "secondary",
          icon: peopleLayout === "compact" ? "dashboard" : "list",
          onClick: () =>
            useAppStore.setState({
              peopleLayout: peopleLayout === "compact" ? "full" : "compact",
            }),
        },
        {
          type: "secondary",
          icon: "add",
          onClick: handleAdd,
        },
      ]}
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
