import React, { useState } from "react";
import { Book } from "../books/types";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { deleteList } from "@/services/api"; // Import delete API function
import Link from "next/link";

interface BookListProps {
  books: Book[];
  type: string;
  onDeleteBook: (bookId: string) => void; // Prop for deleting a book
}

const BookList: React.FC<BookListProps> = ({ books, type, onDeleteBook }) => {
  const router = useRouter(); // Use router for navigation
  const handleEditList = (listId: string) => {
    // Navigate to Edit List page with listId as query parameter
    router.push(`/editbook?id=${listId}`);
  };

  const deleteList = async (listId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${listId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Consistent token logic
            "Content-Type": "application/json", // Optional
          },
        }
      );
      onDeleteBook(listId);
      return response.data;
    } catch (error) {
      console.error("Error in deleteList API:", error);
      throw error;
    }
  };

  const handleDeleteList = async (listId: string) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      try {
        console.log("Deleting list with ID:", listId);

        await deleteList(listId); // Pass the parameter here
        alert("List deleted successfully");

        // Update state or UI after successful deletion
      } catch (error) {
        alert("Failed to delete the list. Please try again.");
      }
    }
  };

  // const handleNewList = () => {
  //   // Navigate to Add List page
  //   router.push("/addbook");
  // };

  return (
    <main>
      <div className="album py-5 bg-light">
        <div className="container">
          {type === "global" ? (
            ""
          ) : (
            <Link href={"/addbook"} className="btn btn-success my-2 m-2">
              <i className="bi bi-plus" style={{ fontSize: "20px" }}>
                +
              </i>{" "}
              New List
            </Link>
          )}
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
                    {type === "global" ? (
                      ""
                    ) : (
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
                    )}
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
