<template>
  <h3 class="text-center mt-5 mb-5">Danh sách tài khoản</h3>
  <div class="d-flex">
    <div class="w-100">
      <div class="d-flex justify-content-end mb-2">
        <button @click="openModal" class="btn btn-primary">Thêm</button>
      </div>
      <a-modal title="Tạo tài khoản" :open="visible" :footer="null" @cancel="handleCancel">
        <add-user-form @handleCancel="handleCancel" @handleSubmit="handleSubmit" />
      </a-modal>
      <a-modal title="Chỉnh sửa tài khoản" :open="visibleEditModal" :footer="null" @cancel="handleCancel">
        <edit-user-form @handleCancel="handleCancel" @handleUpdate="handleUpdate" />
      </a-modal>
      <a-table
        :columns="columns"
        :scroll="{ x: 500, y: 300 }"
        :dataSource="usersState.data.content"
        :loading="usersState.isLoading"
        :pagination="false"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'action'">
            <div class="editable-row-operations">
              <span>
                <a @click="edit(record.id)">Chỉnh sửa</a>
              </span>
              <span>
                <a-popconfirm title="Sure to delete this row?" @confirm="onDelete(record.id)">
                  <a>Xóa <a-spin size="small" v-if="deleteUserByIdState.isLoading" /></a>
                </a-popconfirm>
              </span>
            </div>
          </template>
          <template v-else>
            <div>
              {{ text }}
            </div>
          </template>
        </template>
      </a-table>

      <div class="d-flex justify-content-end mt-2">
        <a-pagination show-size-changer v-model:current="current" v-model:pageSize="pageSize" :total="usersState.data.totalElements" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, toRaw } from 'vue'
import AddUserForm from './components/AddUserForm.vue'
import EditUserForm from './components/EditUserForm.vue'
import { useMenu } from '../../../stores/use-menu'
import { useUsersStore } from './stores/store'
import { storeToRefs } from 'pinia'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: {
    AddUserForm,
    EditUserForm
  },
  setup() {
    useMenu().onSelectedKeys(['admin-users'])
    const store = useUsersStore()
    const pageSize = ref(10)
    const current = ref(1)

    const callGetUsersAPI = async () => {
      await store.getUsers(current.value, pageSize.value)
    }
    callGetUsersAPI()

    watch(pageSize, () => {
      callGetUsersAPI()
    })
    watch(current, () => {
      callGetUsersAPI()
    })

    const columns = [
      {
        title: 'Tên tài khoản',
        dataIndex: 'username',
        key: 'username',
        width: 100
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 150
      },
      {
        title: 'Họ và tên',
        dataIndex: 'fullName',
        key: 'fullName',
        width: 150
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: 150
      },
      {
        key: 'action',
        width: 200,
        fixed: 'right'
      }
    ]

    const visible = ref(false)
    const visibleEditModal = ref(false)
    const userId = ref(null)

    const openModal = () => {
      visible.value = true
    }

    const openEditModal = () => {
      visibleEditModal.value = true
    }

    const handleSubmit = async (data) => {
      await store.addUser(data)
      if (store.addUserState.data.statusCode === 200) {
        message.success('Thành công')
        visible.value = false
      } else {
        message.error('Tên tài khoản hoặc email đã tồn tại!')
      }
      callGetUsersAPI()
    }
    const handleCancel = () => {
      visible.value = false
      visibleEditModal.value = false
    }

    const edit = (id) => {
      store.getUserInfo(id)
      userId.value = id
      openEditModal()
    }

    const handleUpdate = async (data) => {
      await store.updateUserById(userId.value, data)
      if (store.updateUserByIdState.data.statusCode === 200) {
        message.success('Thành công')
        visibleEditModal.value = false
      } else {
        message.error('Thất bại')
      }
      callGetUsersAPI()
    }

    const onDelete = async (id) => {
      await store.deleteUserById(id)
      callGetUsersAPI()
    }

    return {
      columns,
      current,
      visible,
      pageSize,
      userId,
      visibleEditModal,
      openEditModal,
      ...storeToRefs(useUsersStore()),
      openModal,
      handleCancel,
      handleSubmit,
      edit,
      onDelete,
      handleUpdate
    }
  }
})
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
