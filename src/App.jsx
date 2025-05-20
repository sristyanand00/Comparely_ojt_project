// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from './Components/LandingPage';
// import AuthPage from './Components/AuthPage';
// import ProductListing from './Components/ProductListing/ProductListing';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';




// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   // A wrapper to protect routes
//   const PrivateRoute = ({ children }) => {
//     return user ? children : <Navigate to="/auth" />;
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/products" element={
//           <PrivateRoute>
//             <ProductListing />
//           </PrivateRoute>
//         } />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import LandingPage from './Components/LandingPage';
// import AuthPage from './Components/AuthPage';
// import ProductListing from './Components/ProductListing/ProductListing';
// import ProductComparison from './Components/ProductComparison/ProductComparison'; // New import
// import PriceComparisonTable from './Components/PriceComparison/PriceComparisonTable';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Protected Route wrapper (preserved exactly as you had it)
//   const PrivateRoute = ({ children }) => {
//     if (loading) return <div className="loading">Loading...</div>;
//     return user ? children : <Navigate to="/auth" />;
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Preserved existing routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/auth" element={<AuthPage />} />
        
//         {/* Existing protected route */}
//         <Route path="/products" element={
//           <PrivateRoute>
//             <ProductListing />
//           </PrivateRoute>
//         } />
        
//         {/* New product comparison route */}
//         <Route path="/compare" element={
//           <PrivateRoute>
//             <ProductComparison />
//           </PrivateRoute>
//         } />
        
//         {/* Preserved catch-all route */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import LandingPage from './Components/LandingPage';
// import AuthPage from './Components/AuthPage';
// import ProductListing from './Components/ProductListing/ProductListing';
// import PriceComparisonTable from './Components/PriceComparison/PriceComparisonTable'; // Updated import
// import './App.css'; // Ensure you have basic styles

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const PrivateRoute = ({ children }) => {
//     if (loading) return <div className="auth-loading">Loading user session...</div>;
//     return user ? children : <Navigate to="/auth" />;
//   };

//   return (
//     <Router>
//       <div className="app-container">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/auth" element={<AuthPage />} />
          
//           {/* Protected Routes */}
//           <Route path="/products" element={
//             <PrivateRoute>
//               <ProductListing />
//             </PrivateRoute>
//           } />
          
//           {/* Price Comparison Route */}
//           <Route path="/compare" element={
//             <PrivateRoute>
//               <div className="comparison-page">
//                 <h1>Price Comparison Dashboard</h1>
//                 <PriceComparisonTable />
//               </div>
//             </PrivateRoute>
//           } />
          
//           {/* 404 Redirect */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


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




