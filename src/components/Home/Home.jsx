import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { BallTriangle } from "react-loader-spinner";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        setError("Failed to fetch categories");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const url =
        category === "all"
          ? "https://fakestoreapi.com/products"
          : `https://fakestoreapi.com/products/category/${category}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      setError("Failed to fetch products for selected category");
    }
    setLoading(false);
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  if (loading) {
    return (
      <div className="spinner-container">
        <BallTriangle
          height={80}
          width={80}
          color="#00BFFF"
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      {isMobile ? (
        <div className="category-dropdown">
          <select
            onChange={(e) => handleCategoryClick(e.target.value)}
            value={selectedCategory}
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {capitalize(category)}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="categories-bar">
          <button
            className={selectedCategory === "all" ? "active underline" : ""}
            onClick={() => handleCategoryClick("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {capitalize(category)}
            </button>
          ))}
        </div>
      )}

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
              <Link to={`/product/${product.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h1 className="no">No Results Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
