import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/Helpers/Firebase";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/Helpers/Profile";
import Cart from "./components/Cart/Cart";
import ProductsDetails from "./components/ProductDetails/ProductDetails";
import { ClipLoader } from "react-spinners";
import { CartProvider } from "./context/CartContext"; 
import "./App.css";

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("cartList")) || []
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color="#007bff" />
      </div>
    );
  }

  return (
    <CartProvider value={{ cartList, setCartList }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Home />} />} />
          <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Profile />} />} />
          <Route path="/cart" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Cart />} />} />
          <Route path="/product/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ProductsDetails />} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
