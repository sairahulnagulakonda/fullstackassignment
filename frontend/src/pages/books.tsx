"use client";
import { useState, useEffect } from "react";
import { fetchBooks, fetchMyList } from "../services/api";
import BookList from "../components/Booklist";
import { Book } from "./types"; // Import the Book type
import { useRouter } from "next/navigation"; // Importing useRouter for navigation

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const [Type, setType] = useState("");
  const router = useRouter(); // Initialize useRouter for navigation
  let val: string = "global";
  useEffect(() => {
    setType(val);
    loadBooks();
  }, [search]);
  3;
  const loadBooks = async () => {
    try {
      const { data } = await fetchBooks(search);
      console.log("data: ", data);
      setType(val);
      setBooks(data.books);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  const handleMyList = async () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        console.error("User data not found in localStorage");
        return;
      }

      const user = JSON.parse(userString);
      if (!user.id) {
        console.error("User ID is missing");
        return;
      }

      console.log("Fetching books for user ID:", user.id);

      const { data } = await fetchMyList({
        id: user.id,
        listId: "",
      });
      setType("");
      setBooks(data); // Assuming data.books is the correct response
    } catch (error) {
      console.error("Error loading My List:", error);
    }
  };
  const handleBookDelete = (bookId: string) => {
    // Remove the deleted book from the state
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };
  const handleLogout = () => {
    // Navigate to login page when logout button is clicked
    router.push("/login");
  };

  return (
    <div className="container">
      <nav className="navbar navbar-dark p-3 bg-dark">
        <div className="navbar-brand ml-2">Home</div>
        <button
          type="submit"
          onClick={handleLogout}
          className="btn btn-outline-success my-2 mr-2 my-sm-0 text-white"
        >
          Logout
        </button>
      </nav>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Book Listings</h1>
            <form className="d-flex">
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, author, or genre"
                  aria-label="Search"
                />
                <span className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </span>
              </div>
            </form>

            <div className="mt-5">
              <button
                onClick={loadBooks}
                className="btn btn-primary my-2 p-2 m-2"
              >
                Total Books
              </button>
              <button
                onClick={handleMyList}
                className="btn btn-secondary my-2 p-2 m-2"
              >
                My Books
              </button>
            </div>
          </div>
        </div>
      </section>
      <BookList books={books} type={Type} onDeleteBook={handleBookDelete} />
    </div>
  );
};

export default BooksPage;
