import { defineStore } from 'pinia'
import { addTour, deleteTourById, getTourById, getTours, updateTourById } from '../_requests'

export const useToursStore = defineStore('tours-store', {
  state: () => ({
    toursState: { isLoading: false, data: {}, error: null },
    deleteTourByIdState: { isLoading: false, data: false },
    updateTourByIdState: { isLoading: false, data: false },
    addTourState: { isLoading: false, data: false },
    getTourByIdState: { isLoading: false, data: {}, error: null }
  }),
  actions: {
    async getTours(page, size) {
      this.toursState = {
        ...this.toursState,
        isLoading: true
      }
      try {
        const response = await getTours(page, size)
        this.toursState = {
          data: response.data,
          isLoading: false,
          error: null
        }
      } catch (error) {
        console.log(error)
        this.toursState = {
          ...this.toursState,
          isLoading: false,
          error: 'error'
        }
      }
    },
    async addTour(payload) {
      this.addTourState = {
        ...this.addTourState,
        isLoading: true
      }
      try {
        const response = await addTour(payload)
        this.addTourState = {
          data: response.data,
          isLoading: false
        }
      } catch (error) {
        console.log(error)
        this.addTourState = {
          ...this.addTourState,
          isLoading: false
        }
      }
    },
    async updateTourById(id, payload) {
      this.updateTourByIdState = {
        ...this.updateTourByIdState,
        isLoading: true
      }
      try {
        const response = await updateTourById(id, payload)
        this.updateTourByIdState = {
          data: response.data,
          isLoading: false
        }
      } catch (error) {
        console.log(error)
        this.updateTourByIdState = {
          ...this.updateTourByIdState,
          isLoading: false
        }
      }
    },
    async deleteTourById(id) {
      this.deleteTourByIdState = {
        ...this.deleteTourByIdState,
        isLoading: true
      }
      try {
        const response = await deleteTourById(id)
        this.deleteTourByIdState = {
          data: response.data,
          isLoading: false
        }
      } catch (error) {
        console.log(error)
        this.deleteTourByIdState = {
          ...this.deleteTourByIdState,
          isLoading: false
        }
      }
    }
  }
})
