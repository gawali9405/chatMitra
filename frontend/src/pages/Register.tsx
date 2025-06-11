import { useState } from "react";
import type { FormEvent } from "react";
import "./Register.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log("Registering with:", { name, email, password, mobile });
    navigate("/login")
    setName("");
    setEmail("");
    setPassword("");
    setMobile("");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value;
              // Only allow digits, up to 10 characters
              if (/^\d{0,10}$/.test(value)) {
                setMobile(value);
              }
            }}
            inputMode="numeric"
            maxLength={10}
            required
          />
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
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>

      <div className="login-link">
        Already have an account? <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  );
};

export default Register;
