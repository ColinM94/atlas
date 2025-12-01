import * as React from "react";

import { MainLayout } from "layouts/mainLayout/mainLayout";
import { subscribeToCollection } from "services/database/subscribeToCollection";
import { EntertainmentList } from "components/entertainmentList/entertainmentList";
import { EntertainmentItem } from "components/entertainmentList/types";
import { useAppStore, useAppStoreSlice } from "stores/useAppStore/useAppStore";
import { Film } from "types/films";

import { FilmEditor } from "./components/filmEditor/filmEditor";
import styles from "./styles.module.scss";

export const FilmsPage = () => {
  const [films, setFilms] = React.useState<Film[]>([]);
  const [showBookEditor, setShowBookEditor] = React.useState(false);
  const [selectedFilm, setSelectedFilm] = React.useState<Film | undefined>(
    undefined
  );

  const { filmsLayout } = useAppStoreSlice("filmsLayout");

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Film>({
      collection: "films",
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

  const handleEditClick = (item: EntertainmentItem) => {
    setSelectedFilm(films.find((film) => film.id === item.id));
    setShowBookEditor(true);
  };

  const items: EntertainmentItem[] = films.map((film) => ({
    id: film.id,
    name: film.name,
    subtitle: film.director,
    imageUrl: film.coverImageUrl,
    backgroundImageUrl: film.backgroundImageUrl,
    rating: film.rating,
  }));

  return (
    <MainLayout
      buttons={[
        {
          type: "secondary",
          icon: filmsLayout === "compact" ? "dashboard" : "list",
          onClick: () =>
            useAppStore.setState({
              filmsLayout: filmsLayout === "compact" ? "full" : "compact",
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
      <EntertainmentList items={items} onEditClick={handleEditClick} />

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
