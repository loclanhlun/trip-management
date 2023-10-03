<template>
  <div class="containter-fuild p-0" style="background-color: white">
    <div class="row flex-nowrap justify-content-center" style="border-bottom: 1px solid #ccc; height: 65px">
      <div class="row flex-nowrap custom-header">
        <div class="col-6 col-md-10 col-md-10 d-flex align-items-center justify-content-start p-0">
          <div @click="redirectToTours" class="logo"></div>
        </div>
        <div class="col-6 col-md-2 col-lg-2 d-flex align-items-center justify-content-between">
          <i @click="redirectToReviews" class="bi bi-card-text icon" style="font-size: 26px"></i>
          <i @click="showWishListModal" class="bi bi-heart icon" style="font-size: 26px"></i>
          <a-dropdown v-if="authState.data">
            <span><i class="bi bi-person-fill icon" style="font-size: 32px"></i></span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="showModel">Profile</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="logout">Logout</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-dropdown v-else>
            <span style="cursor: pointer"><i class="bi bi-person-fill icon" style="font-size: 32px"></i></span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="redirectToLogin">Login</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <a-modal title="Thông tin của bạn" :open="visibleModal" :footer="null" @cancel="handleCancel">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Tên tài khoản">
          <a-input disabled v-model:value="userInfoState.data.username" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input disabled v-model:value="userInfoState.data.email" />
        </a-form-item>
        <a-form-item label="Số điện thoại">
          <a-input disabled v-model:value="userInfoState.data.phoneNumber" />
        </a-form-item>
        <a-form-item label="Họ và tên">
          <a-input disabled v-model:value="userInfoState.data.fullName" />
        </a-form-item>
        <div class="d-flex justify-content-end">
          <button @click="handleCancel" class="btn btn-secondary mx-2">Đóng</button>
        </div>
      </a-form>
    </a-modal>
    <a-modal title="Danh sách yêu thích" :open="visibleWishlistModal" :footer="null" @cancel="closeWishListModal" width="1000px">
      <div v-if="whiteListState.isLoading" class="d-flex justify-content-center">
        <a-spin size="small" />
      </div>
      <ul v-else class="list-container d-flex flex-column align-items-center w-100">
        <li @click="showTourDetailModal(item.id)" v-for="(item, index) in whiteListState.data" :key="index" class="card w-100 my-2">
          <div class="row flex-nowrap">
            <div class="col-3">
              <img class="image" style="width: 100%" :src="item.img" />
            </div>
            <div class="col-9 d-flex">
              <div class="col-9 d-flex flex-column justify-content-between">
                <span style="font-weight: 600">{{ item.type }}</span>
                <span style="font-weight: 600" class="fs-4">{{ item.name }}</span>
                <span style="font-weight: 600">{{ item.duration }}</span>
              </div>
              <div class="col-3 d-flex flex-column align-items-end px-2 justify-content-between">
                <span class="fs-4">Giá: {{ item.price }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
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
              <img src="../assets/avatar.png" class="avatar" />
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
</template>
<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { useMenu } from '../stores/use-menu'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../layouts/auth/store'
import { useUsersStore } from '../pages/admin/users/stores/store'
import { useWhiteListStore } from './stores/store'
import { useToursStore } from '../pages/admin/tours/stores/store'
import router from '../router'
export default defineComponent({
  setup() {
    const store = useMenu()
    const authStore = useAuthStore()
    const whiteListStore = useWhiteListStore()
    const toursStore = useToursStore()
    const visibleModal = ref(false)
    const visibleWishlistModal = ref(false)
    const userStore = useUsersStore()

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

    const getWhiteList = async () => {
      if (authStore.authState.data) {
        await whiteListStore.getWhiteList()
      }
    }

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

    const showModel = () => {
      visibleModal.value = true
    }

    const handleCancel = () => {
      visibleModal.value = false
    }

    const showWishListModal = () => {
      visibleWishlistModal.value = true
      getWhiteList()
    }

    const closeWishListModal = () => {
      visibleWishlistModal.value = false
    }

    const logout = async () => {
      authStore.logout()
    }

    const redirectToLogin = () => {
      router.push('/login')
    }

    const redirectToReviews = () => {
      router.push('/trip/reviews')
    }

    const redirectToTours = () => {
      router.push('/trip/tours')
    }

    const getUserInfo = async () => {
      if (authStore.authState.data) {
        await userStore.getUserInfo(authStore.authState.data.id)
      }
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

    onMounted(getUserInfo)
    return {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      visibleModal,
      visibleWishlistModal,
      openTourDetailModal,
      payloadComment,
      payloadRating,
      showTourDetailModal,
      closeTourDetailModal,
      logout,
      getUserInfo,
      showModel,
      redirectToLogin,
      handleCancel,
      redirectToReviews,
      redirectToTours,
      showWishListModal,
      closeWishListModal,
      handleOk,
      addFavorite,
      addComment,
      ...storeToRefs(store),
      ...storeToRefs(authStore),
      ...storeToRefs(userStore),
      ...storeToRefs(whiteListStore),
      ...storeToRefs(toursStore)
    }
  }
})
</script>

<style lang="css" scoped>
.logo {
  background-image: url(https://cdn.getyourguide.com/tf/assets/static/logos/gyg-logo.svg);
  background-repeat: no-repeat;
  width: 56px;
  height: 64px;
  cursor: pointer;
}

.avatar {
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50px;
  border: 1px solid #ccc;
}

.list-container {
  list-style: none;
  padding: 0;
}

.icon:hover {
  cursor: pointer;
  opacity: 0.5;
}

.image {
  width: 200px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (min-width: 991px) {
  .custom-header {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .custom-header {
    width: 75%;
  }
}
</style>
