<script setup lang="ts" name="Category">
import { TableCol, TableViewInstance } from "@/components/TableView";
import { getCategoryTreesApi, delCategoryApi } from "@/api/product/category";
import { CategoryItem } from "@/api/product/category/index.d";
import CategoryFormDrawer from "./components/CategoryFormDrawer.vue";
import { $message } from "@/utils/message";
import { useTable } from "@/components/TableView/useTable";

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

const { loading, tableData, getList } = useTable({
  getListApi,
  apiQuery: {},
});
getList();

const _isEdit = ref(false);
const _id = ref("");
/**
 * @description: 新增
 */
function add() {
  _id.value = "";
  _isEdit.value = true;
}
/**
 * @description: 编辑
 * @param {*} id
 */
function edit(id: string) {
  _id.value = id;
  _isEdit.value = true;
}

/**
 * @description: 删除
 * @param {*} id
 */
async function del(id: string) {
  ElMessageBox.confirm("proxy will permanently delete the file. Continue?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      try {
        await delApi({ id });
        getList();
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

<template>
  <div class="app-page cz-card px16">
    <TableView ref="tableRef" :columns="columns" :data="tableData" :loading="loading" showHeader title="分类列表">
      <template #header-tools>
        <el-button type="primary" @click="add">新增分类</el-button>
      </template>
      <template #action="{ row }">
        <el-button link type="primary" size="small" @click="edit(row.id)">编辑</el-button>
        <el-button link type="danger" size="small" @click="del(row.id)">删除</el-button>
      </template>
    </TableView>
    <CategoryFormDrawer v-model="_isEdit" :id="_id" @update-list="getList" />
  </div>
</template>
