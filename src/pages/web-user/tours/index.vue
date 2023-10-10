<template>
  <div class="containter-fuild">
    <div class="row flex-nowrap justify-content-center">
      <div class="custom-body">
        <div class="d-flex p-2 bg-white rounded-pill my-3 align-items-center">
          <i class="bi bi-search px-2" style="font-size: 24px"></i>
          <a-input type="text" v-model:value="payloadSearch.searchKey" placeholder="Nhập để tìm kiếm" class="custom-input" />
          <button class="btn btn-primary custom-button" type="button" @click="onSubmit">Search</button>
        </div>
        <h2 v-if="recommentToursState.data.length > 0">Những Tour được gợi ý cho bạn</h2>
        <div v-if="recommentToursState.data.length > 0">
          <div v-if="recommentToursState.isLoading" class="d-flex justify-content-center">
            <a-spin size="large" v-if="recommentToursState.isLoading" />
          </div>
          <ul v-else class="list-container row p-0">
            <li
              class="col-12 col-sm-6 col-md-4 col-lg-4 gap-1 position-relative"
              style="cursor: pointer"
              v-for="(item, index) in recommentToursState.data"
              :key="index"
            >
              <div @click="showTourDetailModal(item.id)" class="d-flex flex-column border my-2 rounded-2 shadow-sm" style="background-color: white">
                <div class="image-container">
                  <img :src="item.img" class="image" />
                </div>
                <div class="d-flex flex-column p-4 pt-2 hover">
                  <p class="my-1 title">{{ item.name }}</p>
                  <p class="my-1 description">{{ item.description }}</p>
                  <p class="my-1 duration">{{ item.duration }}</p>
                </div>
              </div>
              <div style="z-index: 1" class="position-absolute top-0 end-0 py-3 px-4" @click="addFavorite(item.id)">
                <i class="bi bi-heart" style="font-size: 20px; color: white"></i>
              </div>
            </li>
          </ul>
        </div>
        <h2>Danh sách Tour</h2>
        <div v-if="toursState.isLoading" class="d-flex justify-content-center">
          <a-spin size="large" v-if="toursState.isLoading" />
        </div>
        <ul v-else class="list-container row p-0">
          <li
            class="col-12 col-sm-6 col-md-4 col-lg-4 gap-1 position-relative"
            style="cursor: pointer"
            v-for="(item, index) in toursState.data.content"
            :key="index"
          >
            <div @click="showTourDetailModal(item.id)" class="d-flex flex-column border my-2 rounded-2 shadow-sm" style="background-color: white">
              <div class="image-container">
                <img :src="item.img" class="image" />
              </div>
              <div class="d-flex flex-column p-4 pt-2 hover">
                <p class="my-1 title">{{ item.name }}</p>
                <p class="my-1 description">{{ item.description }}</p>
                <p class="my-1 duration">{{ item.duration }}</p>
              </div>
            </div>
            <div style="z-index: 1" class="position-absolute top-0 end-0 py-3 px-4" @click="addFavorite(item.id)">
              <i class="bi bi-heart" style="font-size: 20px; color: white"></i>
            </div>
          </li>
        </ul>
        <div class="d-flex justify-content-center mt-2 py-2">
          <a-pagination show-size-changer v-model:current="current" v-model:pageSize="pageSize" :total="toursState.data.totalElements" />
        </div>
      </div>
      <a-modal :open="open" title="Thông báo" @ok="handleOk">
        <p>Bạn cần phải đăng nhập để sử dụng chức năng này!</p>
      </a-modal>

      <a-modal :open="openTourDetailModal" width="1000px" :footer="null" title="Thông tin chi tiết" @cancel="closeTourDetailModal">
        <a-spin v-if="getTourByIdState.isLoading" size="small" />
        <div v-else class="d-flex flex-column">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column align-items-start my-1">
              <span>{{ getTourByIdState.data.type }}</span>
              <h2>{{ getTourByIdState.data.name }}: {{ getTourByIdState.data.description }}</h2>
              <div class="d-flex align-items-center">
                <a-rate style="font-size: 14px; margin-top: -2px" disabled :value="getRatingByTourIdState.data.avgRating" allow-half />
                <span
                  >{{ (Math.round(getRatingByTourIdState.data.avgRating * 100) / 100).toFixed(1) }}/5 ({{
                    getRatingByTourIdState.data.ratings.length
                  }}
                  đánh giá)</span
                >
              </div>
            </div>
            <div class="d-flex flex-column justify-content-around my-2">
              <h4>Giá: {{ getTourByIdState.data.price }}/Người</h4>
              <button class="btn btn-primary custom-button" type="button">Đặt tour ngay</button>
            </div>
          </div>
          <div class="position-relative d-flex flex-column">
            <img :src="getTourByIdState.data.img" class="image-detail" />
            <button
              @click="addFavorite(getTourByIdState.data.id)"
              class="btn btn-primary position-absolute top-0 end-0 m-2"
              style="background-color: white; color: #000"
              type="button"
            >
              Thêm vào danh sách yêu thích
            </button>
          </div>
          <h4 class="my-2">Bình Luận</h4>
          <ul class="list-container m-0 p-0">
            <li v-for="(item, index) in getTourByIdState.data.comment" :key="index" class="d-flex flex-column card p-2 my-2">
              <div class="d-flex align-items-center">
                <img src="../../../assets/avatar.png" class="avatar" />
                <div class="d-flex flex-column mx-2">
                  <span>{{ item.username }}</span>
                </div>
              </div>
              <span>{{ item.content }} </span>
            </li>
          </ul>
          <div class="d-flex flex-column">
            <a-textarea v-model:value="payloadComment.content" placeholder="Nhập bình luận của bạn ở đây" class="custom-input border p-2 my-2" />
            <div class="d-flex align-items-center">
              <span>Đánh giá: </span><a-rate style="font-size: 18px; margin-top: -2px" v-model:value="payloadRating.rating" allow-half />
            </div>
            <button
              :disabled="payloadComment.content.length === 0 || payloadRating.rating === 0 || addCommentByTourIdState.isLoading"
              class="btn btn-primary"
              @click="addComment(getTourByIdState.data.id)"
              type="button"
            >
              {{ addCommentByTourIdState.isLoading ? 'Đang gửi' : 'Gửi' }}<a-spin v-if="addCommentByTourIdState.isLoading" size="small" />
            </button>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, reactive, onMounted } from 'vue'
