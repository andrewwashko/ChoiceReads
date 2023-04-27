import React, { useContext, useState, useEffect, Fragment } from 'react';
import { UserContext } from '../contexts/UserContext';
import { SignOutBar } from '../components/SignOutBar'
import { recommendations } from '../utilities';
import { ReccHistory } from '../components/ReccHistory';
import Typewriter from 'typewriter-effect';

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
    if (str) {
      return str.split('\n').join('<br/>');
    }
  };

  return (
    <>
      <SignOutBar />
      <div className='quote_input'>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Enter quote..." 
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />
        </form>
        {result && (
        <div className='rec_display'>
          <Typewriter
            options={{
              strings: [formatRecs(result.data)],
              autoStart: true,
              loop: true,
              delay: 10,
              cursor: "",
              html: false,
              deleteSpeed: 1000000000,
            }}
          />
        </div>
      )}
      </div>
      <ReccHistory user = {user} update={update} triggerUpdate={triggerUpdate}/>
    </>
  )  
}