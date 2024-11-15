import { useState } from "react";
import { useRouter } from "next/router";
import { addBook } from "../../services/api"; // Assuming you have an addBook API

interface BookForm {
  title: string;
  author: string;
  genre: string;
  condition: string;
  availability: boolean;
}

const AddBookPage: React.FC = () => {
  const router = useRouter();
  const [book, setBook] = useState<BookForm>({
    title: "",
    author: "",
    genre: "",
    condition: "",
    availability: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleCheckboxChange = () => {
    setBook({ ...book, availability: !book.availability });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(book); // Call the addBook API
      alert("Book added successfully!");
      router.push("/books"); // Navigate to books page after adding
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book.");
    }
  };

  return (
    <div className="container">
      <h2>Add New Book</h2>
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
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
