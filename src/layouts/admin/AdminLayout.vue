<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3 d-none d-sm-flex p-0 m-0">
        <TheMenu />
      </div>
      <div class="col-12 col-sm-9">
        <TheHeader />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import TheHeader from '../../components/TheHeader.vue'
import TheMenu from '../../components/TheMenu.vue'
export default {
  components: {
    TheHeader,
    TheMenu
  }
}
</script>

<style scoped>
.logo {
  background-image: url(https://cdn.getyourguide.com/tf/assets/static/logos/gyg-logo.svg);
  background-repeat: no-repeat;
  width: 56px;
  height: 64px;
}
.side-bar {
  min-width: 400px !important;
}
</style>
