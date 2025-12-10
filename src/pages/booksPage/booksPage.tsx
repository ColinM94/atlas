import * as React from 'react';

import { MainLayout } from 'layouts/mainLayout/mainLayout';
import { subscribeToCollection } from 'services/database/subscribeToCollection';
import { List } from 'components/list/list';
import { useAppStore, useAppStoreSlice } from 'stores/useAppStore/useAppStore';
import { Book } from 'types/entertainment';
import { ListItemData } from 'components/list/types';

import { BookEditor } from './components/bookEditor/bookEditor';
import styles from './styles.module.scss';

export const BooksPage = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [showBookEditor, setShowBookEditor] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<Book | undefined>(undefined);

  const { booksLayout } = useAppStoreSlice('booksLayout');

  React.useEffect(() => {
    const unsubcribe = subscribeToCollection<Book>({
      collection: 'books',
      onData: (data) => {
        setBooks(
          data.sort((a, b) => a.title.localeCompare(b.title)).sort((a, b) => b.rating - a.rating)
        );
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
    setSelectedBook(books.find((book) => book.id === item.id));
    setShowBookEditor(true);
  };

  const handleLayoutClick = () => {
    useAppStore.setState({
      booksLayout: booksLayout === 'compact' ? 'full' : 'compact',
    });
  };

  const items: ListItemData[] = books.map((book) => ({
    id: book.id,
    name: book.title,
    subtitle: book.author,
    imageUrl: book.coverImageUrl,
    rating: book.rating,
  }));

  return (
    <MainLayout
      layout={booksLayout}
      onLayoutClick={handleLayoutClick}
      onAddClick={handleAdd}
      className={styles.container}
    >
      <List items={items} onEditClick={handleEditClick} layout={booksLayout} aspectRatio={0.65} />

      <BookEditor show={showBookEditor} setShow={setShowBookEditor} book={selectedBook} />
    </MainLayout>
  );
};
