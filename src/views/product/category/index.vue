<template>
  <div class="app-page">
    <TableView
      ref="tableRef"
      :columns="columns"
      :getListApi="getListApi"
      title="分类列表"
      @selection-change="selectionChange"
    >
      <template #table-tools>
        <el-button type="primary" @click="add">新增分类</el-button>
      </template>
      <template #action="{ row }">
        <el-button link type="primary" size="small" @click="edit(row.id)">编辑</el-button>
        <el-button link type="danger" size="small" @click="del(row.id)">删除</el-button>
      </template>
    </TableView>
    <CategoryFormDrawer v-model="_isEdit" :id="_id" @update-list="tableRef?.getList" />
  </div>
</template>
<script setup lang="ts" name="Category">
import { TableCol, TableViewInstance } from "@/components/TableView/type";
import { getCategoryTreesApi, delCategoryApi } from "@/api/product/category";
import { CategoryItem } from "@/api/product/category/index.d";
import CategoryFormDrawer from "./components/CategoryFormDrawer.vue";
import { ElMessageBox } from "element-plus";
import { $message } from "@/utils/message";

const getListApi = getCategoryTreesApi;
const delApi = delCategoryApi;

const columns: TableCol<CategoryItem>[] = [
  {
    label: "分类名称",
    prop: "name",
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];

const tableRef = ref<TableViewInstance>();

/**
 * @description: 列表选中
 * @param {*} selection
 */
const selectList: any = ref([]);
function selectionChange(selection: any[]) {
  selectList.value = selection || [];
}

const _isEdit = ref(false);
const _id = ref(0);
/**
 * @description: 新增
 */
function add() {
  _id.value = 0;
  _isEdit.value = true;
}
/**
 * @description: 编辑
 * @param {*} id
 */
function edit(id: number) {
  _id.value = id;
  _isEdit.value = true;
}

/**
 * @description: 删除
 * @param {*} id
 */
async function del(id: number) {
  ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      try {
        await delApi({ id });
        tableRef?.value?.getList();
        $message.success(`Delete completed`);
      } catch (error: any) {
        $message.error(error.message);
      }
    })
    .catch(() => {
      $message.info(`Delete canceled`);
    });
}
</script>
@/components/TableView
