import './App.css'
import { useState, useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import { currentUser } from './utilities'
import { setCSRFToken } from './components/CSRFToken'
import { Outlet } from 'react-router-dom'


function App() {
  const [user, setUser] = useState(null)
  setCSRFToken()

  useEffect(() => {
    const get_current_user = async () => {
      setUser(await currentUser())
    };
    get_current_user()
  }, [])
  
  return (
    <div className="app_root">
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}


export default App
