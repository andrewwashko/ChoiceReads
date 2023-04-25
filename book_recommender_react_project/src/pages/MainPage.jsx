import React, { useContext, useState, useEffect, Fragment } from 'react';
import { UserContext } from '../contexts/UserContext';
import { SignOutBar } from '../components/SignOutBar'
import { recommendations } from '../utilities';
import { ReccHistory } from '../components/ReccHistory';

export const MainPage = () => {
  const { user, setUser } = useContext(UserContext)
  const [result, setResult] = useState("")
  const [quote, setQuote] = useState("")
  const [update, setUpdate] = useState(false)

  const triggerUpdate = () => {
    setUpdate((prevUpdate) => !prevUpdate);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await recommendations(quote, user.email)
    setResult(result.data)
    triggerUpdate()
  }

  const formatRecs = (str) => {
    return str.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }


  return (
    <>
      <SignOutBar />
      <div>
        <h1>User: {user?.email}</h1>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Enter quote..." 
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
        </form>
        <p>{result && formatRecs(result.data)}</p>
      </div>
      <ReccHistory user = {user} update={update} triggerUpdate={triggerUpdate}/>
    </>
  )  
}