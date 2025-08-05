import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Import components
import Layout from "./components/Layout/Layout";
import AppRoutes from "./routes";
import LoginScreen from "./components/Pages/LoginScreen";
import SafeAreaView from "./components/SafeAreaView";
import { ThemeProvider } from "./context/ThemeContext";
import preventZoom from "./utils/preventZoom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Prevent zooming and double-tap gestures on mobile
  useEffect(() => {
    preventZoom();
  }, []);

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
        <SafeAreaView 
          fullScreen={true} // Full-screen mode for login
          style={{
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <LoginScreen onLogin={handleLogin} />
        </SafeAreaView>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SafeAreaView 
        excludeBottom={true} // Exclude bottom padding since TabBar handles it
        style={{
          backgroundColor: '#1a1a1a',
          color: '#ffffff'
        }}
      >
        <Router>
          <Layout>
            <AppRoutes user={user} onLogout={handleLogout} />
          </Layout>
        </Router>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
