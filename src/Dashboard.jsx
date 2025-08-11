import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const expiry = localStorage.getItem("tokenExpiry") || sessionStorage.getItem("tokenExpiry");
    const now = Date.now();

    if (!token || !expiry || now > parseInt(expiry, 10)) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/signup"); // or "/login"
    }
  }, [navigate]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        background: "#f0f0f0",
        borderRadius: "10px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1>Welcome to your Dashboard</h1>
      <p>This is a simple dummy dashboard UI.</p>
    </div>
  );
}
