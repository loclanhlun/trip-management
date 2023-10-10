<template>
  <div class="w-100 mt-2">
    <div class="d-flex justify-content-center" v-if="userInfoState.isLoading">
      <a-spin size="small" />
    </div>
    <a-form v-else :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" @finish="handleSubmit" @cancel="handleClose">
      <a-form-item label="Tên tài khoản">
        <a-input disabled v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="Email">
        <a-input disabled v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="Họ và tên" name="fullName" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.fullName" />
      </a-form-item>
      <a-form-item label="Số điện thoại" name="phoneNumber" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input :disabled="!isEdit" v-model:value="formState.phoneNumber" />
      </a-form-item>
      <a-form-item label="Sở thích của bạn là gì?">
        <a-spin class="mt-2 mx-2" size="small" v-if="favoritesState.isLoading" />
        <a-checkbox-group
          :disabled="!isEdit"
          v-else
          class="mt-2 mx-2"
          v-model="formState.favorite"
          :options="favoritesState.data"
          :default-value="formState.favorite"
          @change="onChange"
        />
      </a-form-item>

      <div class="d-flex justify-content-end">
        <a-form-item>
          <a-button v-if="isEdit" :disabled="updateUserByIdState.isLoading" html-type="submit" class="btn btn-primary mx-2">
            Lưu<a-spin size="small" v-if="updateUserByIdState.isLoading" />
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
import { useUsersStore } from '../stores/store'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '../../../store'
export default defineComponent({
  setup(props, { emit }) {
    const store = useUsersStore()

    const getInitialValues = () => ({
      username: '',
      email: '',
      fullName: '',
      phoneNumber: '',
      favorite: []
    })

    const formState = reactive(getInitialValues())
    const favoriteStore = useFavoritesStore()
    const isEdit = ref(false)

    const onEdit = () => {
      isEdit.value = true
    }

    const onChange = (checkedList) => {
      formState.favorite = checkedList
    }

    const handleSubmit = () => {
      const payload = {
        ...toRaw(formState)
      }
      delete payload.email
      delete payload.username
      emit('handleUpdate', payload)
    }
    const callAPIGetFavorite = async () => {
      await favoriteStore.getFavorites()
    }

    watch(store, () => {
      if (store.userInfoState.data) {
        Object.assign(formState, { ...store.userInfoState.data })
      }
    })

    const handleClose = () => {
      emit('handleCancel')
      isEdit.value = false
    }

    watch(store, () => {
      if (!store.updateUserByIdState.isLoading && store.updateUserByIdState.data) {
        if (store.updateUserByIdState.data.statusCode === 200) {
          isEdit.value = false
        }
      }
    })

    onMounted(callAPIGetFavorite)

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
      handleClose,
      onChange,
      ...storeToRefs(store),
      ...storeToRefs(favoriteStore)
    }
  }
})
</script>
