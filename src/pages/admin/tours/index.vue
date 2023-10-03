<template>
  <h3 class="text-center mt-5 mb-5">Danh sách tour</h3>
  <div class="d-flex">
    <div class="w-100">
      <div class="d-flex justify-content-end mb-2">
        <button @click="openModal" class="btn btn-primary">Thêm</button>
      </div>
      <a-modal title="Thêm Tour" :open="visible" :footer="null" @cancel="handleCancel">
        <add-tour-form @handleCancel="handleCancel" @handleSubmit="handleSubmit" />
      </a-modal>
      <a-modal title="Chỉnh sửa Tour" :open="visibleEditModal" :footer="null" @cancel="handleCancel">
        <edit-tour-form @handleCancel="handleCancel" :tourId="tourId" @handleUpdate="handleUpdate" />
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
              <span>
                <a @click="edit(record.id)">Chỉnh sửa</a>
              </span>
              <span>
                <a-popconfirm title="Sure to delete this row?" @confirm="onDelete(record.id)">
                  <a>Xóa <a-spin size="small" v-if="deleteTourByIdState.isLoading" /></a>
                </a-popconfirm>
              </span>
            </div>
          </template>

          <template v-if="['name', 'img', 'country', 'duration', 'type', 'scale', 'place', 'description', 'price'].includes(column.dataIndex)">
            <div>
              <a-form>
                <template v-if="column.key === 'img'">
                  <img :src="record.img" style="width: 200px; height: auto; background-repeat: no-repeat; background-size: contain" />
                </template>
                <template v-else>
                  {{ text }}
                </template>
              </a-form>
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
import { defineComponent, ref, toRaw, watch } from 'vue'
import AddTourForm from './components/AddTourForm.vue'
import EditTourForm from './components/EditTourForm.vue'
import { useMenu } from '../../../stores/use-menu'
import { useToursStore } from './stores/store'
import { storeToRefs } from 'pinia'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    AddTourForm,
    EditTourForm
  },
  setup() {
    useMenu().onSelectedKeys(['admin-tours'])
    const columns = [
      {
        title: 'Tên Tour',
        dataIndex: 'name',
        key: 'name',
        width: 120
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'img',
        key: 'img',
        width: 300
      },
      {
        title: 'Quốc gia',
        dataIndex: 'country',
        key: 'country',
        width: 100
      },
      {
        title: 'Tổng thời gian',
        dataIndex: 'duration',
        key: 'duration',
        width: 100
      },
      {
        title: 'Loại Tour',
        dataIndex: 'type',
        key: 'type',
        width: 100
      },
      {
        title: 'Số lượng người',
        dataIndex: 'scale',
        key: 'scale',
        width: 100
      },
      {
        title: 'Địa điểm',
        dataIndex: 'place',
        key: 'place',
        width: 100
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        width: 150
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        width: 100
      },
      {
        key: 'action',
        width: 200,
        fixed: 'right'
      }
    ]
    const current = ref(1)
    const pageSize = ref(10)
    const store = useToursStore()
    const base64Image = ref(null)
    const file = ref(null)
    const tourId = ref(null)

    const visible = ref(false)
    const visibleEditModal = ref(false)

    const callGetToursAPI = async () => {
      await store.getTours(current.value - 1, pageSize.value, { searchKey: '' })
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
      if (store.addTourState.data.statusCode === 200) {
        message.success('Thành công')
      } else {
        message.error('Thất bại')
      }
      visible.value = false
      callGetToursAPI()
    }
    const handleCancel = () => {
      visible.value = false
      visibleEditModal.value = false
    }

    const edit = (id) => {
      visibleEditModal.value = true
      store.getTourById(id)
      tourId.value = id
    }

    const getBase64 = (file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        base64Image.value = reader.result
      }
      reader.readAsDataURL(file)
    }

    const onFileChanged = (event) => {
      const target = event.target
      if (target && target.files) {
        file.value = target.files[0]
        getBase64(file.value)
      }
    }

    const onDelete = async (id) => {
      await store.deleteTourById(id)
      callGetToursAPI()
    }

    const handleUpdate = async (data) => {
      await store.updateTourById(tourId.value, data)
      if (store.updateTourByIdState.data.statusCode === 200) {
        message.success('Thành công')
        visibleEditModal.value = false
        store.getTourById(tourId.value)
      } else {
        message.error('Thất bại')
      }
      callGetToursAPI()
    }

    return {
      columns,
      current,
      pageSize,
      visible,
      tourId,
      visibleEditModal,
      ...storeToRefs(store),
      openModal,
      handleCancel,
      handleSubmit,
      edit,
      onDelete,
      onFileChanged,
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
