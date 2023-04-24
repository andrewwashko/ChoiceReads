import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getRecHistory } from '../utilities';

export const ReccHistory = () => {
  const { user } = useContext(UserContext)
  const [quotesData, setQuotesData] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetch_rec_history = async () => {
      if (user) {
        const data = await getRecHistory(user.email)
        console.log('Fetched data:', data)
        setQuotesData(data)
        setLoading(false)
      }
    };

    fetch_rec_history();
  }, [user]);

  return (
    <>
    <div>{quotesData?.history?.[0]?.quote?.quote_text}
    </div>
    </>
  );
}
  