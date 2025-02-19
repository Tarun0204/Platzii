import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { BallTriangle } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [bgColor, setBgColor] = useState("");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          const colors = [
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#FF33A1",
            "#FFC733",
          ];
          setBgColor(colors[Math.floor(Math.random() * colors.length)]);
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      setTimeout(() => {
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }, 100);
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      toast.error("Error logging out. Please try again.", {
        position: "top-right",
      });
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="profile-container">
        {userDetails ? (
          <>
            <div className="profile-image">
              {userDetails.photo ? (
                <img src={userDetails.photo} alt="Profile" />
              ) : (
                <div
                  className="profile-placeholder"
                  style={{ backgroundColor: bgColor }}
                >
                  {userDetails.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h3 className="profile-welcome">Welcome, {userDetails.name}!</h3>
            <div className="profile-details">
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Name:</strong> {userDetails.name}
              </p>
            </div>
            <div className="button-group">
              <button
                className="continue-shopping-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="loader-container">
            <BallTriangle color="#db1c48" height={80} width={80} />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
