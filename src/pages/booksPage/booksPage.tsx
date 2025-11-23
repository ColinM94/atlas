import * as React from "react";

import { MainLayout } from "layouts/mainLayout/mainLayout";
import { Book } from "types/books";
import { subscribeToCollection } from "services/database/subscribeToCollection";

import { BookItem } from "./components/bookItem/bookItem";
import { BookEditor } from "./components/bookEditor/bookEditor";
import styles from "./styles.module.scss";

export const BooksPage = () => {
  const [showBookEditor, setShowBookEditor] = React.useState(false);

  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Book>({
      collection: "books",
      onData: (data) => {
        setBooks(data.sort((a, b) => a.title.localeCompare(b.title)));
      },
    });

    return () => {
      unsubcribe?.();
    };
  }, []);

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
