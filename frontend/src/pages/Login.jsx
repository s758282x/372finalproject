import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import Navbar from "../components/Navbar"; // Ensure the correct path to Navbar

export default function Login() {
  const { state, signIn, signOut } = useAuthContext();

  const isLoggedIn = state?.isAuthenticated;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Place Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl font-bold mb-4">
          {isLoggedIn ? "You are logged in!" : "Welcome to Roulette"}
        </h1>

        {isLoggedIn ? (
          <>
            <p className="mb-4">
              Username: <span className="font-mono">{state.username}</span>
            </p>
            <button
              onClick={signOut}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              console.log("Login button clicked");
              signIn();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login with Asgardeo
          </button>
        )}
      </div>
    </div>
  );
}