interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: string;
  availability: boolean;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Condition: {book.condition}</p>
          <p>Available: {book.availability ? "Yes" : "No"}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
