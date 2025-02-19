import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { BsDashSquare, BsPlusSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import CartCheckout from "../CartCheckout/CartCheckout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const { cart, removeItemFromCart, removeAllItemsFromCart } = useCart();
  const [cartItems, setCartItems] = useState(cart);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const clearCart = () => {
    removeAllItemsFromCart();
    setIsOrderPlaced(true);
    toast.success("Cart cleared successfully!", { position: "top-right" });
  };

  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
    toast.info("Item removed from cart!", { position: "top-right" });
  };

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <ToastContainer autoClose={3000} />
      <div className="cart-container">
        {cartItems.length === 0 && !isOrderPlaced ? (
          <div className="empty-cart-view">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--shopping-ecommerce-simple-error-state-pack-user-interface-illustrations-6024626.png?f=webp"
              alt="empty cart"
              className="empty-img"
            />
            <p className="empty-cart-msg">Your cart is empty</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : isOrderPlaced ? (
          <div className="success-message">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5289/5289675.png"
              className="tick-img"
              alt="Order Success"
            />
            <h1>Your order has been placed successfully</h1>
            <Link to="/" className="continue-shopping-btn">
              Back to Shopping
            </Link>
          </div>
        ) : (
          <>
            <h1 className="cart-items-head">My Cart Items</h1>
            <div className="cart-header">
              <button onClick={clearCart} className="remove-all-btn">
                Remove All Items
              </button>
            </div>

            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img className="cart-product-image" src={item.image} alt={item.title} />
                  <div className="cart-item-details-container">
                    <div className="cart-product-title-brand-container">
                      <p className="cart-product-title">{item.title}</p>
                    </div>
                    <div className="cart-quantity-container">
                      <button
                        type="button"
                        className="quantity-controller-button"
                        onClick={() => updateQuantity(item.id, -1)}
                        data-testid="minus"
                      >
                        <BsDashSquare color="#52606D" size={12} />
                      </button>
                      <p className="cart-quantity">{item.quantity}</p>
                      <button
                        type="button"
                        className="quantity-controller-button"
                        onClick={() => updateQuantity(item.id, 1)}
                        data-testid="plus"
                      >
                        <BsPlusSquare color="#52606D" size={12} />
                      </button>
                    </div>
                    <div className="total-price-remove-container">
                      <p className="cart-total-price">
                        $ {(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    data-testid="remove"
                  >
                    <FaRegTrashAlt />
                  </button>
                </li>
              ))}
            </ul>

            <CartCheckout cart={cartItems} clearCart={clearCart} />
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
