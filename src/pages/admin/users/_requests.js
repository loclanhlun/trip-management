import apiClient from '../../../axiosClient'
const GET_USERS_URL = '/users/filter'
const GET_USER_INFOR_URL = '/users/info'
const GET_USER_BY_ID = '/users/'
const UPDATE_DELETE_ADD_USER_BY_ID_URL = '/users'

export const getUsers = (page, size) => {
  return apiClient.post(`${GET_USERS_URL}?page=${+page - 1}&size=${size}`)
}

export const getUserInfo = () => {
  return apiClient.get(GET_USER_INFOR_URL)
}

export const updateUserByID = (id, payload) => {
  return apiClient.post(`${UPDATE_DELETE_ADD_USER_BY_ID_URL}/${id}`, payload)
}

export const deleteUserById = (id) => {
  return apiClient.delete(`${UPDATE_DELETE_ADD_USER_BY_ID_URL}/${id}`)
}

export const addUser = (payload) => {
  return apiClient.post(UPDATE_DELETE_ADD_USER_BY_ID_URL, payload)
}
