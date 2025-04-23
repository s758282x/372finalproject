import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.isAuthenticated) {
      navigate("/dashboard"); // or wherever you want to send them
    }
  }, [state, navigate]);

  return <div className="text-white p-4">Logging you in...</div>;
}
