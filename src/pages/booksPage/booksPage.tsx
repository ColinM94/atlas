import { MainLayout } from "layouts/mainLayout/mainLayout";
import { Book } from "./components/book/book";

export const BooksPage = () => {
  return (
    <MainLayout>
      <Book />
    </MainLayout>
  );
};
