<template>
  <div class="containter-fuild">
    <div class="row flex-nowrap justify-content-center" style="border-bottom: 1px solid #ccc; height: 65px">
      <div class="row flex-nowrap custom-header">
        <div class="col-11 d-flex align-items-center justify-content-start p-0">
          <div class="logo"></div>
        </div>

        <div class="col-1 d-flex align-items-center justify-content-between">
          <i class="bi bi-heart" style="font-size: 26px"></i>
          <i class="bi bi-person-fill" style="font-size: 32px"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useMenu } from '../stores/use-menu'
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    const store = useMenu()
    return {
      ...storeToRefs(store)
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

@media screen and (min-width: 991px) {
  .custom-header {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .custom-header {
    width: 75%;
  }
}
</style>
