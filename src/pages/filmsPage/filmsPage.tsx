import * as React from 'react';

import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { subscribeToCollection } from 'services/database/subscribeToCollection';
import { useAppStore, useAppStoreSlice } from 'stores/useAppStore/useAppStore';
import { Film } from 'types/entertainment';
import { List } from 'components/list/list';
import { defaultfilm } from 'constants/defaults';

import styles from './styles.module.scss';

export const FilmsPage = () => {
  const [films, setFilms] = React.useState<Film[]>([]);

  const { filmsLayout } = useAppStoreSlice('filmsLayout');

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Film>({
      collection: 'films',
      onData: (data) => {
        setFilms(data.sort((a, b) => a.name.localeCompare(b.name)));
      },
    });

    return () => {
      unsubcribe?.();
    };
  }, []);

  const handleLayoutClick = () => {
    useAppStore.setState({
      filmsLayout: filmsLayout === 'compact' ? 'full' : 'compact',
    });
  };

  return (
    <MainLayout layout={filmsLayout} onLayoutClick={handleLayoutClick} className={styles.container}>
      <List
        items={(item) => ({
          id: item.id,
          name: item.name,
          data: item,
        })}
        collection="films"
        defaultData={defaultfilm}
        mainPropertyKey="name"
        inputs={[
          {
            inputType: 'text',
            propertyKey: 'name',
          },
        ]}
        layout={filmsLayout}
        aspectRatio={0.65}
      />
    </MainLayout>
  );
};
