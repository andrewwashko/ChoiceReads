import { useState, useEffect } from 'react';
import { getRecHistory, deleteRecommendation, deleteQuote } from '../utilities';
import Accordion from 'react-bootstrap/Accordion';


export const ReccHistory = ({ user, update, triggerUpdate }) => {
  // user is passed down as a prop, because even though useContext was working as expected (i.e. correct recs were shown) it was giving 500 errors. User as a prop does the same without the errors.
  const [quotesData, setQuotesData] = useState([])

  const handleDelete = async (recommendation_pk, quoteData) => {
    if (quoteData.recommendations.length === 1) {
      await deleteQuote(quoteData.quote.pk);
    }
    
    await deleteRecommendation(recommendation_pk)
    triggerUpdate()
  }
  
  useEffect(() => {
    const fetch_rec_history = async () => {
      if (user) {
        const data = await getRecHistory(user.email)
        setQuotesData(data.history)
      }
    }
    fetch_rec_history()
  }, [user, update])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  }

  return (
    <div className='accordion_container'>
    <Accordion defaultActiveKey="">
      {quotesData?.map((quoteData, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header>
            <div className='accordion_header_content'>
            <h4>
             "{quoteData.quote.quote_text}" 
            </h4>
            <p>
              Created on: {formatDate(quoteData.quote.created_at)}
            </p>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {quoteData.recommendations.map((recommendation, recIndex) => (
              <div key={recIndex} className="rec_box mb-3">
                <div className="rec_box_header">
                  <h5>{recommendation.title} ({recommendation.date_published})</h5>
                  <button className="btn btn-light" onClick={() => handleDelete(recommendation.pk, quoteData)}>Delete</button>
                </div>
                <p>
                  <strong>Author:</strong> {recommendation.author}
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
                </p>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
    </div>
  );
  
}
  