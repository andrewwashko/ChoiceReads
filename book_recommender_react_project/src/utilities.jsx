import axios from 'axios'

export const signUp = async (email, password) => {
  let response = await axios.post('/api/sign_up/', {
    'email' : email,
    'password' : password
  })
  console.log(response.data.success)
  return response.data.success
}

export const signIn = async (email, password, setUser) => {
  let response = await axios.post('/api/sign_in/', {
    'email' : email,
    'password' : password
  })
  setUser(response.data)
  // console.log(response.data.sign_in)
  return response.data.sign_in
}

export const currentUser = async () => {
  let response = await axios.get('/api/current_user/')
  console.log(response.data)
  return response.data
}

export const signOut = async () => {
  let response = await axios.post('/api/sign_out/')
  if (response.data.logout) {
    setUser(null)
}
};
