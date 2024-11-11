import { useState, useEffect } from "react";
import { fetchBooks } from "../../services/api";
import BookList from "../../components/Booklist";
import { Book } from "../books/types"; // Import the Book type

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    loadBooks();
  }, [search]);

  const loadBooks = async () => {
    try {
      const { data } = await fetchBooks(search);
      setBooks(data as Book[]);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  return (
    <div>
      <h2>Book Listings</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, author, or genre"
      />
      <BookList books={books} />
    </div>
  );
};

export default BooksPage;
