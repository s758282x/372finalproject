import React from 'react';
import Navbar from '../components/Navbar';

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar spans full width */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gray-100">
      <h1 className="title-h1">Login</h1>
      </div>
    </div>
  );
}