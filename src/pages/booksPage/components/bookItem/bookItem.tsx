import * as React from "react";
import { Book } from "types/entertainment";
import styles from "./styles.module.scss";

interface Props {
  book: Book;
}

type BookInfo = {
  title: string;
  coverUrl: string;
};

export const BookItem = (props: Props) => {
  const { book } = props;

  const [info, setInfo] = React.useState<BookInfo>({
    coverUrl: "",
    title: "",
  });

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://openlibrary.org/isbn/${book.isbn}.json`
      );

      if (!response.ok) throw "Open Library API error";

      const result = await response.json();

      const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

      setInfo({
        title: result.title,
        coverUrl,
      });
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={info.coverUrl} className={styles.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.infoName}>{info.title}</div>
        {/* <div className={styles.infoGenre}>Adventure</div> */}
      </div>
    </div>
  );
};
