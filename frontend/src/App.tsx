import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import "./App.css";

// Define Type for User
interface User {
  name: string;
  email: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/post" element={<Dashboard user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </main>
  );
};

export default App;
