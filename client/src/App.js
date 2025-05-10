import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./layouts/AdminLayout"; // Wraps Admin pages
import ProtectedRoute from "./layouts/ProtectedRoute"; // Import ProtectedRoute
import Login from "./pages/Admin/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FeedbackPage from './pages/FeedbackPage';
import FeedbackIndex from "./pages/Admin/Feedback/Index";
import ChatbotPage from './pages/ChatbotPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />

        {/* Admin Login Route (No Protection) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/admin-feedback" element={<FeedbackIndex/>}/>
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
