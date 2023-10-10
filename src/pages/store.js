import { defineStore } from 'pinia'
import { getFavorites, getRecommentTours } from './_request'
export const useFavoritesStore = defineStore('favorite-store', {
  state: () => ({
    favoritesState: { isLoading: false, data: [], error: null }
  }),
  actions: {
    async getFavorites() {
      this.favoritesState = {
        ...this.favoritesState,
        isLoading: true
      }
      try {
        const response = await getFavorites()
        this.favoritesState = {
          isLoading: false,
          data: response.data,
          error: null
        }
      } catch (error) {
        console.log(error)
        this.favoritesState = {
          isLoading: false,
          data: [],
          error: error.message
        }
      }
    }
  }
})

export const useRecommentToursStore = defineStore('recomment-tours-store', {
  state: () => ({
    recommentToursState: { isLoading: false, data: [], error: null }
  }),
  actions: {
    async getRecommentTours() {
      this.recommentToursState = {
        ...this.recommentToursState,
        isLoading: true
      }
      try {
        const response = await getRecommentTours()
        this.recommentToursState = {
          isLoading: false,
          data: response.data,
          error: null
        }
      } catch (error) {
        console.log(error)
        this.recommentToursState = {
          isLoading: false,
          data: [],
          error: error.message
        }
      }
    }
  }
})
