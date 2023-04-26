import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getRecHistory, deleteRecommendation, deleteQuote } from '../utilities';
import Accordion from 'react-bootstrap/Accordion';


export const ReccHistory = ({ user, update, triggerUpdate }) => {
  // user is passed down as a prop, because even though useContext was working as expected (i.e. correct recs were shown) it was giving 500 errors. User as a prop does the same without the errors.
  // const { user } = useContext(UserContext)
  const [quotesData, setQuotesData] = useState([])
  const [loading, setLoading] = useState(true)


  const handleDelete = async (recommendation_pk, quoteData) => {
    if (quoteData.recommendations.length === 1) {
      await deleteQuote(quoteData.quote.pk);
    }
    
    await deleteRecommendation(recommendation_pk)
    triggerUpdate()
  }
  
  useEffect(() => {
    const fetch_rec_history = async () => {
      // will not run before user is passed down as context
      if (user) {
        const data = await getRecHistory(user.email)
        setQuotesData(data.history)
        // setLoading(false)
      }
    }
    fetch_rec_history()
  }, [user, update])

  return (
    <Accordion defaultActiveKey="0">
      {quotesData?.map((quoteData, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header>
            <h2>
             {quoteData.quote.quote_text} 
            </h2>
            <p>
              {quoteData.quote.created_at}
            </p>
          </Accordion.Header>
          <Accordion.Body>
            {quoteData.recommendations.map((recommendation, recIndex) => (
              <div key={recIndex} className="rec_box mb-3">
                <h5>{recommendation.title}</h5>
                <p>
                  <strong>Author:</strong> {recommendation.author}
                </p>
                <p>
                  <strong>Date Published:</strong> {recommendation.date_published}
                </p>
                <p>
                  <strong>Summary:</strong> {recommendation.summary}
                </p>
                <p>
                  <strong>Google Books Link:</strong>{" "}
                  <a
                    href={recommendation.google_books_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {recommendation.google_books_link}
                  </a>
                  <button onClick={() => handleDelete(recommendation.pk, quoteData)}>Delete</button>
                </p>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
  
}
  