<template>
  <div class="container-fluid">
    <the-user-header />
    <router-view></router-view>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import TheUserHeader from '../../components/TheUserHeader.vue'
export default defineComponent({
  components: {
    TheUserHeader
  },
  setup() {
    return {}
  }
})
</script>
