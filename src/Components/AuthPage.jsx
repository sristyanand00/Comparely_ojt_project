import React, { useState, useEffect } from 'react';
import './AuthPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../firebase";
import { useNavigate, useLocation, Link } from 'react-router-dom';

const AuthPage = () => {
  const [isActive, setIsActive] = useState(false); // false = Sign In, true = Sign Up
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/dashboard";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'signup') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password, name } = signUpData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert("Sign up successful!");
      navigate(redirectTo);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = signInData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Sign in successful!");
      navigate(redirectTo);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`}>
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h1 className="form-heading">Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={signUpData.name}
            onChange={e => setSignUpData({ ...signUpData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={e => setSignUpData({ ...signUpData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h1 className="form-heading">Sign In</h1>
          <span>or use your email password</span>
          <input
            type="email"
            placeholder="Email"
            value={signInData.email}
            onChange={e => setSignInData({ ...signInData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signInData.password}
            onChange={e => setSignInData({ ...signInData, password: e.target.value })}
            required
          />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Switch Links */}
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <span>
          {isActive ? (
            <>Already have an account? <Link to="/auth?mode=signin">Sign In</Link></>
          ) : (
            <>Don't have an account? <Link to="/auth?mode=signup">Sign Up</Link></>
          )}
        </span>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;