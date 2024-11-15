import React from "react";
import { Book } from "../books/types";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { deleteList } from "@/services/api"; // Import delete API function

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const router = useRouter(); // Use router for navigation

  const handleEditList = (listId: string) => {
    // Navigate to Edit List page with listId as query parameter
    router.push(`/edit-list?id=${listId}`);
  };

  const handleDeleteList = async (listId: string) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      try {
        const id: any = listId;
        await deleteList(id); // Assuming deleteList API exists
        alert("List deleted successfully");
        // Optionally reload or refresh the page to reflect deletion
      } catch (error) {
        console.error("Error deleting list:", error);
        alert("Failed to delete the list. Please try again.");
      }
    }
  };

  return (
    <main>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {books.length > 0 ? (
              books.map((book) => (
                <div key={book.id} className="col">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">Author: {book.author}</p>
                      <p className="card-text">Genre: {book.genre}</p>
                      <p className="card-text">condition: {book.status}</p>
                      <p className="card-text">
                        availability:{" "}
                        {book.availability === true ? "yes" : "No"}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleEditList(book.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteList(book.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No books found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookList;
