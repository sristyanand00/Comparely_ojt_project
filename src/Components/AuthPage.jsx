import React, { useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path if needed

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, signInData.email, signInData.password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      // Optionally update the user's display name
      await updateProfile(userCredential.user, { displayName: signUpData.name });
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h2>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            required
            value={signInData.email}
            onChange={e => setSignInData({ ...signInData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={signInData.password}
            onChange={e => setSignInData({ ...signInData, password: e.target.value })}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            required
            value={signUpData.name}
            onChange={e => setSignUpData({ ...signUpData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={signUpData.email}
            onChange={e => setSignUpData({ ...signUpData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={signUpData.password}
            onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Toggle Container */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h2>Welcome Back!</h2>
            <p>To stay connected, please log in with your personal info</p>
            <button className="ghost" onClick={handleToggle}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h2>Hello, Friend!</h2>
            <p>Enter your details and start your journey with us</p>
            <button className="ghost" onClick={handleToggle}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;