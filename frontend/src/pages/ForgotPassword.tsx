import { useState } from "react";
import type { FormEvent } from "react";
import "./ForgotPassword.css";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("OTP sent successfully");
    console.log("Reset password link sent to:", email);
    setEmail("");
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-form">
        <div className="form-group">
          <label htmlFor="email">Enter your registered email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="reset-button">
          Send OTP
        </button>
      </form>
      <div className="back-to-login">
        <NavLink to="/">Back to Login</NavLink>
      </div>
    </div>
  );
};

export default ForgotPassword;
