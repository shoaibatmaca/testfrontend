import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupForm.css";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending...");

    try {
      const response = await axios.post(
        "https://web-production-3b7d9.up.railway.app/accounts/api/signup/",
        { ...formData, remember_me: rememberMe },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = response.data.access;
      if (token) {
        const expiryTime = rememberMe ? 24 * 60 * 60 * 1000 : 15 * 60 * 1000; // 1 day or 15 mins in ms
        const expiryTimestamp = Date.now() + expiryTime;

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("authToken", token);
        storage.setItem("tokenExpiry", expiryTimestamp.toString());
      }

      setMessage(`Success: ${response.data.message || "Account created"}`);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        setMessage("Network Error");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />{" "}
          Remember Me
        </label>
        <button type="submit">Signup</button>
      </form>
      <p className="message">{message}</p>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Login
        </Link>
      </p>
    </div>
  );
}
