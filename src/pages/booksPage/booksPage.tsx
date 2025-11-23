import * as React from "react";

import { MainLayout } from "layouts/mainLayout/mainLayout";
import { Book } from "types/books";

import { BookItem } from "./components/bookItem/bookItem";
import { BookEditor } from "./components/bookEditor/bookEditor";
import styles from "./styles.module.scss";

const books: Book[] = [
  {
    isbn: "0547928211",
  },
  {
    isbn: "9780575089914",
  },
];

export const BooksPage = () => {
  const [showBookEditor, setShowBookEditor] = React.useState(false);

  const handleAdd = () => {
    setShowBookEditor(true);
  };

  return (
    <MainLayout
      buttons={[
        {
          type: "secondary",
          icon: "add",
          onClick: handleAdd,
        },
      ]}
      className={styles.container}
    >
      {books.map((book) => (
        <BookItem book={book} key={book.id} />
      ))}

      <BookEditor show={showBookEditor} setShow={setShowBookEditor} />
    </MainLayout>
  );
};
