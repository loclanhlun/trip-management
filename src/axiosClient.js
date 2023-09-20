import axios from 'axios'
const BASE_URL = 'https://trip-project.up.railway.app'
const STATUS_CODE_LIST = [200, 400, 403, 500]

const apiClient = axios.create({
  baseURL: BASE_URL,
  validateStatus: function (status) {
    return STATUS_CODE_LIST.includes(status)
  }
})

export default apiClient
