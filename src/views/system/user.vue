<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { UserInfoType } from '@/api/user'
import PaginationEnhance from '@/components/PaginationEnhance.vue'

const formInline = reactive({
  name: '',
  gender: '',
  keywords: '',
  current: 1,
  pageSize: 10,
  total: 123,
})

const genderOption = ref([
  { name: '男', value: '0' },
  { name: '女', value: '1' },
])

function handleFilter() {
  console.log(formInline)
}
const multipleSelection = ref<UserInfoType[]>([])
const tableData = ref([
  {
    name: 'Aleyna Kutzner',
    date: '2016-05-04',
    address: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
  },
  {
    name: 'Helen Jacobi',
    date: '2016-05-03',
    address: '760 A Street, South Frankfield, Illinois',
  },
])

function handleSelectionChange(val: UserInfoType[]) {
  multipleSelection.value = val
}
</script>
<template>
  <div>
    <div class="h-table">
      <el-row>
        <el-col>
          <el-form
            ref="formRef"
            :model="formInline"
            :inline="true"
            class="flex"
          >
            <el-form-item label="姓名">
              <el-input v-model="formInline.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="formInline.gender"
                clearable
                style="width: 100px"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in genderOption"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input v-model="formInline.keywords" placeholder="请输入" />
            </el-form-item>
            <el-form-item class="ml-auto">
              <el-button type="primary" @click="handleFilter">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-scrollbar>
            <el-table
              :data="tableData"
              stripe
              class="w-full"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="date" label="Date" width="180" />
              <el-table-column prop="name" label="Name" width="180" />
              <el-table-column
                prop="address"
                label="Address"
                show-overflow-tooltip
              />
            </el-table>
          </el-scrollbar>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col>
        <PaginationEnhance
          v-model:current-page="formInline.current"
          v-model:page-size="formInline.pageSize"
          :total="formInline.total"
          @change="handleFilter"
        />
      </el-col>
    </el-row>
  </div>
</template>
<style scoped></style>
