import apiClient from '../../../axiosClient'
const GET_ADD_UPDATE_DELETE_REVIEWS_URL = '/reviews'
const CHANGE_STATUS_REVIEW_URL = '/reviews/change-status'

export const getReviews = (page, size) => {
  return apiClient.get(`${GET_ADD_UPDATE_DELETE_REVIEWS_URL}?page=${page}&size=${size}`)
}

export const changeStatusReviewById = (id) => {
  return apiClient.put(`${CHANGE_STATUS_REVIEW_URL}/${id}`)
}

export const deleteReviewById = (id) => {
  return apiClient.delete(`${GET_ADD_UPDATE_DELETE_REVIEWS_URL}/${id}`)
}
