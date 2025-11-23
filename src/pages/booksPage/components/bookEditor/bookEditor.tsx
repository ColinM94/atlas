import * as React from "react";

import { InputText } from "components/inputText/inputText";
import { Modal } from "components/modal/modal";
import { Button } from "components/button/button";
import { createRecord } from "services/database/createRecord";
import { Book } from "types/books";
import { mergeReducer } from "utils/mergeReducer";

import styles from "./styles.module.scss";
import { Divider } from "components/divider/divider";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const BookEditor = (props: Props) => {
  const { show, setShow } = props;

  const [state, updateState] = React.useReducer(mergeReducer<Book>, {
    id: "",
    author: "",
    isbn: "",
    title: "",
    coverImageUrl: "",
  });

  const handleSave = async () => {
    createRecord<Book>({
      collection: "books",
      data: state,
    });
  };

  const retrieveInfo = async () => {
    const response = await fetch(
      `https://openlibrary.org/isbn/${state.isbn}.json`
    );

    if (!response.ok) throw "Open Library API error";

    const result = await response.json();

    const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${state.isbn}-L.jpg`;

    updateState({
      coverImageUrl,
      title: result.title,
    });
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
      label="New Book"
      className={styles.container}
    >
      <div className={styles.row}>
        <InputText
          value={state.isbn}
          setValue={(isbn) => updateState({ isbn })}
          label="ISBN"
          layer={1}
          className={styles.inputText}
        />

        <Button
          type="secondary"
          icon="search"
          layer={2}
          onClick={retrieveInfo}
        />
      </div>

      {/* <Divider layer={2} /> */}

      <InputText
        label="Title"
        value={state.title}
        setValue={(title) => updateState({ title })}
        layer={1}
        className={styles.inputText}
      />

      <InputText
        label="Author"
        value={state.author}
        setValue={(author) => updateState({ author })}
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

      <Button
        icon="save"
        label="Save"
        onClick={handleSave}
        type="primary"
        centerLabel
        className={styles.saveButton}
      />
    </Modal>
  );
};
