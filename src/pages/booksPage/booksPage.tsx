import * as React from 'react';

import { List } from 'components/list/list';
import { useAppStore, useAppStoreSlice } from 'stores/useAppStore/useAppStore';
import { Book } from 'types/entertainment';
import { defaultBook } from 'constants/defaults';

export const BooksPage = () => {
  const [showBookEditor, setShowBookEditor] = React.useState(false);

  const { booksLayout } = useAppStoreSlice('booksLayout');

  const handleAdd = () => {
    setShowBookEditor(true);
  };

  const handleLayoutClick = () => {
    useAppStore.setState({
      booksLayout: booksLayout === 'compact' ? 'full' : 'compact',
    });
  };

  return (
    <List<Book>
      items={(book) => ({
        id: book.id,
        data: book,
        name: book.title,
        rating: book.rating,
        imageUrl: book.coverImageUrl,
      })}
      defaultData={defaultBook}
      collection="books"
      inputs={[
        {
          inputType: 'text',
          propertyKey: 'title',
        },
      ]}
      layout={booksLayout}
      aspectRatio={0.65}
      mainPropertyKey="title"
    />
  );
};
