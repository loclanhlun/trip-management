import apiClient from '../../../axiosClient'
const GET_TOURS = '/tours/filter'
const ADD_UPDATE_DELETE_GET_TOUR_URL = '/tours'
const ADD_COMMENT_URL = '/comment'
const ADD_WHITE_LIST_URL = '/white-list'
const ADD_RATING_URL = '/rating'

export const getTours = (page, size, payload) => {
  return apiClient.post(`${GET_TOURS}?page=${page}&size=${size}`, payload)
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

export const addCommentByTourId = (id, payload) => {
  return apiClient.post(`${ADD_COMMENT_URL}/${id}`, payload)
}

export const addWhiteList = (id) => {
  return apiClient.post(`${ADD_WHITE_LIST_URL}/${id}`)
}

export const addRatingByTourId = (id, payload) => {
  return apiClient.post(`${ADD_RATING_URL}/${id}`, payload)
}

export const getRatingByTourId = (id) => {
  return apiClient.get(`${ADD_RATING_URL}/${id}`)
}
