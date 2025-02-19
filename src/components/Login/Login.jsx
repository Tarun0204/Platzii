import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { auth } from "../Helpers/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      toast.error("Invalid credentials, please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your Email"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <div className="login-input-container">
            <input
              id="password"
              placeholder="Enter your Password"
              className="login-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          <p className="para">
            Don't have an account?
            <Link to="/signup" className="signup-link">
              {" "}
              SignUp
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
