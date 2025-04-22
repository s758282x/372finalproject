import React from 'react';
import Navbar from '../components/Navbar';

export default function ManagePlayers() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar spans full width */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="title-h1">Manage Players</h1>
        <iframe
          className="w-full max-w-4xl h-[700px] rounded shadow-lg"
          frameBorder="0"
          allow="clipboard-write; camera; geolocation; fullscreen"
          src="https://testtable.budibase.app/embed/usertable"
          title="User Table"
        ></iframe>
      </div>
    </div>
  );
}