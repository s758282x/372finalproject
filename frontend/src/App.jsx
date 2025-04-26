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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/manage-players" element={<ManagePlayers />} />
      <Route path="/admin/spins" element={<AdminSpinHistory />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}

export default App;
