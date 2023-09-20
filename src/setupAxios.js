import apiClient from './axiosClient.js'
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (err) => Promise.reject(err)
)
