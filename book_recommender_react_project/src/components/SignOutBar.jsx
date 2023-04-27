import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { signOut } from '../utilities';
import { useNavigate } from "react-router-dom";

export const SignOutBar = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(setUser);
    navigate("/");
    
  };

  return (
    <div>
      <button class="btn btn-light" onClick={handleSignOut}>Sign out</button>
    </div>
  );
};
