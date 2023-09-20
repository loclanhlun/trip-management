<template>
  <div class="w-100 mt-2">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="Email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="Phone Number">
        <a-input v-model:value="formState.phoneNumber" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="Full Name">
        <a-input v-model:value="formState.fullName" />
      </a-form-item>
      <a-form-item label="Roles">
        <a-select ref="select" v-model:value="formState.role" style="width: 120px">
          <a-select-option value="admin">Admin</a-select-option>
          <a-select-option value="user">User</a-select-option>
        </a-select>
      </a-form-item>
      <div class="d-flex justify-content-end">
        <button @click="handleSubmit" class="btn btn-primary mx-2">Submit</button>
        <button @click="handleClose" class="btn btn-secondary mx-2">Cancel</button>
      </div>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, reactive, watchEffect } from 'vue'
import { useUsersStore } from '../../users/stores/store'
export default defineComponent({
  props: [],
  setup(props, { emit }) {
    const getInitialValues = () => ({
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      fullName: '',
      role: ''
    })
    const store = useUsersStore()
    const formState = reactive(getInitialValues())
    const resetUserForm = () => Object.assign(formState, getInitialValues())

    const handleSubmit = () => {
      emit('handleSubmit', formState)
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
    return {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      formState,
      handleSubmit,
      handleClose
    }
  }
})
</script>
