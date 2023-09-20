import { defineStore } from 'pinia'
import { deleteUserById, getUsers, updateUserByID, addUser } from '../_requests'
export const useUsersStore = defineStore('users-store', {
  state: () => ({
    usersState: { isLoading: false, data: {}, error: null },
    userInfoState: { isLoading: false, data: {}, error: null },
    updateUserByIdState: { isLoading: false, data: false },
    deleteUserByIdState: { isLoading: false, data: false },
    addUserState: { isLoading: false, data: false }
  }),
  actions: {
    async getUsers(page, size) {
      this.usersState = {
        ...this.usersState,
        isLoading: true
      }
      try {
        const response = await getUsers(page, size)
        this.usersState = {
          isLoading: false,
          data: response.data,
          error: null
        }
      } catch (error) {
        console.log(error)
        this.usersState = {
          isLoading: false,
          data: {},
          error: error.message
        }
      }
    },
    async updateUserById(id, payload) {
      this.updateUserByIdState = {
        ...this.updateUserByIdState,
        isLoading: true
      }

      try {
        const response = await updateUserByID(id, payload)
        this.updateUserByIdState = {
          isLoading: false,
          data: response.data
        }
      } catch (error) {
        console.log(error)
        this.updateUserByIdState = {
          isLoading: false,
          data: false
        }
      }
    },
    async deleteUserById(id) {
      this.deleteUserByIdState = {
        ...this.deleteUserByIdState,
        isLoading: true
      }

      try {
        const response = await deleteUserById(id)
        this.deleteUserByIdState = {
          isLoading: false,
          data: response.data
        }
      } catch (error) {
        console.log(error)
        this.deleteUserByIdState = {
          isLoading: false,
          data: false
        }
      }
    },
    async addUser(payload) {
      this.addUserState = {
        ...this.addUserState,
        isLoading: true
      }

      try {
        const response = await addUser(payload)
        this.addUserState = {
          isLoading: false,
          data: response.data
        }
      } catch (error) {
        console.log(error)
        this.addUserState = {
          isLoading: false,
          data: false
        }
      }
    }
  }
})
