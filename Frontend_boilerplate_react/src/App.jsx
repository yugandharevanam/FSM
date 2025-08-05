import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Import components
import Layout from "./components/Layout/Layout";
import AppRoutes from "./routes";
import LoginScreen from "./components/Pages/LoginScreen";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Mock user data
  const user = {
    name: "John Smith",
    role: "Senior Technician",
    id: "TECH001",
    avatar: null
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <LoginScreen onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <AppRoutes user={user} onLogout={handleLogout} />
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
