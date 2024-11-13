interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  conditionIs: string | null;
  availability: boolean;
}

interface BookListProps {
  books: any;
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <ul>
      {books.map((book: any) => (
        <li key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Condition: {book.conditionIs}</p>
          <p>Available: {book.availability ? "Yes" : "No"}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
