import apiClient from './axiosClient.js'
apiClient.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(window.localStorage.getItem('userData'))
    if (userData) {
      config.headers.Authorization = `Bearer ${userData.accessToken}`
    }

    return config
  },
  (err) => Promise.reject(err)
)
