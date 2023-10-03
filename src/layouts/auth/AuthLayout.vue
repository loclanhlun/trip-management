<template>
  <a-layout class="vh-100">
    <a-layout-content class="d-flex justify-content-center">
      <div class="col-12 col-md-6 col-sm-6 col-lg-4 col-xl-4">
        <div class="p-3 mt-5">
          <h2 class="text-center">Đăng nhập</h2>
          <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item name="username" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
              <a-input class="p-2" placeholder="Tên đăng nhập" v-model:value="formState.username"> </a-input>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
              <a-input-password class="p-2" placeholder="Mật khẩu" v-model:value="formState.password"> </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button w-100">
                {{ authState.isLoading ? 'Loading' : 'Đăng nhập' }}</a-button
              >
            </a-form-item>
            <div class="d-flex justify-content-center">
              <a href="/register">Đăng ký ngay!</a>
            </div>
          </a-form>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { reactive, defineComponent, watchEffect } from 'vue'
import { useAuthStore } from './store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const formState = reactive({
      username: '',
      password: ''
    })

    const router = useRouter()

    const store = useAuthStore()
    const { signin } = store
    const { authState } = storeToRefs(store)
    const onFinish = async (values) => {
      await signin(values)
      if (store.authState.error) {
        message.error('Tài khoản hoặc mật khẩu không chính xác!')
      }
    }
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo)
    }

    watchEffect(() => {
      if (!store.authState.isLoading && store.authState.data && store.authState.data.roles[0] === 'ROLE_ADMIN') {
        router.push('/admin')
      } else if (!store.authState.isLoading && store.authState.data && store.authState.data.roles[0] === 'ROLE_USER') {
        router.push('/trip/tours')
      }
    })

    return {
      onFinish,
      onFinishFailed,
      formState,
      authState
    }
  }
})
</script>
