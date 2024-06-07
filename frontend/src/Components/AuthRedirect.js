import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthRedirect = () => {
  const [showModal, setShowModal] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const getUser = async () => {
    try {
      console.log("Getting user info");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/login/success`,
        {
          withCredentials: true,
        }
      );
      if (res.data.message === "User is inactive") {
        alert("User is inactive, please contact admin");
        window.location.href = "/"; // Redirect to homepage or another safe route
        return;
      }
      if (res.data.found === true) {
        // Redirect to the dashboard
        window.location.href = "/";
      }
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setShowModal(true); // Show the modal to let the user choose the registration type
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUnload = (event) => {
    if (!isRedirecting) {
      // Perform localStorage cleanup
      localStorage.removeItem("userInfo");
    }
  };

  useEffect(() => {
    // Add event listener for beforeunload
    window.addEventListener("beforeunload", handleUnload);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [isRedirecting]);

  const handleRedirect = (type) => {
    setIsRedirecting(true);
    const redirectPath = type === "corporate" ? "/corporate-register" : "/user-register";
    setTimeout(() => {
      window.location.href = redirectPath;
    }, 0); // Allow state update before redirecting
  };

  const handleCancel = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/"; // Redirect to homepage or another safe route
  };

  return (
    <>
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Select Registration Type</h2>
            <button style={modalStyles.button} onClick={() => handleRedirect("corporate")}>
              Register as Corporate
            </button>
            <button style={modalStyles.button} onClick={() => handleRedirect("student-alumni")}>
              Register as Student/Alumni
            </button>
            <button style={modalStyles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
  },
  cancelButton: {
    margin: "10px",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#DC3545",
    color: "white",
    border: "none",
  }
};

export default AuthRedirect;
