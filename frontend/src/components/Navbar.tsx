"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={{ padding: "50px" }}>
        <h1>Welcome to the Book Exchange Platform</h1>
        <p>Discover, share, and borrow books from other enthusiasts.</p>
      </div>
      <div style={styles.centerLinks}>
        <Link href="/login" style={styles.buttonLink}>
          Login
        </Link>
        <Link href="/register" style={styles.buttonLink}>
          Register
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    height: "100vh",
    backgroundColor: "#333",
  },
  centerLinks: {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "1rem",
    alignItems: "center" as const,
  },
  buttonLink: {
    display: "inline-block" as const,
    padding: "0.8rem 2rem",
    fontSize: "1.2rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    textAlign: "center" as const,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  buttonLinkHover: {
    backgroundColor: "#45a049",
  },
  button: {
    backgroundColor: "#ff4757",
    color: "#fff",
    border: "none",
    padding: "0.8rem 2rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  welcomeMessage: {
    textAlign: "center" as const,
    color: "#fff",
    marginBottom: "20px", // Adjust space between the message and the logout button
  },
};

export default Navbar;
