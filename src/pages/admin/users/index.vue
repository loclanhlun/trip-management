<template>
  <h3 class="text-center mt-5 mb-5">Users Management</h3>
  <div class="d-flex">
    <div class="w-100">
      <div class="d-flex justify-content-end mb-2">
        <button @click="openModal" class="btn btn-primary">Add</button>
      </div>
      <a-modal title="Add User" :open="visible" :footer="null" @cancel="handleCancel">
        <add-user-form @handleCancel="handleCancel" @handleSubmit="handleSubmit" />
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
              <span v-if="editableData[record.id]">
                <a-typography-link @click="save(record.id)">Save <a-spin size="small" v-if="updateUserByIdState.isLoading" /></a-typography-link>
                <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
                  <a>Cancel</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(record.id)">Edit</a>
              </span>
              <span>
                <a-popconfirm title="Sure to delete this row?" @confirm="onDelete(record.id)">
                  <a>Delete <a-spin size="small" v-if="deleteUserByIdState.isLoading" /></a>
                </a-popconfirm>
              </span>
            </div>
          </template>
          <template v-if="['fullName', 'phoneNumber'].includes(column.dataIndex)">
            <div>
              <a-input v-if="editableData[record.id]" v-model:value="editableData[record.id][column.dataIndex]" style="margin: -5px 0" />
              <template v-else>
                {{ text }}
              </template>
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
import { defineComponent, ref, reactive, watch, toRaw } from 'vue'
import AddUserForm from './components/AddUserForm.vue'
import { cloneDeep } from 'lodash-es'
import { useMenu } from '../../../stores/use-menu'
import { useUsersStore } from './stores/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  components: {
    AddUserForm
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
        title: 'Username',
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
        title: 'Fullname',
        dataIndex: 'fullName',
        key: 'fullName',
        width: 150
      },
      {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width: 150
      },
      {
        title: 'Action',
        key: 'action',
        width: 200,
        fixed: 'right'
      }
    ]
    const editableData = reactive({})

    const visible = ref(false)

    const openModal = () => {
      visible.value = true
    }

    const handleSubmit = async (data) => {
      await store.addUser(data)
      visible.value = false
      callGetUsersAPI()
    }
    const handleCancel = () => {
      visible.value = false
    }

    const edit = (id) => {
      editableData[id] = cloneDeep(store.usersState.data.content.filter((item) => id === item.id)[0])
    }

    const save = async (id) => {
      const { fullName, phoneNumber } = toRaw(editableData[id])
      const payload = {
        fullName,
        phoneNumber
      }
      await store.updateUserById(id, payload)
      callGetUsersAPI()
      delete editableData[id]
    }

    const onDelete = async (id) => {
      await store.deleteUserById(id)
      callGetUsersAPI()
    }

    const cancel = (key) => {
      delete editableData[key]
    }

    return {
      columns,
      current,
      editableData,
      visible,
      pageSize,
      ...storeToRefs(useUsersStore()),
      openModal,
      handleCancel,
      handleSubmit,
      edit,
      onDelete,
      save,
      cancel
    }
  }
})
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
