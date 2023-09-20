import { defineStore } from 'pinia'
import { getReviews, changeStatusReviewById, deleteReviewById } from '../_requests'
export const useReviewStore = defineStore('reviews-store', {
  state: () => ({
    reviewsState: { isLoading: false, data: {}, error: null },
    changeStatusReviewState: { isLoading: false, data: {}, error: null },
    deleteReviewState: { isLoading: false, data: {}, error: null }
  }),
  actions: {
    async getReviews(page, size) {
      this.reviewsState = {
        ...this.reviewsState,
        isLoading: true
      }
      try {
        const response = await getReviews(page - 1, size)
        this.reviewsState = {
          ...this.reviewsState,
          isLoading: false,
          data: response.data
        }
      } catch (error) {
        console.log(error)
        this.reviewsState = {
          ...this.reviewsState,
          isLoading: false,
          error: 'error'
        }
      }
    },
    async changeStatusReviewById(id) {
      this.changeStatusReviewState = {
        ...this.changeStatusReviewState,
        isLoading: true
      }
      try {
        const response = await changeStatusReviewById(id)
        this.changeStatusReviewState = {
          ...this.changeStatusReviewState,
          isLoading: false,
          data: response.data
        }
      } catch (error) {
        console.log(error)
        this.changeStatusReviewState = {
          ...this.changeStatusReviewState,
          isLoading: false,
          error: 'error'
        }
      }
    },
    async deleteReviewById(id) {
      this.deleteReviewState = {
        ...this.deleteReviewState,
        isLoading: true
      }
      try {
        const response = await deleteReviewById(id)
        this.deleteReviewState = {
          ...this.deleteReviewState,
          isLoading: false,
          data: response.data
        }
      } catch (error) {
        console.log(error)
        this.deleteReviewState = {
          ...this.deleteReviewState,
          isLoading: false,
          error: 'error'
        }
      }
    }
  }
})
