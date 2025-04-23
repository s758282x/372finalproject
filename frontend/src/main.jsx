import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@asgardeo/auth-react';
import { UserProvider } from './context/UserContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      config={{
        signInRedirectURL: "http://localhost:5173/",
        signOutRedirectURL: "http://localhost:5173/",
        clientID: "6qduOWvfDIUlDQWHOWOb9w27fl4a",
        baseUrl: "https://api.asgardeo.io/t/utmis372",
        scope: ["openid", "profile", "email"],
        enableIDTokenUserInfo: true
      }}
    >
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);



