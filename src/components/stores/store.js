import { defineStore } from 'pinia'
import { getWhiteList } from '../_request'
export const useWhiteListStore = defineStore('white-list-store', {
  state: () => ({
    whiteListState: { isLoading: false, data: {}, error: null }
  }),
  actions: {
    async getWhiteList() {
      this.whiteListState = {
        ...this.whiteListState,
        isLoading: true
      }
      try {
        const response = await getWhiteList()
        this.whiteListState = {
          ...this.whiteListState,
          isLoading: false,
          data: response.data
        }
      } catch (error) {
        console.log(error)
        this.whiteListState = {
          ...this.whiteListState,
          isLoading: false,
          error: 'error'
        }
      }
    }
  }
})
