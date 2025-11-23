import * as React from "react";

import { Book } from "types/books";
import { Button } from "components/button/button";

import styles from "./styles.module.scss";
import { BookEditor } from "../bookEditor/bookEditor";

interface Props {
  book: Book;
}

export const BookItem = (props: Props) => {
  const { book } = props;

  const [showEditor, setShowEditor] = React.useState(false);

  const handleEditClick = () => {
    setShowEditor(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={book.coverImageUrl} className={styles.image} />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoTitle}>{book.title}</div>
            <div className={styles.infoSub}>{book.author}</div>
          </div>

          <Button
            icon="edit"
            onClick={handleEditClick}
            type="secondary"
            layer={1}
            className={styles.titleEditButton}
          />
        </div>
      </div>

      <BookEditor book={book} show={showEditor} setShow={setShowEditor} />
    </>
  );
};
