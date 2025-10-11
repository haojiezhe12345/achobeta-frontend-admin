<script setup lang="ts">
import { SmileOutlined } from '@ant-design/icons-vue'
import { getColor } from './utils'
import { getResumeStatusApi } from '~/api/resumeStatus'

interface ResumeStatus {
  code: number
  message: string
}

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  batchId: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
    require: true,
  },
})
const childModal = ref<any | null>(null)// 子组件的引用
const stateList = ref<ResumeStatus[]>()
const columnData = ref(computed(() => props.data))

const columns = computed(() => [
  {
    name: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    fixed: 'left',
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
    width: 100,
  },
  {
    title: '专业',
    dataIndex: 'major',
    key: 'major',
    width: 150,
  },
  {
    title: '班级',
    dataIndex: 'className',
    key: 'className',
    width: 150,
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
    width: 80,
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    key: 'studentId',
    width: 150,
  },
  {
    title: '简历状态',
    key: 'status',
    dataIndex: 'status',
    width: 140,
    // 添加筛选功能
    filters: stateList.value
      ? stateList.value.map((item: any) => ({
        text: item.message,
        value: item.code,
      }))
      : [],
    onFilter: (value: string | number | boolean, record: any) => record.status === Number(value),
    filterMultiple: true,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '简历',
    key: 'resume',
    dataIndex: 'resumeId',
    width: 150,
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    fixed: 'right',
  },
])

const getresumeStatus = async () => {
  const res = await getResumeStatusApi()
  stateList.value = res.data
}

const getresumeDetail = (batchid: string, userid: string) => {
  childModal.value.showModal(batchid, userid, props.batchId)
}

onMounted(() => {
  getresumeStatus()
})
</script>

<template>
  <div class="p-2">
    <a-table
      :loading="props.loading"
      :columns="columns"
      :data-source="columnData"
      :scroll="{ x: 1700 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <SmileOutlined />
            姓名
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>

        <template v-if="column.key === 'gender'">
          <a-tag
            v-if="record.gender === 1"
            color="pink"
          >
            女
          </a-tag>
          <a-tag
            v-else
            color="blue"
          >
            男
          </a-tag>
        </template>
        <template v-if="column.key === 'resume'">
          <a-button
            type="link"
            @click="getresumeDetail(record.resumeId, record.userId)"
          >
            查看简历
          </a-button>
        </template>

        <template v-else-if="column.key === 'status'">
          <span>
            <a-tag :color="getColor(record.status)">
              {{ stateList?.find(item => item.code === record.status)?.message || record.status }}
            </a-tag>
          </span>
        </template>

        <template v-else-if="column.key === 'tags'">
          <span>
            <div
              v-for="item in stateList"
              :key="item.code"
            >
              <div v-if="record.status === item.code">
                <a-tag :color="getColor(item.code)">{{ item.message }}</a-tag>
              </div>
            </div>

          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a-button
              type="primary"
              @click="getresumeDetail(record.resumeId, record.userId)"
            >详情</a-button>

            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
  </div>
  <resume-editModal ref="childModal" />
</template>

<style scoped></style>
