import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import ManagePlayers from './pages/ManagePlayers';
import AdminSpinHistory from "./pages/AdminSpinHistory";
import Callback from './pages/Callback';
import Profile from './pages/Profile';
import './App.css';
import React from 'react';
import ProtectedRoute from './components/ProtectedRoute'; 
import Blogs from './pages/Blogs'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-players"
        element={
          <ProtectedRoute>
            <ManagePlayers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/spins"
        element={
          <ProtectedRoute>
            <AdminSpinHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
