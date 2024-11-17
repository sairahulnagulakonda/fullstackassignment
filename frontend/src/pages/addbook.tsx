import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface BookForm {
  title: string;
  author: string;
  genre: string;
  status: string;
  availability: boolean;
  userId: string;
}

const AddBookPage: React.FC = () => {
  const router = useRouter();
  const [book, setBook] = useState<BookForm>({
    title: "",
    author: "",
    genre: "",
    status: "",
    availability: true,
    userId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleCheckboxChange = () => {
    setBook({ ...book, availability: !book.availability });
  };

  const addBook = async (book: BookForm) => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.error("User data not found in localStorage");
        return;
      }

      const user = JSON.parse(userString);

      setBook({ ...book, userId: user.id });

      if (!user.id) {
        console.error("User ID is missing");
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/books/create`,
        book,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Consistent token logic
            "Content-Type": "application/json", // Optional
          },
        }
      );
      router.push("/books");
      console.log("data inside add book function", response);
    } catch (error) {
      console.error("Error in addBook API:", error);
      throw error;
    }
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="shadow p-4 rounded bg-white"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="mb-4 text-center">Add New Book</h2>

        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter author's name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter book genre"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="condition" className="form-label">
            Condition
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={book.status}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter book condition (e.g., New, Used)"
            required
          />
        </div>

        <div className="form-check mb-4">
          <input
            type="checkbox"
            id="availability"
            checked={book.availability}
            onChange={handleCheckboxChange}
            className="form-check-input"
          />
          <label htmlFor="availability" className="form-check-label">
            Available
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
