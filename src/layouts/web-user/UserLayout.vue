<template>
  <div class="container-fluid p-0" style="background-color: rgb(237, 238, 240)">
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

<style scoped></style>
