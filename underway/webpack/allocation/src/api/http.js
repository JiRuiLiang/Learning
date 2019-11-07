let host = 'http://localhost:8080'
if (!IS_DEV) {
  host = 'http://csnn.com'
}

let url = '/api/getUserInfo'

import axios from 'axios'

export const getUser = () => axios.get(url)
