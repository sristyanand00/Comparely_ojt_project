import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AuthPage from './Components/AuthPage';
import ComparelyDashboard from './Components/ComparelyDashboard';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ProductListingPage from './Components/ProductListing/ProductListingPage';
import ProfilePage from "./Components/Profile/ProfilePage";
import CategoryPage from "./Components/CategoryPage";

function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/auth" replace />;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <ComparelyDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;