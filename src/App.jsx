import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AuthPage from './Components/AuthPage';
import ProductListing from './Components/ProductListing/ProductListing';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // A wrapper to protect routes
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/auth" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/products" element={
          <PrivateRoute>
            <ProductListing />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
