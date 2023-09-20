<template>
  <h3 class="text-center mt-5 mb-5">Tours Management</h3>
  <div class="d-flex">
    <div class="w-100">
      <div class="d-flex justify-content-end mb-2">
        <button @click="openModal" class="btn btn-primary">Add</button>
      </div>
      <a-modal title="Add Tour" :open="visible" :footer="null" @cancel="handleCancel">
        <add-tour-form @handleCancel="handleCancel" @handleSubmit="handleSubmit" />
      </a-modal>
      <a-table
        :columns="columns"
        :scroll="{ x: 500, y: 300 }"
        :dataSource="toursState.data.content"
        :loading="toursState.isLoading"
        :pagination="false"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'action'">
            <div class="editable-row-operations">
              <span v-if="editableData[record.id]">
                <a-typography-link @click="save(record.id)">Save <a-spin size="small" v-if="updateTourByIdState.isLoading" /></a-typography-link>
                <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
                  <a>Cancel</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(record.id)">Edit</a>
              </span>
              <span>
                <a-popconfirm title="Sure to delete this row?" @confirm="onDelete(record.id)">
                  <a>Delete <a-spin size="small" v-if="deleteTourByIdState.isLoading" /></a>
                </a-popconfirm>
              </span>
            </div>
          </template>
          <template v-if="['name', 'country', 'duration', 'type', 'scale', 'place', 'description', 'price'].includes(column.dataIndex)">
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
        <a-pagination show-size-changer v-model:current="current" v-model:pageSize="pageSize" :total="toursState.data.totalElements" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRaw, watch } from 'vue'
import AddTourForm from './components/AddTourForm.vue'
import { cloneDeep } from 'lodash-es'
import { useMenu } from '../../../stores/use-menu'
import { useToursStore } from './stores/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  components: {
    AddTourForm
  },
  setup() {
    useMenu().onSelectedKeys(['admin-tours'])
    const columns = [
      {
        title: 'Tours Name',
        dataIndex: 'name',
        key: 'name',
        width: 120
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        width: 100
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        width: 100
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: 100
      },
      {
        title: 'Scale',
        dataIndex: 'scale',
        key: 'scale',
        width: 100
      },
      {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
        width: 100
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 150
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: 100
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        width: 100
      },
      {
        title: 'Count Rating',
        dataIndex: 'countRating',
        key: 'countRating',
        width: 120
      },
      {
        title: 'Action',
        key: 'action',
        width: 200,
        fixed: 'right'
      }
    ]
    const current = ref(1)
    const pageSize = ref(10)
    const store = useToursStore()

    const editableData = reactive({})

    const visible = ref(false)

    const callGetToursAPI = async () => {
      await store.getTours(current.value - 1, pageSize.value)
    }

    watch(pageSize, () => {
      callGetToursAPI()
    })
    watch(current, () => {
      callGetToursAPI()
    })

    callGetToursAPI()

    const openModal = () => {
      visible.value = true
    }

    const handleSubmit = async (data) => {
      await store.addTour(toRaw(data))
      visible.value = false
      callGetToursAPI()
    }
    const handleCancel = () => {
      visible.value = false
    }

    const edit = (id) => {
      editableData[id] = cloneDeep(store.toursState.data.content.filter((item) => id === item.id)[0])
    }

    const save = async (id) => {
      const payload = toRaw(editableData[id])
      delete payload.rating
      delete payload.countRating
      delete payload.id
      await store.updateTourById(id, payload)
      callGetToursAPI()
      delete editableData[id]
    }

    const onDelete = async (id) => {
      await store.deleteTourById(id)
      callGetToursAPI()
    }

    const cancel = (id) => {
      delete editableData[id]
    }

    return {
      columns,
      current,
      pageSize,
      editableData,
      visible,
      ...storeToRefs(store),
      openModal,
      handleCancel,
      handleSubmit,
      edit,
      save,
      onDelete,
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
