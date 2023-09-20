<template>
  <a-layout class="vh-100">
    <a-layout-content class="d-flex justify-content-center">
      <div class="col-12 col-md-6 col-sm-6 col-lg-4 col-xl-4">
        <div class="p-3 mt-5">
          <h2 class="text-center">Sign in</h2>
          <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input class="p-2" placeholder="User name or Email" v-model:value="formState.username"> </a-input>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
              <a-input-password class="p-2" placeholder="Password" v-model:value="formState.password"> </a-input-password>
            </a-form-item>
            <div class="d-flex justify-content-end align-items-baseline">
              <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a class="login-form-forgot" href="#">Forgot password</a>
              </a-form-item>
            </div>
            <a-form-item>
              <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button w-100">
                {{ authState.isLoading ? 'Loading' : 'Submit' }}</a-button
              >
            </a-form-item>
            <div class="d-flex justify-content-center">
              <a href="#">Register now!</a>
            </div>
          </a-form>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { reactive, defineComponent, ref, computed, watchEffect } from 'vue'
import { useAuthStore } from './store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
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
    const onFinish = (values) => {
      signin(values)

      router.push('/')
    }
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo)
    }

    return {
      onFinish,
      onFinishFailed,
      formState,
      authState
    }
  }
})
</script>
