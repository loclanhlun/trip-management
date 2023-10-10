<template>
  <div class="containter-fuild">
    <div class="row px-4 flex-nowrap" style="border-bottom: 1px solid #ccc; height: 65px">
      <div @click="showDrawer()" class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <span><i class="bi bi-menu-button-wide" style="font-size: 32px"></i></span>
      </div>
      <div class="col-10 col-sm-3 d-flex align-items-center justify-content-center d-lg-none d-md-none d-sm-none">
        <div class="logo"></div>
      </div>
      <div class="col-sm-12 d-none d-sm-flex align-items-end justify-content-sm-end">
        <div class="d-flex justify-content-end align-items-center" style="width: 70px">
          <a-dropdown>
            <span style="cursor: pointer"><i class="bi bi-person-fill icon" style="font-size: 32px"></i></span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="showModel">Profile</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="logout">Logout</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="col-1 d-flex d-sm-none align-items-center justify-content-end">
        <a-dropdown>
          <span style="cursor: pointer"><i class="bi bi-person-fill icon" style="font-size: 32px"></i></span>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a @click="showModel">Profile</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="logout">Logout</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <a-drawer :open="visible" @close="closeDrawer()" title="Danh Mục" placement="left">
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
    </a-drawer>
    <a-modal title="User Profile" :open="visibleModel" :footer="null" @cancel="handleCancel">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Username">
          <a-input disabled v-model:value="userInfoState.data.username" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input disabled v-model:value="userInfoState.data.email" />
        </a-form-item>
        <a-form-item label="Phone Number">
          <a-input disabled v-model:value="userInfoState.data.phoneNumber" />
        </a-form-item>
        <a-form-item label="Full Name">
          <a-input disabled v-model:value="userInfoState.data.fullName" />
        </a-form-item>
        <a-form-item label="Sở thích của bạn là gì?">
          <a-checkbox-group
            disabled
            class="mt-2 mx-2"
            v-model="userInfoState.data.favorite"
            :options="favoritesState.data"
            :default-value="userInfoState.data.favorite"
          />
        </a-form-item>
        <div class="d-flex justify-content-end">
          <button @click="handleCancel" class="btn btn-secondary mx-2">Close</button>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useMenu } from '../stores/use-menu'
import { useAuthStore } from '../layouts/auth/store'
import { useUsersStore } from '../pages/admin/users/stores/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '../pages/store'
export default defineComponent({
  setup() {
    const store = useMenu()
    const router = useRouter()
    const authStore = useAuthStore()
    const userStore = useUsersStore()
    const favoriteStore = useFavoritesStore()
    const visible = ref(false)
    const visibleModel = ref(false)
    const showModel = () => {
      visibleModel.value = true
    }

    const callAPIGetFavorite = async () => {
      await favoriteStore.getFavorites()
    }

    const handleCancel = () => {
      visibleModel.value = false
    }

    const showDrawer = () => {
      visible.value = true
    }

    const closeDrawer = () => {
      visible.value = false
    }

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    const getUserInfo = async () => {
      await userStore.getUserInfo(authStore.authState.data.id)
    }

    onMounted(getUserInfo)
    onMounted(callAPIGetFavorite)

    return {
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      visible,
      visibleModel,
      showDrawer,
      closeDrawer,
      logout,
      handleCancel,
      showModel,
      ...storeToRefs(store),
      ...storeToRefs(authStore),
      ...storeToRefs(userStore),
      ...storeToRefs(favoriteStore)
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
  cursor: pointer;
}

.icon:hover {
  opacity: 0.5;
}
</style>
