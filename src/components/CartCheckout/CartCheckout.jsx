import { useState } from "react";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CartCheckout.css";

const radioButtonsList = [
  { id: "CARD", displayText: "Card", isDisabled: true },
  { id: "NET BANKING", displayText: "Net Banking", isDisabled: true },
  { id: "UPI", displayText: "UPI", isDisabled: true },
  { id: "WALLET", displayText: "Wallet", isDisabled: true },
  { id: "CASH ON DELIVERY", displayText: "Cash on Delivery", isDisabled: false },
];

const CartCheckout = ({ cart, clearCart }) => {
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRadioChange = (event) => {
    if (event.target.value === "CASH ON DELIVERY") {
      setIsConfirmEnabled(true);
    } else {
      setIsConfirmEnabled(false);
    }
  };

  const handleConfirmOrder = () => {
    setIsOrderPlaced(true);
    clearCart();
    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="cart-checkout">
      <div className="checkout-card">
        <div className="checkout-details">
          <h3>Total: ₹ {totalAmount.toFixed(2)}</h3>
          <Popup
            className="checkout-popup"
            modal
            trigger={<button className="checkout-btn">Proceed to Checkout</button>}
          >
            {(close) => (
              <div className="hero-popup">
                {isOrderPlaced ? (
                  <div className="success-message">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5289/5289675.png"
                      className="tick-img"
                      alt="tick"
                    />
                    <h1>Your order has been placed successfully</h1>
                    <button
                      type="button"
                      className="confirm-button"
                      onClick={() => close()}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="checkout-modal-container">
                    <h1 className="payment-heading">Payment Details</h1>
                    <p className="payment-para">Payment Method</p>
                    <div
                      className="checkout-popup-input-fields"
                      onChange={handleRadioChange}
                    >
                      {radioButtonsList.map(({ id, displayText, isDisabled }) => (
                        <div key={id} className="radio-item">
                          <input
                            type="radio"
                            id={id}
                            name="paymentMethod"
                            value={id}
                            disabled={isDisabled}
                          />
                          <label htmlFor={id}>{displayText}</label>
                        </div>
                      ))}
                    </div>
                    <div className="check-order-details">
                      <p>Quantity: {cart.length} Items</p>
                      <p>Total Price: ₹ {totalAmount.toFixed(2)}</p>
                    </div>
                    <button
                      type="button"
                      className="confirm-button"
                      onClick={close}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="confirm-button"
                      style={{
                        backgroundColor: isConfirmEnabled ? "green" : "#ccc",
                        cursor: isConfirmEnabled ? "pointer" : "not-allowed",
                      }}
                      disabled={!isConfirmEnabled}
                      onClick={handleConfirmOrder}
                    >
                      Confirm Order
                    </button>
                  </div>
                )}
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
