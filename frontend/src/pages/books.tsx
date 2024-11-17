"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchBooks, fetchMyList } from "../services/api";
import BookList from "../components/Booklist";
import { Book } from "./types";
import { useRouter } from "next/navigation";

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [Type, setType] = useState("");
  const [page, setPage] = useState(1); // Track current page for pagination
  const [loading, setLoading] = useState(false); // Loading state
  const [isMyList, setIsMyList] = useState(false); // Track if user is viewing "My List"
  const router = useRouter();

  const [debouncedSearch, setDebouncedSearch] = useState<string>(""); // Debounced value

  // Debounce effect for search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearch(search); // Update debounced search after delay
    }, 500); // Adjust debounce delay as needed (500ms in this case)

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [search, page]);

  // Fetch books whenever debouncedSearch changes
  useEffect(() => {
    setType("global");
    const val: any = localStorage.getItem("user");
    const user = JSON.parse(val);
    setUserEmail(user.email);
    if (!isMyList) {
      setPage(1); // Reset page when search changes
      setBooks([]); // Clear current books
      loadBooks(1); // Load new books based on search query
    }
  }, [debouncedSearch]);

  // Fetch user email from localStorage
  // useEffect(() => {
  //   setType("global");
  //   const val: any = localStorage.getItem("user");
  //   const user = JSON.parse(val);
  //   setUserEmail(user.email);
  //   if (!isMyList) {
  //     loadBooks(page); // Load books on search or page change
  //   }
  // }, [search, page, isMyList]);

  // Fetch books from API (for total books and pagination)
  const loadBooks = async (page: number) => {
    if (loading) return; // Prevent multiple API calls at once
    setLoading(true);
    setType("global");
    try {
      const { data } = await fetchBooks(search, page); // Pass the current page for pagination
      setBooks((prevBooks) => [...prevBooks, ...data.books]); // Append new books
      setLoading(false);
    } catch (error) {
      console.error("Error loading books:", error);
      setLoading(false);
    }
  };

  // Handle My List view
  const handleMyList = async () => {
    setIsMyList(true);
    setPage(1); // Reset pagination for My List
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
      setBooks(data); // Set My List data
    } catch (error) {
      console.error("Error loading My List:", error);
    }
  };

  // Handle book deletion
  const handleBookDelete = (bookId: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  // Handle logout
  const handleLogout = () => {
    router.push("/login");
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (loading || isMyList) return; // Don't trigger for "My List"
    const bottom =
      document.documentElement.scrollHeight ===
      document.documentElement.scrollTop + window.innerHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1); // Load next page if at the bottom
    }
  }, [loading, isMyList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="container">
      <nav className="navbar navbar-dark p-3 bg-dark">
        <div className="navbar-brand ml-2">Home</div>
        <div className="d-flex align-items-center">
          <p className="text-white mb-0 p-2">{userEmail}</p>
          <button
            type="submit"
            onClick={handleLogout}
            className="btn btn-outline-success my-2 mr-2 my-sm-0 text-white"
          >
            Logout
          </button>
        </div>
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
                onClick={() => {
                  setIsMyList(false); // Reset to load books when clicking 'Total Books'
                  setPage(1); // Reset page number to 1
                  setBooks([]); // Clear current books before loading new ones
                }}
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
