import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://us-central1-plaid-7344d.cloudfunctions.net',
    // baseURL: 'http://localhost:5001/plaid-7344d/us-central1',
    headers: {
      'Content-type': 'application/json',
    },
  })
}
