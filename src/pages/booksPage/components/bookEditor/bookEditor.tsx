import * as React from 'react';

import { InputText } from 'components/inputText/inputText';
import { Modal } from 'components/modal/modal';
import { Button } from 'components/button/button';
import { Divider } from 'components/divider/divider';
import { createRecord } from 'services/database/createRecord';
import { mergeReducer } from 'utils/mergeReducer';
import { updateRecord } from 'services/database/updateRecord';
import { deleteRecord } from 'services/database/deleteRecord';
import { Book } from 'types/entertainment';
import { defaultBook } from 'constants/defaults';

import styles from './styles.module.scss';

interface Props {
  book?: Book | undefined;
  show: boolean;
  setShow: (show: boolean) => void;
}

export const BookEditor = (props: Props) => {
  const { book, show, setShow } = props;

  const [state, updateState] = React.useReducer(mergeReducer<Book>, book || defaultBook());

  // const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    updateState(book || defaultBook());
  }, [show]);

  const handleDelete = async () => {
    if (!book) return;

    const response = await deleteRecord({
      collection: 'books',
      id: book.id,
    });

    if (!response.success) {
      alert('Failed to delete record');
    }
  };

  const handleUpdate = async () => {
    if (book) {
      await updateRecord({
        id: book?.id,
        collection: 'books',
        data: state,
      });
    } else {
      await createRecord({
        collection: 'books',
        data: state,
      });
    }

    setShow(false);
  };

  const retrieveInfo = async () => {
    // const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(state.isbn)}&limit=1`;

    // const res = await fetch(url);

    // const { docs } = await res.json();

    // const result = docs[0];

    // updateState({
    //   coverImageUrl: `https://covers.openlibrary.org/b/isbn/${state.isbn}-L.jpg`,
    //   title: result.title,
    //   author: result.author_name,
    // });

    // return;

    const response = await fetch(`https://openlibrary.org/isbn/${state.isbn}.json`);

    if (!response.ok) throw new Error('Open Library API error');

    const result = (await response.json()) as {
      title: string;
      authors: { key: string; title: string }[];
    };

    const authorPath = result?.authors?.[0]?.key;

    let author = '';

    if (authorPath) {
      const authorResponse = await fetch(`https://openlibrary.org${authorPath}.json`);

      const authorResult = (await authorResponse?.json()) as { personal_name: string };
      author = authorResult.personal_name;
    }

    updateState({
      coverImageUrl: `https://covers.openlibrary.org/b/isbn/${state.isbn}-L.jpg`,
      title: result.title,
      author: author,
    });
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
      label="New Book"
      contentClassName={styles.content}
      className={styles.container}
    >
      <div className={styles.searchContainer}>
        <div className={styles.row}>
          <InputText
            value={state.isbn}
            setValue={(isbn) => updateState({ isbn })}
            label="Search by ISBN"
            layer={1}
            className={styles.inputText}
          />

          <Button type="secondary" icon="search" layer={2} onClick={retrieveInfo} />
        </div>

        {/* <div className={styles.row}>
          <InputText
            value={search}
            setValue={setSearch}
            label="Search by Name"
            layer={1}
            className={styles.inputText}
          />

          <Button type="secondary" icon="search" layer={2} onClick={retrieveInfo} />
        </div> */}
      </div>

      <Divider layer={2} />

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

      <InputText
        label="Rating (1 to 5)"
        value={String(state.rating)}
        setValue={(rating) => updateState({ rating: Number(rating) })}
        layer={1}
        className={styles.inputText}
      />

      <div className={styles.buttons}>
        {book && (
          <Button
            label="Delete"
            onClick={() => void handleDelete()}
            type="secondary"
            layer={1}
            className={styles.deleteButton}
          />
        )}

        <Button
          label={book ? 'Update' : 'Add'}
          onClick={handleUpdate}
          type="primary"
          className={styles.createButton}
        />
      </div>
    </Modal>
  );
};
