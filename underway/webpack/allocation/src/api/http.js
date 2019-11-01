let host = 'http://localhost:9999'
if (!IS_DEV) {
  host = 'http://csnn.com'
}

let url = host + '/api/v1/getUser'

import axios from 'axios'

export const getUser = () => axios.get(url)
