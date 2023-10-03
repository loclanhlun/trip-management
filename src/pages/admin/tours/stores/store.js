import { defineStore } from 'pinia'
import {
  addTour,
  deleteTourById,
  getTourById,
  getTours,
  updateTourById,
  addCommentByTourId,
  addWhiteList,
  addRatingByTourId,
  getRatingByTourId
} from '../_requests'

export const useToursStore = defineStore('tours-store', {
  state: () => ({
    toursState: { isLoading: false, data: {}, error: null },
    deleteTourByIdState: { isLoading: false, data: false },
    updateTourByIdState: { isLoading: false, data: false },
    addTourState: { isLoading: false, data: false },
    getTourByIdState: { isLoading: false, data: {}, error: null },
    addCommentByTourIdState: { isLoading: false, data: {}, error: null },
    addWhiteListState: { isLoading: false, data: {}, error: null },
    addRatingTourById: { isLoading: false, data: {}, error: null },
    getRatingByTourIdState: { isLoading: false, data: {}, error: null }
  }),
  actions: {
    async getTours(page, size, payload) {
      this.toursState = {
        ...this.toursState,
        isLoading: true
      }
      try {
        const response = await getTours(page, size, payload)
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
    },
    async getTourById(id) {
      this.getTourByIdState = {
        ...this.getTourByIdState,
        isLoading: true
      }
      try {
        const response = await getTourById(id)
        this.getTourByIdState = {
          data: response.data,
          isLoading: false
        }
      } catch (error) {
        console.log(error)
        this.getTourByIdState = {
          ...this.getTourByIdState,
          isLoading: false
        }
      }
    },
    async addCommentByTourId(id, payload) {
      this.addCommentByTourIdState = {
        ...this.addCommentByTourIdState,
        isLoading: true
      }
      try {
        const response = await addCommentByTourId(id, payload)
        this.addCommentByTourIdState = {
          data: response.data,
          isLoading: false
        }
      } catch (error) {
        console.log(error)
        this.addCommentByTourIdState = {
          ...this.addCommentByTourIdState,
          isLoading: false
        }
      }
    },
    async addWhiteList(id) {
      this.addWhiteListState = {
        ...this.addWhiteListState,
        isLoading: true
      }
      try {
        const response = await addWhiteList(id)
        this.addWhiteListState = {
          data: response.data,
          isLoading: false
        }
      } catch (error) {
        console.log(error)
        this.addWhiteListState = {
          ...this.addWhiteListState,
          isLoading: false
        }
      }
    },
    async addRatingByTourId(id, payload) {
      this.addRatingTourByIdState = {
        ...this.addRatingTourByIdState,
        isLoading: true
      }
      try {
        const response = await addRatingByTourId(id, payload)
        this.addRatingTourByIdState = {
          data: response.data,
          isLoading: false
        }
      } catch (error) {
        console.log(error)
        this.addRatingTourByIdState = {
          ...this.addRatingTourByIdState,
          isLoading: false
        }
      }
    },
    async getRatingByTourId(id) {
      this.getRatingByTourIdState = {
        ...this.getRatingByTourIdState,
        isLoading: true
      }
      try {
        const response = await getRatingByTourId(id)
        this.getRatingByTourIdState = {
          data: response.data,
          isLoading: false
        }
      } catch (error) {
        console.log(error)
        this.getRatingByTourIdState = {
          ...this.getRatingByTourIdState,
          isLoading: false
        }
      }
    }
  }
})
