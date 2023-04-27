import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { SignIn } from '../components/SignIn'
import { SignUp } from '../components/SignUp'

export const AuthPage = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const toggleComponent = () => {
    setShowSignIn((prevState) => !prevState);
  };

  return (
    <div className='auth_container'>
      <div className='auth_box'>
        {showSignIn ? <SignIn /> : <SignUp />}
        <span style={{ marginTop: "10px" }}>
          {showSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button class="btn btn-secondary" onClick={toggleComponent}>
            {showSignIn ? "Sign Up" : "Sign In"}
          </button>
        </span>
      </div>
    </div>
  );
};