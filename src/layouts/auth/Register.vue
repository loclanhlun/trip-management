<template>
  <a-layout class="vh-100">
    <a-layout-content class="d-flex justify-content-center">
      <div class="col-12 col-md-6 col-sm-6 col-lg-4 col-xl-4">
        <div class="p-3 mt-5">
          <h2 class="text-center">Đăng ký tài khoản</h2>
          <a-form :model="formState" name="normal_login" class="register-form" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item name="email" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
              <a-input class="p-2" placeholder="Email" v-model:value="formState.email"> </a-input>
            </a-form-item>
            <a-form-item name="username" :rules="[{ required: true, message: 'Không thể bỏ trống trường này!' }]">
              <a-input class="p-2" placeholder="Tên đăng nhập" v-model:value="formState.username"> </a-input>
            </a-form-item>
            <a-form-item
              name="password"
              :rules="[
                { required: true, message: 'Không thể bỏ trống trường này!' },
                { validator: validatePassword, message: 'Mật khẩu và xác nhận mật khẩu phải giống nhau!' }
              ]"
            >
              <a-input-password class="p-2" placeholder="Mật khẩu" v-model:value="formState.password"> </a-input-password>
            </a-form-item>
            <a-form-item
              name="confirmPassword"
              :rules="[
                { required: true, message: 'Không thể bỏ trống trường này!' },
                { validator: validatePassword, message: 'Mật khẩu và xác nhận mật khẩu phải giống nhau!' }
              ]"
            >
              <a-input-password class="p-2" placeholder="Nhập lại mật khẩu" v-model:value="formState.confirmPassword"> </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" class="login-form-button w-100">
                {{ signupState.isLoading ? 'Loading' : 'Đăng ký' }}</a-button
              >
            </a-form-item>
            <div class="d-flex justify-content-center">
              <a href="/login">Đăng nhập ngay!</a>
            </div>
          </a-form>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { reactive, defineComponent, toRaw } from 'vue'
import { useAuthStore } from './store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const formState = reactive({
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    })

    const store = useAuthStore()
    const { signup } = store
    const onFinish = async (values) => {
      const payload = {
        ...values,
        role: ['user']
      }
      delete payload.confirmPassword
      await signup(payload)
      if (!store.signupState.isLoading && store.signupState.message) {
        message.info(store.signupState.message)
      }
    }
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo)
    }

    const validatePassword = (rule, value, callback) => {
      const payload = toRaw(formState)
      if (value === payload.password) {
        callback()
      } else {
        callback(new Error('Mật khẩu và xác nhận mật khẩu phải giống nhau!'))
      }
    }

    return {
      formState,
      onFinish,
      onFinishFailed,
      validatePassword,
      ...storeToRefs(store)
    }
  }
})
</script>
