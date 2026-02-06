import { List } from 'components/list/list';
import { Book } from 'types/entertainment';
import { defaultBook } from 'constants/defaults';

export const BooksPage = () => {
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
      layout="compact"
      aspectRatio={0.65}
      mainPropertyKey="title"
    />
  );
};
