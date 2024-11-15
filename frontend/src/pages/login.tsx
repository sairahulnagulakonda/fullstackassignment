"use client";

import { forgotPassword, loginUser, registerUser } from "@/services/api";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Ensure this import is correct
import CustomSnackbar from "../components/Snackbar";
const LoginForm: React.FC = () => {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setNewPassword] = useState("");
  const [username, setUserName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const clear = () => {
    setEmail("");
    setPassword("");
    setNewPassword("");
    setUserName("");
  };
  const router = useRouter();
  const handleLogin = async (e: FormEvent) => {
    try {
      const { data } = await loginUser({ email, password });
      console.log("data inside handle login: ", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      setSnackbar({
        open: true,
        message: "login successful!",
        severity: "success",
      });
      clear();
      router.push("/books");
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Login failed. Please check your credentials.",
        severity: "error",
      });
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      setSnackbar({
        open: true,
        message: "Register successful. please login to continue",
        severity: "success",
      });
      clear();
      setView("login");
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Registration failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleForgot = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email, password, repassword });
      setSnackbar({
        open: true,
        message: "password changed successful!",
        severity: "success",
      });
      clear();
      setView("login");
    } catch (err) {
      setSnackbar({
        open: true,
        message: "password reset failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const renderForm = () => {
    switch (view) {
      case "login":
        return (
          <form onSubmit={handleLogin}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form3Example3"
                name="email"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                name="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="form-check mb-0">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="form2Example3"
                />
                <label className="form-check-label" htmlFor="form2Example3">
                  Remember me
                </label>
              </div>
              <a
                href="#!"
                className="text-body"
                onClick={() => setView("forgotPassword")}
              >
                Forgot password?
              </a>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              >
                Login
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account?{" "}
                <a
                  href="#!"
                  className="link-danger"
                  onClick={() => setView("register")}
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        );
      case "register":
        return (
          <form onSubmit={handleRegister}>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form3Example1"
                name="name"
                className="form-control form-control-lg"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form3Example2"
                name="email"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-outline mb-3">
              <input
                type="password"
                id="form3Example3"
                name="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              >
                Register
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Already have an account?{" "}
                <a
                  href="#!"
                  className="link-danger"
                  onClick={() => setView("login")}
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        );
      case "forgotPassword":
        return (
          <form onSubmit={handleForgot}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form3Example3"
                name="email"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="form3Example5"
                name="password"
                className="form-control form-control-lg"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <input
                type="password"
                id="form3Example5"
                name="repassword"
                className="form-control form-control-lg"
                placeholder="Re enter your new password"
                value={repassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              >
                Reset Password
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Remembered your password?{" "}
                <a
                  href="#!"
                  className="link-danger"
                  onClick={() => setView("login")}
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleCloseSnackbar}
          />
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            {renderForm()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
