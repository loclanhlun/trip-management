<template>
  <div class="w-100 mt-2">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" @finish="handleSubmit">
      <a-form-item label="Tên Tour" name="name" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="Chọn ảnh">
        <input id="upload" class="" type="file" @change="onFileChanged" accept="image/jpg,png" capture />
      </a-form-item>
      <a-form-item label="Quốc Gia" name="country" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.country" />
      </a-form-item>
      <a-form-item label="Tổng thời gian" name="duration" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.duration" />
      </a-form-item>
      <a-form-item label="Loại tour" name="type" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.type" />
      </a-form-item>
      <a-form-item label="Số lượng người" name="scale" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.scale" />
      </a-form-item>
      <a-form-item label="Địa điểm" name="place" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.place" />
      </a-form-item>
      <a-form-item label="Mô Tả" name="description" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="Giá" name="price" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input type="number" v-model:value="formState.price" />
      </a-form-item>
      <a-form-item label="Sở thích của bạn là gì?">
        <a-spin class="mt-2 mx-2" size="small" v-if="favoritesState.isLoading" />
        <a-checkbox-group v-else class="mt-2 mx-2" v-model="formState.favorite" :options="favoritesState.data" @change="onChange" />
      </a-form-item>
      <div class="d-flex justify-content-end">
        <a-form-item>
          <a-button :disabled="addTourState.isLoading" html-type="submit" class="btn btn-primary mx-2">
            Thêm<a-spin size="small" v-if="addTourState.isLoading" />
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-button @click="handleClose" class="btn btn-secondary mx-2">Hủy</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRaw, watchEffect, onMounted } from 'vue'
import { useToursStore } from '../stores/store'
import { useFavoritesStore } from '../../../store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  props: [],
  setup(props, { emit }) {
    const getInitialValues = () => ({
      name: '',
      country: '',
      duration: '',
      type: '',
      scale: '',
      place: '',
      description: '',
      price: 0,
      img: '',
      favorite: []
    })

    const base64Image = ref(null)
    const file = ref(null)
    const formState = reactive(getInitialValues())
    const store = useToursStore()
    const favoriteStore = useFavoritesStore()
    const resetForm = () => Object.assign(formState, getInitialValues())

    const getBase64 = (file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        base64Image.value = reader.result
      }
      reader.readAsDataURL(file)
    }

    const callAPIGetFavorite = async () => {
      await favoriteStore.getFavorites()
    }

    const onChange = (checkedList) => {
      formState.favorite = checkedList
    }

    const onFileChanged = (event) => {
      const target = event.target
      if (target && target.files) {
        file.value = target.files[0]
        getBase64(file.value)
      }
    }

    const handleSubmit = () => {
      const payload = {
        ...toRaw(formState),
        img: base64Image.value
      }
      emit('handleSubmit', payload)
    }

    watchEffect(() => {
      if (!store.addTourState.isLoading && store.addTourState.data) {
        resetForm()
        base64Image.value = null
      }
    })

    const handleClose = () => {
      emit('handleCancel')
      resetForm()
    }

    onMounted(callAPIGetFavorite)
    return {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      formState,
      ...storeToRefs(favoriteStore),
      ...storeToRefs(store),
      handleSubmit,
      onFileChanged,
      onChange,
      handleClose
    }
  }
})
</script>
