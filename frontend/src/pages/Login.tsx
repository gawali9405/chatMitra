import { useState } from "react";
import type { FormEvent } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

interface LoginProps {
  setUser: (user: User) => void;
}

const Login = ({ setUser }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      console.log("user info", res);
      const userData = res.data.user;
      setUser(userData);
      alert("Login successful");
      navigate("/post");
    } catch (err: any) {
      console.error("Login error:", err);

      // Handle error from backend
      if (err.response && err.response.data && err.response.data.message) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>

        <div className="extra-links">
          <NavLink to="/forgot-password" className="forgot-link">
            Forgot Password?
          </NavLink>
        </div>

        {loginError && <div className="error login-error">{loginError}</div>}

        <button
          type="submit"
          className="login-button"
          disabled={!validateEmail(email) || password.trim() === ""}
        >
          Login
        </button>
      </form>

      <div className="register-link">
        Don’t have an account? <NavLink to="/register">Register</NavLink>
      </div>
    </div>
  );
};

export default Login;
