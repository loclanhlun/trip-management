import { defineStore } from 'pinia'
import { signin, signup } from './_request'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authState: {
        isLoading: false,
        data: JSON.parse(window.localStorage.getItem('userData')),
        error: null
      },
      signupState: {
        isLoading: false,
        message: null
      }
    }
  },
  actions: {
    async signin(payload) {
      this.authState = {
        ...this.authState,
        isLoading: true,
        error: null
      }
      try {
        const response = await signin(payload)

        if (response.error) {
          this.authState = {
            ...this.authState,
            isLoading: false,
            error: 'Invalid Username or Password'
          }
        } else {
          window.localStorage.setItem('userData', JSON.stringify(response.data))
          this.authState = {
            isLoading: false,
            data: response.data,
            error: null
          }
        }
      } catch (error) {
        console.log(error)
        this.authState = {
          ...this.authState,
          isLoading: false,
          error: 'Error'
        }
      }
    },

    async signup(payload) {
      this.signupState = {
        isLoading: true,
        message: null
      }

      try {
        const response = await signup(payload)
        console.log(response)
        this.signupState = {
          ...this.signupState,
          isLoading: false,
          message: response.data.message
        }
      } catch (error) {
        console.log(error)
        this.signupState = {
          ...this.signupState,
          isLoading: false,
          message: 'Tên Người dùng hoặc Email đã tồn tại!'
        }
      }
    },
    logout() {
      this.authState = {
        data: null,
        isLoading: false,
        error: null
      }
      window.localStorage.removeItem('userData')
    }
  }
})
