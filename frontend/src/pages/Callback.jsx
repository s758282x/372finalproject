import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const { signIn, state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // First complete the authentication
    signIn()
      .then(() => {
        // After successful sign-in, redirect
        if (state?.isAuthenticated) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  }, []);

  return <div className="text-white p-4">Logging you in...</div>;
}
