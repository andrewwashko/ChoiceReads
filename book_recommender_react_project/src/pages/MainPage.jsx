import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { SignOutBar } from '../components/SignOutBar'

export const MainPage = () => {
  const { user, setUser } = useContext(UserContext);
  
  return (
    <>
      <SignOutBar />
      <div>
        <h1>This will be the main page.</h1>
        <h1>User: {user?.email}</h1>
      </div>
    </>
  )  
}