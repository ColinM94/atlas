import * as React from "react";

import { InputText } from "components/inputText/inputText";
import { Modal } from "components/modal/modal";
import { Button } from "components/button/button";
import { Divider } from "components/divider/divider";
import { createRecord } from "services/database/createRecord";
import { mergeReducer } from "utils/mergeReducer";
import { updateRecord } from "services/database/updateRecord";
import { deleteRecord } from "services/database/deleteRecord";

import styles from "./styles.module.scss";
import { Film } from "types/films";

interface Props {
  film?: Film | undefined;
  show: boolean;
  setShow: (show: boolean) => void;
  onClose: () => void;
}

const defaultfilm = (): Film => ({
  id: "",
  name: "",
  director: "",
  coverImageUrl: "",
  rating: 0,
});

export const FilmEditor = (props: Props) => {
  const { film, show, setShow, onClose } = props;

  const [search, setSearch] = React.useState("");

  const [state, updateState] = React.useReducer(
    mergeReducer<Film>,
    film || defaultfilm()
  );

  React.useEffect(() => {
    updateState(film || defaultfilm());
  }, [show]);

  const handleDelete = async () => {
    if (!film) return;

    const response = await deleteRecord({
      collection: "films",
      id: film.id,
    });

    if (!response.success) {
      alert("Failed to delete record");
    }

    setShow(false);
  };

  const handleUpdate = async () => {
    if (film) {
      await updateRecord({
        id: film?.id,
        collection: "films",
        data: state,
      });
    } else {
      await createRecord({
        collection: "films",
        data: state,
      });
    }

    setShow(false);
  };

  const searchMovie = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${
      import.meta.env.THE_MOVIE_DB_API_KEY
    }&query=${encodeURIComponent(search)}`;

    const result = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGVhNGFjMDBlMTkxNDU5M2EzZTIwM2MwODI0NDIzZSIsIm5iZiI6MTc2Mzk4MTIyMi45Njg5OTk5LCJzdWIiOiI2OTI0MzdhNjZjMmJhY2YxMWQwYmFjOTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lBUqeOkaaQHIo1TLTCcO_DPUaDz6qeNijRnBFM5PXFI`,
      },
    });

    if (!result.ok) {
      throw new Error("Failed to fetch from TMDB");
    }

    const data = await result.json();

    const filmData = data.results.find(
      (item) => item.original_language === "en"
    );

    updateState({
      name: filmData.title,
      coverImageUrl: `https://image.tmdb.org/t/p/original${filmData.poster_path}`,
      backgroundImageUrl: `https://image.tmdb.org/t/p/original${filmData.backdrop_path}`,
      rating: 0,
      director: "",
    });
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
      label={film?.name || "New Film"}
      onClose={() => {
        setSearch("");
        onClose();
      }}
      contentClassName={styles.content}
      className={styles.container}
    >
      {/* {!film && (
        <> */}
      <div className={styles.row}>
        <InputText
          value={search}
          setValue={setSearch}
          label="Search"
          layer={1}
          className={styles.inputText}
        />

        <Button
          type="secondary"
          icon="search"
          layer={2}
          onClick={searchMovie}
        />
      </div>

      <Divider layer={2} />
      {/* </>
      )} */}

      <InputText
        label="Name"
        value={state.name}
        setValue={(name) => updateState({ name })}
        layer={1}
        className={styles.inputText}
      />

      <InputText
        label="Director"
        value={state.director}
        setValue={(director) => updateState({ director })}
        layer={1}
        className={styles.inputText}
      />

      <InputText
        label="Cover URL"
        value={state.coverImageUrl}
        setValue={(coverImageUrl) => updateState({ coverImageUrl })}
        layer={1}
        className={styles.inputText}
      />

      <InputText
        label="Background URL"
        value={state.backgroundImageUrl}
        setValue={(backgroundImageUrl) => updateState({ backgroundImageUrl })}
        layer={1}
        className={styles.inputText}
      />

      <InputText
        label="Rating (1 to 5)"
        value={String(state.rating)}
        setValue={(rating) => updateState({ rating: Number(rating) })}
        layer={1}
        className={styles.inputText}
      />

      <div className={styles.buttons}>
        {film && (
          <Button
            label="Delete"
            onClick={() => void handleDelete()}
            type="secondary"
            layer={1}
            className={styles.deleteButton}
          />
        )}

        <Button
          label={film ? "Update" : "Add"}
          onClick={handleUpdate}
          type="primary"
          className={styles.createButton}
        />
      </div>
    </Modal>
  );
};
