import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { BallTriangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../../context/CartContext"; 
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const onDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const onClickAddToCart = () => {
    addToCart(product, quantity); 
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 2000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="product-details-view">
        <div className="product-details-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <div className="product-info">
            <h1 className="product-name">{product.title}</h1>
            <p className="price-details">${product.price}</p>
            <div className="rating-container">
              <p className="rating">{product.rating.rate}</p>
              <img
                src="https://t3.ftcdn.net/jpg/08/06/18/52/360_F_806185251_GHFUrYkjZKNig1q5fK03tp6uk6Wuy0GX.jpg"
                alt="star"
                className="star"
              />
            </div>
            <p className="product-description">{product.description}</p>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={onClickAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
