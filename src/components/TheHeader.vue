<template>
  <div class="containter-fuild">
    <div class="row px-4 flex-nowrap" style="border-bottom: 1px solid #ccc; height: 65px">
      <div @click="showDrawer()" class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <span><i class="bi bi-menu-button-wide" style="font-size: 32px"></i></span>
      </div>
      <div class="col-10 col-sm-3 d-flex align-items-center justify-content-center d-lg-none d-md-none d-sm-none">
        <div class="logo"></div>
      </div>
      <div class="col-sm-12 d-none d-sm-flex align-items-center justify-content-sm-end">
        <div class="d-flex justify-content-between align-items-center" style="width: 70px">
          <i class="bi bi-heart" style="font-size: 26px"></i>
          <i class="bi bi-person-fill" style="font-size: 32px"></i>
        </div>
      </div>
      <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <i class="bi bi-heart" style="font-size: 26px"></i>
        <i class="bi bi-person-fill" style="font-size: 32px"></i>
      </div>
    </div>
    <a-drawer :open="visible" @close="closeDrawer()" title="Danh Mục" placement="left"> </a-drawer>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const visible = ref(false)
    const showDrawer = () => {
      visible.value = true
    }

    const closeDrawer = () => {
      visible.value = false
    }
    return {
      visible,
      showDrawer,
      closeDrawer
    }
  }
})
</script>

<style scoped>
.logo {
  background-image: url(https://cdn.getyourguide.com/tf/assets/static/logos/gyg-logo.svg);
  background-repeat: no-repeat;
  width: 56px;
  height: 64px;
}
</style>
