import { useState } from "react";
import type { FormEvent } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    navigate("/post")
    alert("Login successfuly")
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
