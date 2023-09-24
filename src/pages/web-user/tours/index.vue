<template>
  <div class="containter-fuild">
    <div class="row flex-nowrap justify-content-center">
      <div class="custom-body">
        <h2>Tours</h2>
        <ul class="list-container row p-0">
          <li class="col-4 gap-1">
            <div class="d-flex flex-column">
              <div class="image-container">
                <div class="image"></div>
              </div>
              <div class="d-flex flex-column">
                <p>Title</p>
                <p>From Hanoi: Ninh Binh, Trang An, Bai Dinh, and Mua Cave Trip</p>
                <p>1 Day</p>
                <a-rate v-model:value="value" allow-half />
              </div>
            </div>
          </li>
          <li class="col-4 gap-1">
            <div class="d-flex flex-column">
              <div class="image-container">
                <div class="image"></div>
              </div>
              <div class="d-flex flex-column">
                <p>Title</p>
                <p>From Hanoi: Ninh Binh, Trang An, Bai Dinh, and Mua Cave Trip</p>
                <p>1 Day</p>
                <a-rate v-model:value="value" allow-half />
              </div>
            </div>
          </li>
          <li class="col-4 gap-1">
            <div class="d-flex flex-column">
              <div class="image-container">
                <div class="image"></div>
              </div>
              <div class="d-flex flex-column">
                <p>Title</p>
                <p>From Hanoi: Ninh Binh, Trang An, Bai Dinh, and Mua Cave Trip</p>
                <p>1 Day</p>
                <a-rate v-model:value="value" allow-half />
              </div>
            </div>
          </li>
          <li class="col-4 gap-1">
            <div class="d-flex flex-column">
              <div class="image-container">
                <div class="image"></div>
              </div>
              <div class="d-flex flex-column">
                <p>Title</p>
                <p>From Hanoi: Ninh Binh, Trang An, Bai Dinh, and Mua Cave Trip</p>
                <p>1 Day</p>
                <a-rate v-model:value="value" allow-half />
              </div>
            </div>
          </li>
          <li class="col-4 gap-1">
            <div class="d-flex flex-column">
              <div class="image-container">
                <div class="image"></div>
              </div>
              <div class="d-flex flex-column">
                <p>Title</p>
                <p>From Hanoi: Ninh Binh, Trang An, Bai Dinh, and Mua Cave Trip</p>
                <p>1 Day</p>
                <a-rate v-model:value="value" allow-half />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const value = ref(2.5)
    return {
      value
    }
  }
})
</script>

<style scoped>
.list-container {
  list-style: none;
}

.image-container {
  width: 100%;
  overflow: hidden;
}

.image {
  background-image: url('../../../assets/demo1.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image:hover {
  transform: scale(1.1);
  transition: all 0.5s;
}

@media screen and (min-width: 991px) {
  .custom-body {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .custom-body {
    width: 75%;
  }
}
</style>
