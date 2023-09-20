<template>
  <div class="w-100 mt-2">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Tour Name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="Country">
        <a-input v-model:value="formState.country" />
      </a-form-item>
      <a-form-item label="Duration">
        <a-input v-model:value="formState.duration" />
      </a-form-item>
      <a-form-item label="Type">
        <a-input v-model:value="formState.type" />
      </a-form-item>
      <a-form-item label="Scale">
        <a-input v-model:value="formState.scale" />
      </a-form-item>
      <a-form-item label="Place">
        <a-input v-model:value="formState.place" />
      </a-form-item>
      <a-form-item label="Description">
        <a-input v-model:value="formState.description" />
      </a-form-item>
      <a-form-item label="Price">
        <a-input v-model:value="formState.price" />
      </a-form-item>

      <div class="d-flex justify-content-end">
        <button @click="handleSubmit" :disabled="addTourState.isLoading" class="btn btn-primary mx-2">
          Submit<a-spin size="small" v-if="addTourState.isLoading" />
        </button>
        <button @click="handleClose" class="btn btn-secondary mx-2">Cancel</button>
      </div>
    </a-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRaw, watchEffect } from 'vue'
import { useToursStore } from '../stores/store'
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
      price: 0
    })
    const formState = reactive(getInitialValues())
    const store = useToursStore()
    const resetForm = () => Object.assign(formState, getInitialValues())

    const handleSubmit = () => {
      emit('handleSubmit', formState)
    }

    watchEffect(() => {
      if (!store.addTourState.isLoading && store.addTourState.data) {
        resetForm()
      }
    })

    const handleClose = () => {
      emit('handleCancel')
      resetForm()
    }
    return {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      ...storeToRefs(store),
      formState,
      handleSubmit,
      handleClose
    }
  }
})
</script>
