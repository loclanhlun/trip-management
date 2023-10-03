<template>
  <h3 class="text-center mt-5 mb-5">Danh sách bài đăng</h3>
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
                <a-typography-link @click="save(record.id)">Duyệt<a-spin size="small" v-if="reviewsState.isLoading" /></a-typography-link>
              </span>
              <span v-if="record.status === false">
                <a-popconfirm title="Sure to delete this row?" @confirm="onDelete(record.id)">
                  <a>Từ chối <a-spin size="small" v-if="deleteReviewState.isLoading" /></a>
                </a-popconfirm>
              </span>
            </div>
          </template>
          <template v-if="column.key === 'imgPreview'">
            <img :src="record.imgPreview" style="width: 200px; height: auto; background-repeat: no-repeat; background-size: contain" />
          </template>
          <template v-if="column.key === 'status' && record.status === false">
            <a-tag color="#54B4D3"> Đang chờ duyệt </a-tag>
          </template>

          <template v-if="column.key === 'status' && record.status === true"> <a-tag color="green"> Đã duyệt </a-tag></template>
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
import { message } from 'ant-design-vue'
export default defineComponent({
  setup() {
    useMenu().onSelectedKeys(['admin-reviews'])
    const store = useReviewStore()
    const columns = [
      {
        title: 'Tiêu Đề',
        dataIndex: 'title',
        key: 'title',
        width: 150
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'imgPreview',
        key: 'imgPreview',
        width: 250
      },
      {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        width: 200
      },
      {
        title: 'Tình trạng',
        dataIndex: 'status',
        key: 'status',
        width: 120
      },
      {
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

    const handleCancel = () => {
      visible.value = false
    }

    const save = async (id) => {
      await store.changeStatusReviewById(id)
      if (store.changeStatusReviewState.data.statusCode === 200) {
        message.success('Thành công')
      } else {
        message.error('Thất bại')
      }
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
      ...storeToRefs(store),
      onDelete,
      openModal,
      handleCancel,
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
