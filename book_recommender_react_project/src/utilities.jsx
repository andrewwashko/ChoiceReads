import axios from 'axios'

/** User Authentication */
export const signUp = async (email, password) => {
  let response = await axios.post('/api/user_authentication/', {
    'email' : email,
    'password' : password
  })
  console.log(response.data.success)
  return response.data.success
}

export const signIn = async (email, password, setUser) => {
  let response = await axios.put('/api/user_authentication/', {
    'email' : email,
    'password' : password
  })
  setUser(response.data)
  // console.log(response.data.sign_in)
  return response.data.sign_in
}

export const currentUser = async () => {
  let response = await axios.get('api/user_authentication/')
  return response.data
}

export const signOut = async () => {
  let response = await axios.post('api/user_authentication/')
  if (response.data.logout) {
    setUser(null)
}
};

/** OpenAI API */
export const recommendations = async (quote, user_email) => {
  try {
    let response = await axios.post('/api/user_recommendation/', {
      "quote" : quote,
      "user_email" : user_email
    })
    // console.log(response.data)
    return response
  } 
  catch (error) {
    console.log(error)
  } 
}

/** Grabbing DB data for FE */
export const getRecHistory = async (user_email) => {
  try {
    const response = await axios.get('/api/user_recommendation/', {
      params: {
        "user_email": user_email
      }
    });
    // console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error)
  } 
};

/** Deleting a recommendation */
export const deleteRecommendation = async (recommendation_pk) => {
  console.log(recommendation_pk)
  const response = await axios.post('api/user_recommendation/', {
    "recommendation_pk" : recommendation_pk
  })
  // console.log(response.data)
  return response.data;
}

/** Deleting a quote */
export const deleteQuote = async (quote_pk) => {
  const response = await axios.post('api/user_recommendation/', {
    "quote_pk": quote_pk,
  });
  return response.data
};


