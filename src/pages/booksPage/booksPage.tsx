import * as React from "react";

import { MainLayout } from "layouts/mainLayout/mainLayout";
import { Book } from "types/books";
import { subscribeToCollection } from "services/database/subscribeToCollection";
import { EntertainmentList } from "components/entertainmentList/entertainmentList";
import { EntertainmentItem } from "components/entertainmentList/types";
import { useAppStore, useAppStoreSlice } from "stores/useAppStore/useAppStore";

import { BookEditor } from "./components/bookEditor/bookEditor";
import styles from "./styles.module.scss";

export const BooksPage = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [showBookEditor, setShowBookEditor] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<Book | undefined>(
    undefined
  );

  const { booksLayout } = useAppStoreSlice("booksLayout");

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

  const handleEditClick = (item: EntertainmentItem) => {
    setSelectedBook(books.find((item) => item.id === item.id));
    setShowBookEditor(true);
  };

  const items: EntertainmentItem[] = books.map((book) => ({
    id: book.id,
    name: book.title,
    subtitle: book.author,
    imageUrl: book.coverImageUrl,
    rating: book.rating,
  }));

  return (
    <MainLayout
      buttons={[
        {
          type: "secondary",
          icon: booksLayout === "compact" ? "dashboard" : "list",
          onClick: () =>
            useAppStore.setState({
              booksLayout: booksLayout === "compact" ? "full" : "compact",
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
      <EntertainmentList
        items={items}
        onEditClick={handleEditClick}
        layout={booksLayout}
        aspectRatio={0.7}
      />

      <BookEditor
        show={showBookEditor}
        setShow={setShowBookEditor}
        book={selectedBook}
      />
    </MainLayout>
  );
};
