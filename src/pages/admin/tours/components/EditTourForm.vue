<template>
  <div class="w-100 mt-2">
    <div class="d-flex justify-content-center" v-if="getTourByIdState.isLoading">
      <a-spin size="small" />
    </div>
    <a-form v-else :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" @finish="handleSubmit" @cancel="handleClose">
      <a-form-item label="Tên Tour" name="name" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.name" />
      </a-form-item>
      <a-form-item v-if="isEdit" label="Chọn ảnh">
        <input :disabled="!isEdit" id="upload" class="" type="file" @change="onFileChanged" accept="image/jpg,png" capture />
      </a-form-item>
      <a-form-item v-else label="Chọn ảnh">
        <img :src="formState.img" style="width: 200px; height: auto; background-repeat: no-repeat; background-size: contain" />
      </a-form-item>
      <a-form-item label="Quốc Gia" name="country" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.country" />
      </a-form-item>
      <a-form-item label="Tổng thời gian" name="duration" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.duration" />
      </a-form-item>
      <a-form-item label="Loại tour" name="type" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.type" />
      </a-form-item>
      <a-form-item label="Số lượng người" name="scale" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.scale" />
      </a-form-item>
      <a-form-item label="Địa điểm" name="place" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.place" />
      </a-form-item>
      <a-form-item label="Mô Tả" name="description" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="Giá" name="price" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" type="number" v-model:value="formState.price" />
      </a-form-item>

      <div class="d-flex justify-content-end">
        <a-form-item>
          <a-button v-if="isEdit" :disabled="updateTourByIdState.isLoading" html-type="submit" class="btn btn-primary mx-2">
            Lưu<a-spin size="small" v-if="updateTourByIdState.isLoading" />
          </a-button>
          <a-button v-else @click="onEdit" type="button" class="btn btn-primary mx-2"> Chỉnh sửa </a-button>
        </a-form-item>
        <a-form-item v-if="isEdit">
          <a-button @click="handleClose" class="btn btn-secondary mx-2">Hủy</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRaw, onMounted, watch } from 'vue'
import { useToursStore } from '../stores/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup(props, { emit }) {
    const store = useToursStore()

    const getInitialValues = () => ({
      name: '',
      country: '',
      duration: '',
      type: '',
      scale: '',
      place: '',
      description: '',
      price: 0,
      img: ''
    })

    const base64Image = ref(null)
    const file = ref(null)
    const formState = reactive(getInitialValues())
    const resetForm = () => Object.assign(formState, getInitialValues())
    const isEdit = ref(false)

    const onEdit = () => {
      isEdit.value = true
    }

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

    const handleSubmit = () => {
      const payload = {
        ...toRaw(formState),
        img: base64Image.value
      }
      emit('handleUpdate', payload)
    }

    watch(store, () => {
      if (!store.addTourState.isLoading && store.addTourState.data) {
        resetForm()
        base64Image.value = null
      }
    })

    watch(store, () => {
      if (store.getTourByIdState.data) {
        Object.assign(formState, { ...store.getTourByIdState.data })
      }
    })

    const handleClose = () => {
      emit('handleCancel')
    }

    watch(store, () => {
      if (!store.updateTourByIdState.isLoading && store.updateTourByIdState.data) {
        if (store.updateTourByIdState.data.statusCode === 200) {
          isEdit.value = false
        }
      }
    })

    return {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      formState,
      isEdit,
      onEdit,
      handleSubmit,
      onFileChanged,
      handleClose,
      ...storeToRefs(store)
    }
  }
})
</script>
