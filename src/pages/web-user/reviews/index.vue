<template>
  <div class="containter-fuild">
    <div class="row flex-nowrap justify-content-center m-0">
      <div class="custom-body">
        <div class="row flex-nowrap justify-content-center m-0">
          <h2>Danh sách bài đánh giá</h2>
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" @click="showAddReviewModel" class="btn btn-primary">Đăng bài</button>
        </div>
        <div v-if="reviewsState.isLoading" class="d-flex justify-content-center">
          <a-spin size="large" />
        </div>
        <ul v-else class="list-container row flex-column p-0 align-items-center">
          <li v-for="(item, index) in reviewsState.data.content" :key="index" class="card my-4">
            <div v-if="item.status" class="d-flex flex-column">
              <div class="d-flex my-2 align-items-center">
                <img src="../../../assets/avatar.png" class="avatar" />
                <div class="d-flex flex-column mx-2">
                  <span>{{ item.username }}</span>
                  <span style="font-size: 13px">{{ formatDate(item.createdTime) }}</span>
                </div>
              </div>
              <div class="d-flex flex-column">
                <span class="title">{{ item.title }}</span>
                <span class="description my-2">{{ item.description }}</span>
                <img v-if="item.imgPreview" :src="item.imgPreview" class="image my-2" />
              </div>
            </div>
          </li>
        </ul>
        <div class="d-flex justify-content-center mt-2 py-2">
          <a-pagination show-size-changer v-model:current="current" v-model:pageSize="pageSize" :total="reviewsState.data.totalElements" />
        </div>
      </div>
      <a-modal :open="openAddReviewModel" @cancel="handleClose" width="1000px" :footer="null" title="Viết bài đánh giá">
        <div class="w-100 mt-2">
          <a-form :model="formState">
            <a-input v-model:value="formState.title" placeholder="Nhập tiêu đề" class="my-1" />
            <a-textarea v-model:value="formState.description" placeholder="Nhập mô tả" :auto-size="{ minRows: 2, maxRows: 5 }" />
            <div class="position-relative">
              <div v-if="base64Image === null" style="height: 200px" class="border rounded-1 my-1 d-flex flex-column justify-content-center">
                <a-empty :image="simpleImage" />
              </div>
              <div v-else class="my-2 rounded-2" style="overflow: hidden">
                <img :src="base64Image" class="image" />
              </div>
              <label for="upload" class="custom-file-upload position-absolute top-0 end-0 fs-3 m-2">
                <i class="bi bi-file-earmark-image-fill"></i>
                <input id="upload" class="" type="file" @change="onFileChanged" accept="image/jpg,png" capture />
              </label>
            </div>
            <div class="d-flex justify-content-end">
              <button @click="handleSubmit" class="btn btn-primary mx-2">Đăng<a-spin size="small" v-if="addReviewState.isLoading" /></button>
              <button @click="handleClose" class="btn btn-secondary mx-2">Hủy</button>
            </div>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRaw } from 'vue'
import { useReviewStore } from '../../admin/reviews/store/store'
import { message } from 'ant-design-vue'
import moment from 'moment'
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    const store = useReviewStore()
    const current = ref(1)
    const pageSize = ref(10)
    const file = ref(null)
    const openAddReviewModel = ref(false)
    const base64Image = ref(null)
    const getInitialValues = () => ({
      title: '',
      imgPreview: '',
      shortDescription: '',
      description: ''
    })

    const formatDate = (date) => {
      return moment(date).format('DD/MM/YYYY HH:mm:ss')
    }

    const formState = reactive(getInitialValues())
    const getReviews = async () => {
      await store.getReviews(current.value, pageSize.value)
    }

    const showAddReviewModel = () => {
      openAddReviewModel.value = true
    }
    const resetForm = () => Object.assign(formState, getInitialValues())
    const handleSubmit = async () => {
      const payload = {
        ...toRaw(formState),
        imgPreview: base64Image.value
      }
      await store.addReview(payload)
      message.success('Bài viết của bạn sẽ phải đợi phê duyệt của quản trị viên!')
    }

    const handleClose = () => {
      base64Image.value = null
      openAddReviewModel.value = false
      resetForm()
    }

    getReviews()

    const getBase64 = (file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        base64Image.value = reader.result
      }
      reader.readAsDataURL(file)
    }

    const onFileChanged = (event) => {
      const target = event.target
      if (target && target.files) {
        file.value = target.files[0]
        getBase64(file.value)
      }
    }

    return {
      current,
      pageSize,
      formState,
      file,
      base64Image,
      openAddReviewModel,
      formatDate,
      showAddReviewModel,
      handleClose,
      onFileChanged,
      handleSubmit,
      ...storeToRefs(store)
    }
  }
})
</script>

<style scoped>
.list-container {
  list-style: none;
}

.avatar {
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50px;
  border: 1px solid #ccc;
}

input[type='file'] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: white;
}

.image {
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-size: contain;
}

.width-600 {
  width: 600px;
  max-width: 600px;
  min-width: 300px;
}

.card {
  width: 600px;
  max-width: 600px;
  min-width: 300px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.title {
  font-size: 18px;
  font-weight: 700;
}

.description {
  font-size: 16px;
  font-weight: 400;
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

@media screen and (max-width: 600px) {
  .card {
    width: 100%;
  }
}
</style>