import { useToursStore } from '../../admin/tours/stores/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../layouts/auth/store'
import { useRecommentToursStore } from '../../store'
export default defineComponent({
  setup() {
    const toursStore = useToursStore()
    const authStore = useAuthStore()
    const recommentToursStore = useRecommentToursStore()
    const value = ref(2.5)
    const current = ref(1)
    const pageSize = ref(10)

    const payloadSearch = reactive({
      searchKey: ''
    })

    const getInitialValues = () => ({
      content: ''
    })

    const getInitialValuesRating = () => ({
      rating: 0
    })

    const payloadComment = reactive(getInitialValues())
    const payloadRating = reactive(getInitialValuesRating())

    const resetForm = (form, initialValue) => {
      Object.assign(form, initialValue())
    }

    const router = useRouter()
    const open = ref(false)
    const openTourDetailModal = ref(false)

    const getRatingByTourId = (id) => {
      toursStore.getRatingByTourId(id)
    }

    const showTourDetailModal = (id) => {
      toursStore.getTourById(id)
      getRatingByTourId(id)
      openTourDetailModal.value = true
    }

    const closeTourDetailModal = () => {
      openTourDetailModal.value = false
    }

    const getTours = async () => {
      await toursStore.getTours(0, 10, payloadSearch)
    }

    const callRecommentTours = async () => {
      await recommentToursStore.getRecommentTours()
    }

    const handleOk = () => {
      router.push('/login')
    }

    const addFavorite = async (id) => {
      if (authStore.authState.data && authStore.authState.data.accessToken) {
        await toursStore.addWhiteList(id)
      } else {
        open.value = true
      }
    }

    const onSubmit = () => {
      toursStore.getTours(current.value - 1, pageSize.value, payloadSearch)
    }

    const addComment = async (id) => {
      if (authStore.authState.data && authStore.authState.data.accessToken) {
        await toursStore.addCommentByTourId(id, payloadComment)
        toursStore.addRatingByTourId(id, payloadRating)
        toursStore.getTourById(id)
        getRatingByTourId(id)
        resetForm(payloadComment, getInitialValues)
        resetForm(payloadRating, getInitialValuesRating)
      } else {
        open.value = true
      }
    }

    watch(pageSize, () => {
      getTours()
    })

    watch(current, () => {
      getTours()
    })

    onMounted(callRecommentTours)
    onMounted(getTours)
    return {
      value,
      current,
      open,
      pageSize,
      payloadSearch,
      openTourDetailModal,
      payloadComment,
      payloadRating,
      showTourDetailModal,
      closeTourDetailModal,
      addComment,
      onSubmit,
      handleOk,
      addFavorite,
      ...storeToRefs(toursStore),
      ...storeToRefs(recommentToursStore)
    }
  }
})
</script>

<style scoped>
.list-container {
  list-style: none;
}

.image-container {
  width: 100%;
  overflow: hidden;
}

.avatar {
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50px;
  border: 1px solid #ccc;
}
.image {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-detail {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.image:hover {
  transform: scale(1.1);
  transition: all 0.5s;
}

.title {
  font-size: 0.875rem;
  line-height: 1.125rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  background-color: var(--supportive-transparent);
  color: var(--label-secondary);
  text-transform: uppercase;
}

.description {
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--label-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.duration {
  color: var(--label-primary);
  line-height: normal;
  font-size: 14px;
}

.custom-input {
  border: 0;
  outline: 0;
  padding: 0;
  width: 100%;
  background: transparent;
  color: var(--label-primary);
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.375rem;
  font-weight: 400;
}

.custom-input:focus {
  box-shadow: none;
}

.custom-button {
  border-radius: 5rem;
  border-width: 2px;
  transition: background-color 0.2s ease-out;
  outline: 0;
}

.hover:hover {
  opacity: 0.8;
}

@media screen and (min-width: 991px) {
  .custom-body {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .custom-body {
    width: 75%;
  }
}
</style>
