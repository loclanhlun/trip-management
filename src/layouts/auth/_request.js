import apiClient from '../../axiosClient'
const SIGNIN_URL = '/api/auth/signin'
const SIGNUP_URL = '/api/auth/signup'

export const signin = (payload) => {
  return apiClient.post(SIGNIN_URL, payload)
}

export const signup = (payload) => {
  return apiClient.post(SIGNUP_URL, payload)
}
