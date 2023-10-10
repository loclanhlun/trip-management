<template>
  <div class="w-100 mt-2">
    <a-form :model="formState" :label-col="labelCol" @finish="handleSubmit" :wrapper-col="wrapperCol">
      <a-form-item label="Tên tài khoản" name="username" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="Số điện thoại" name="phoneNumber" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.phoneNumber" />
      </a-form-item>
      <a-form-item label="Mật khẩu" name="password" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="Họ và tên" name="fullName" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-input v-model:value="formState.fullName" />
      </a-form-item>
      <a-form-item label="Loại tài khoản" name="role" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
        <a-select ref="select" v-model:value="formState.role" style="width: 120px">
          <a-select-option value="admin">Quản trị viên</a-select-option>
          <a-select-option value="user">Người dùng</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Sở thích của bạn là gì?">
        <a-spin class="mt-2 mx-2" size="small" v-if="favoritesState.isLoading" />
        <a-checkbox-group v-else class="mt-2 mx-2" v-model="formState.favorite" :options="favoritesState.data" @change="onChange" />
      </a-form-item>
      <div class="d-flex justify-content-end">
        <button html-type="submit" class="btn btn-primary mx-2">Lưu</button>
        <button @click="handleClose" class="btn btn-secondary mx-2">Hủy</button>
      </div>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, watchEffect, onMounted } from 'vue'
import { useUsersStore } from '../../users/stores/store'
import { useFavoritesStore } from '../../../store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  props: [],
  setup(props, { emit }) {
    const getInitialValues = () => ({
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      fullName: '',
      role: '',
      favorite: []
    })
    const store = useUsersStore()
    const favoriteStore = useFavoritesStore()
    const formState = reactive(getInitialValues())
    const resetUserForm = () => Object.assign(formState, getInitialValues())

    const callAPIGetFavorite = async () => {
      await favoriteStore.getFavorites()
    }

    const handleSubmit = () => {
      emit('handleSubmit', formState)
    }

    const onChange = (checkedList) => {
      formState.favorite = checkedList
    }

    watchEffect(() => {
      if (!store.addUserState.isLoading && store.addUserState.data.statusCode) {
        resetUserForm()
      }
    })

    const handleClose = () => {
      emit('handleCancel')
      resetUserForm()
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
      handleSubmit,
      handleClose,
      onChange,
      ...storeToRefs(favoriteStore)
    }
  }
})
</script>
