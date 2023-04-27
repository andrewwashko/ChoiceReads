import React, { useContext, useState, useEffect, Fragment } from 'react';
import { UserContext } from '../contexts/UserContext';
import { SignOutBar } from '../components/SignOutBar';
import { recommendations } from '../utilities';
import { ReccHistory } from '../components/ReccHistory';
import Typewriter from 'typewriter-effect';
import Spinner from 'react-bootstrap/Spinner';

export const MainPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [result, setResult] = useState('');
  const [quote, setQuote] = useState('');
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerUpdate = () => {
    setUpdate((prevUpdate) => !prevUpdate);
  };

  const formatRecs = (str) => {
    if (str) {
      return str.split('\n').join('<br/>');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await recommendations(quote, user.email);
    setResult(result.data);
    setLoading(false);
    triggerUpdate();
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
        {loading ? (
          <div className="spinner_container">
            <Spinner animation="border" role="status" className='custom_spinner'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : result ? (
          <div className='rec_display'>
            <Typewriter
              options={{
                strings: [formatRecs(result.data)],
                autoStart: true,
                loop: true,
                delay: 10,
                cursor: '',
                html: false,
                deleteSpeed: 1000000000,
              }}
            />
          </div>
        ) : null}
      </div>
      <ReccHistory user={user} update={update} triggerUpdate={triggerUpdate} />
    </>
  );
};
