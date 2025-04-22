import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";

export default function Login() {
  const { state, signIn, signOut } = useAuthContext();

  const isLoggedIn = state?.isAuthenticated;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">
        {isLoggedIn ? "You are logged in!" : "Welcome to Roulette"}
      </h1>

      {isLoggedIn ? (
        <>
          <p className="mb-4">Email: {state.email}</p>
          <button
            onClick={signOut}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={signIn}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login with Asgardeo
        </button>
      )}
    </div>
  );
}
