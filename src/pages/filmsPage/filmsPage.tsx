import * as React from 'react';

import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { subscribeToCollection } from 'services/database/subscribeToCollection';
import { useAppStore, useAppStoreSlice } from 'stores/useAppStore/useAppStore';
import { Film } from 'types/entertainment';
import { ListItemData } from 'components/list/types';
import { List } from 'components/list/list';

import { FilmEditor } from './components/filmEditor/filmEditor';
import styles from './styles.module.scss';

export const FilmsPage = () => {
  const [films, setFilms] = React.useState<Film[]>([]);
  const [showBookEditor, setShowBookEditor] = React.useState(false);
  const [selectedFilm, setSelectedFilm] = React.useState<Film | undefined>(undefined);

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

  const handleAdd = () => {
    setShowBookEditor(true);
  };

  const handleEditClick = (item: ListItemData) => {
    setSelectedFilm(films.find((film) => film.id === item.id));
    setShowBookEditor(true);
  };

  const handleLayoutClick = () => {
    useAppStore.setState({
      filmsLayout: filmsLayout === 'compact' ? 'full' : 'compact',
    });
  };

  const items: ListItemData[] = films.map((film) => ({
    id: film.id,
    name: film.name,
    subtitle: film.director,
    imageUrl: film.coverImageUrl,
    backgroundImageUrl: film.backgroundImageUrl,
    rating: film.rating,
  }));

  return (
    <MainLayout
      layout={filmsLayout}
      onLayoutClick={handleLayoutClick}
      onAddClick={handleAdd}
      className={styles.container}
    >
      <List items={items} onEditClick={handleEditClick} layout={filmsLayout} aspectRatio={0.65} />

      <FilmEditor
        show={showBookEditor}
        setShow={setShowBookEditor}
        film={selectedFilm}
        onClose={() => {
          setSelectedFilm(undefined);
        }}
      />
    </MainLayout>
  );
};
