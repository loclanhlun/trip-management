import apiClient from '../axiosClient'
const GET_FAVORITES_URL = '/favorite'
const GET_RECOMMENT_TOURS = '/tours/recomment'

export const getFavorites = () => {
  return apiClient.get(GET_FAVORITES_URL)
}

export const getRecommentTours = () => {
  return apiClient.get(GET_RECOMMENT_TOURS)
}
