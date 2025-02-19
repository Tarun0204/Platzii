import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Helpers/Firebase";
import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
      }

      toast.success("Sign-up Successfull!");
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Try logging in.");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="form-container">
        <h2 className="login-heading">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="name" className="login-label">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="login-label">Password</label>
          <input
            id="password"
            placeholder="Enter your Password"
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">Sign Up</button>
          <p className="para">
            Already have an account?
            <Link to="/login" className="signup-link"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
