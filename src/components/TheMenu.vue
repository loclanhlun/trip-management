<template>
  <div class="d-flex flex-column w-100">
    <div class="w-100" style="height: 65px; border-bottom: 1px solid #ccc"><div @click="navigateIndex" class="logo" /></div>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
      <a-menu-item key="admin-tours">
        <router-link class="text-decoration-none" :to="{ name: 'admin-tours' }"><span>Tours</span></router-link>
      </a-menu-item>
      <a-menu-item key="admin-reviews">
        <router-link class="text-decoration-none" :to="{ name: 'admin-reviews' }"><span>Reviews</span></router-link>
      </a-menu-item>
      <a-menu-item key="admin-users">
        <router-link class="text-decoration-none" :to="{ name: 'admin-users' }"><span>Users</span></router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useMenu } from '../stores/use-menu'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useMenu()
    const navigateIndex = () => {
      router.push('/admin')
    }
    return {
      ...storeToRefs(store),
      navigateIndex
    }
  }
})
</script>

<style scoped>
.logo {
  background-image: url(https://cdn.getyourguide.com/tf/assets/static/logos/gyg-logo.svg);
  background-repeat: no-repeat;
  width: 100%;
  height: 64px;
  margin-left: 30px;
  cursor: pointer;
}
</style>
