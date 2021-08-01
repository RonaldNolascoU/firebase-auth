import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://us-central1-plaid-7344d.cloudfunctions.net',
    headers: {
      'Content-type': 'application/json',
    },
  })
}
