import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface BookForm {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: string;
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

  const getBook = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/books/book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Consistent token logic
            "Content-Type": "application/json", // Optional
          },
        }
      );
      console.log("Data inside getBook function:", response.data);
      return response.data; // Returning the actual data
    } catch (error) {
      console.error("Error in getBook API:", error);
      throw error;
    }
  };

  const loadBook = async () => {
    try {
      const data: any = await getBook(id); // Call the getBook API with the book id
      console.log("Data inside loadBook function:", data);
      setBook(data); // Assuming data contains the book object
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

  const updateBook = async (book: BookForm) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        book,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Consistent token logic
            "Content-Type": "application/json", // Optional
          },
        }
      );
      console.log("Data inside updateBook function:", response.data);
      router.push("/books"); // Correct path
      return response.data; // Returning the updated book data if needed
    } catch (error) {
      console.error("Error in updateBook API:", error);
      alert("Error updating book. Please try again.");
      throw error;
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
        <h2 className="mb-4 text-center">Edit Book</h2>
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
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBookPage;
