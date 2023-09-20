import apiClient from '../../../axiosClient'
const GET_TOURS = '/tours/filter'
const ADD_UPDATE_DELETE_GET_TOUR_URL = '/tours'

export const getTours = (page, size) => {
  return apiClient.get(`${GET_TOURS}?page=${page}&size=${size}`)
}

export const updateTourById = (id, payload) => {
  return apiClient.put(`${ADD_UPDATE_DELETE_GET_TOUR_URL}/${id}`, payload)
}

export const addTour = (payload) => {
  return apiClient.post(ADD_UPDATE_DELETE_GET_TOUR_URL, payload)
}

export const deleteTourById = (id) => {
  return apiClient.delete(`${ADD_UPDATE_DELETE_GET_TOUR_URL}/${id}`)
}

export const getTourById = (id) => {
  return apiClient.get(`${ADD_UPDATE_DELETE_GET_TOUR_URL}/${id}`)
}
