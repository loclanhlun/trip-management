import apiClient from '../axiosClient'
const GET_WHITE_LIST = '/white-list'

export const getWhiteList = () => {
  return apiClient.get(GET_WHITE_LIST)
}
