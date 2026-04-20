import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminProductList from "./components/AdminProductList";
import Orders from "./components/Orders"; // 👈 make sure you created this file
import Products from "./components/Products";
import API_BASE_URL from "./config";

function App() {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null;
  });

  const [showLogin, setShowLogin] = useState(true);
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  useEffect(() => {
  const findRole = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/role`, {
        params: { userId },
      });
      const userRole = response.data.role;
      setRole(userRole);
    } catch (error) {
      console.error("Error fetching role:", error);
    } 
  };

  if (userId) {
    localStorage.setItem("userId", userId);
    findRole();
  } else {
    localStorage.removeItem("userId");
  }
}, [userId]);

  const handleLogout = () => {
    setUserId(null);
    navigate('/');
  };

  return (
    <>
      <Navbar userId={userId} role={role} onLogout={handleLogout} />
      <div className="container">
        {!userId ? (
          showLogin ? (
            <Login
              onLogin={setUserId}
              onSwitchToSignup={() => setShowLogin(false)}
            />
          ) : (
            <Signup onSwitchToLogin={() => setShowLogin(true)} />
          )
        ) : role === "admin" ? (
          <Routes>
            <Route path="/" element={<Navigate to="/admin/products" />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/admin/products" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products userId={userId} />} />
            <Route path="/cart" element={<ProductList userId={userId} />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
