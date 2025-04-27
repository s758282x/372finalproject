import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

const UserContext = createContext();

// ✅ Local API_URL defined at top
const API_URL = process.env.NODE_ENV === "production"
  ? "https://finalback-ejdffjg2fjgedkde.centralus-01.azurewebsites.net/api"
  : "http://localhost:5001/api";

export function UserProvider({ children }) {
  const { state } = useAuthContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      console.log("🔄 Auth state:", state);

      if (state?.isAuthenticated && state?.username) {
        try {
          const res = await fetch(`${API_URL}/auth/sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: state.username,
              name: state.displayName || "New User",
            }),
          });

          const data = await res.json();
          console.log("✅ User synced:", data);
          setUser(data);
        } catch (err) {
          console.error("❌ Error syncing user:", err);
        }
      } else {
        console.warn("⚠️ Not authenticated or missing username. Skipping sync.");
      }
    };

    syncUser();
  }, [state]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
