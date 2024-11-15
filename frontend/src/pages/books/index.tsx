"use client";
import { useState, useEffect } from "react";
import { fetchBooks, fetchMyList } from "../../services/api";
import BookList from "../../components/Booklist";
import { Book } from "../books/types"; // Import the Book type
import { useRouter } from "next/navigation"; // Importing useRouter for navigation

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter(); // Initialize useRouter for navigation
  useEffect(() => {
    loadBooks();
  }, [search]);
  3;
  const loadBooks = async () => {
    try {
      const { data } = await fetchBooks(search);
      console.log("data: ", data);
      setBooks(data);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  const handleMyList = async () => {
    try {
      const id: any = localStorage.getItem("user");
      console.log("local data: ", id, id.id);

      const { data } = await fetchMyList(id.id);
      setBooks(data.books); // Assuming data.books is the response
    } catch (error) {
      console.error("Error loading My List:", error);
    }
  };

  const handleNewList = () => {
    // Navigate to Add List page
    router.push("/add-book");
  };

  const handleLogout = () => {
    // Navigate to login page when logout button is clicked
    router.push("/login");
  };

  return (
    <div className="container">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand ml-2" href="">
          Home
        </a>
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
                Total List
              </button>
              <button
                onClick={handleMyList}
                className="btn btn-secondary my-2 p-2 m-2"
              >
                My List
              </button>
              <button
                onClick={handleNewList}
                className="btn btn-success my-2 m-2"
              >
                <i className="bi bi-plus" style={{ fontSize: "20px" }}>
                  +
                </i>{" "}
                New List
              </button>
            </div>
          </div>
        </div>
      </section>
      <BookList books={books} />
    </div>
  );
};

export default BooksPage;
