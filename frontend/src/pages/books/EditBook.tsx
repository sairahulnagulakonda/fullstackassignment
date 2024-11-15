import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getBook, updateBook } from "../../services/api"; // Assuming you have getBook and updateBook APIs

interface BookForm {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: string;
  availability: boolean;
}

const EditBookPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get book id from query parameters
  const [book, setBook] = useState<BookForm | null>(null);

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    try {
      const data = await getBook(id as string); // Call the getBook API with the book id
      setBook(data.book);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (book) {
      setBook({ ...book, [name]: value });
    }
  };

  const handleCheckboxChange = () => {
    if (book) {
      setBook({ ...book, availability: !book.availability });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
      try {
        await updateBook(book); // Call the updateBook API
        alert("Book updated successfully!");
        router.push("/books"); // Navigate to books page after updating
      } catch (error) {
        console.error("Error updating book:", error);
        alert("Error updating book.");
      }
    }
  };

  if (!book) {
    return <div>Loading...</div>; // Show loading state if book data is not available
  }

  return (
    <div className="container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition</label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={book.condition}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={book.availability}
              onChange={handleCheckboxChange}
            />
            Available
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
