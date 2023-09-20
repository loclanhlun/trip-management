<template>
  <h3 class="text-center mt-5 mb-5">Reviews Management</h3>
  <div class="d-flex">
    <div class="w-100">
      <a-table
        :columns="columns"
        :scroll="{ x: 500, y: 300 }"
        :dataSource="reviewsState.data?.content"
        :loading="reviewsState.isLoading"
        :pagination="false"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <div class="editable-row-operations">
              <span v-if="record.status === false">
                <a-typography-link @click="save(record.id)">Approve<a-spin size="small" v-if="reviewsState.isLoading" /></a-typography-link>
              </span>
              <span v-if="record.status === false">
                <a-popconfirm title="Sure to delete this row?" @confirm="onDelete(record.id)">
                  <a>Reject <a-spin size="small" v-if="deleteReviewState.isLoading" /></a>
                </a-popconfirm>
              </span>
            </div>
          </template>
          <template v-if="column.key === 'status' && record.status === false"> Waiting for approve </template>

          <template v-if="column.key === 'status' && record.status === true"> Approved </template>
        </template>
      </a-table>

      <div class="d-flex justify-content-end mt-2">
        <a-pagination show-size-changer v-model:current="current" v-model:pageSize="pageSize" :total="reviewsState.data.totalElements" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useMenu } from '../../../stores/use-menu'
import { useReviewStore } from './store/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(['admin-reviews'])
    const store = useReviewStore()
    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 70
      },
      {
        title: 'Image',
        dataIndex: 'imgPreview',
        key: 'imgPreview',
        width: 70
      },
      {
        title: 'Short Description',
        dataIndex: 'shortDescription',
        key: 'shortDescription',
        width: 120
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: 100
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 70
      },
      {
        title: 'Action',
        key: 'action',
        width: 200,
        fixed: 'right'
      }
    ]

    const visible = ref(false)
    const current = ref(1)
    const pageSize = ref(10)

    const callGetReviewsAPI = async () => {
      await store.getReviews(current.value, pageSize.value)
    }

    watch(pageSize, () => {
      callGetReviewsAPI()
    })
    watch(current, () => {
      callGetReviewsAPI()
    })

    callGetReviewsAPI()

    const openModal = () => {
      visible.value = true
    }

    const handleSubmit = (data) => {
      console.log(data.roles)
    }
    const handleCancel = () => {
      visible.value = false
    }

    const save = async (id) => {
      await store.changeStatusReviewById(id)
      callGetReviewsAPI()
    }

    const onDelete = async (id) => {
      await store.deleteReviewById(id)
      callGetReviewsAPI()
    }
    return {
      columns,
      current,
      visible,
      pageSize,
      current,
      ...storeToRefs(store),
      onDelete,
      openModal,
      handleCancel,
      handleSubmit,
      save
    }
  }
})
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
