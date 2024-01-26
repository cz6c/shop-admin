<script setup lang="ts" name="Spu">
import { TableCol, TableViewInstance } from "@/components/TableView/type";
import { SearchProps } from "@/components/SearchForm/type";
import { getProductListApi, statusChangeApi, delProductApi } from "@/api/product/spu";
import { ProductItem } from "@/api/product/spu/index.d";
import { ElMessageBox } from "element-plus";
import { $message } from "@/utils/message";

const getListApi = getProductListApi;
const delApi = delProductApi;
const statusApi = statusChangeApi;

const columns: TableCol<ProductItem>[] = [
  {
    label: "商品名称",
    prop: "name",
  },
  {
    label: "商品描述",
    prop: " ",
  },
  {
    label: "roleId",
    prop: "roleId",
  },
  {
    label: "当前价格",
    prop: "price",
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];
const searchList = reactive<SearchProps[]>([
  {
    el: "input",
    prop: "name",
    label: "商品名称",
    defaultValue: "",
  },
  {
    el: "date-picker",
    defaultValue: "",
    prop: "createTime",
    label: "创建时间",
    props: {
      type: "date",
    },
  },
]);

const tableRef = ref<TableViewInstance>();

/**
 * @description: 列表选中
 * @param {*} selection
 */
const selectList: any = ref([]);
function selectionChange(selection: any[]) {
  selectList.value = selection || [];
}

const router = useRouter();

/**
 * @description: 编辑
 * @param {*} id
 */
function goForm(id?: number) {
  router.push({
    name: "SpuForm",
    query: {
      id,
    },
  });
}
function goDetails(id: number) {
  router.push({
    name: "SpuDetails",
    query: {
      id,
    },
  });
}
/**
 * @description: 状态切换
 * @param {*} status
 * @param {*} id
 */
async function statusChange(status: 0 | 1, id: number) {
  console.log(id, status);
  try {
    await statusApi({ status, id });
    $message.success("切换成功");
    tableRef?.value?.getList();
  } catch (error: any) {
    $message.error(error.message);
  }
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

<template>
  <div class="app-page">
    <TableView
      ref="tableRef"
      :columns="columns"
      :getListApi="getListApi"
      :searchColumns="searchList"
      pagination
      title="商品列表"
      @selection-change="selectionChange"
    >
      <template #table-tools>
        <el-button type="primary" @click="goForm()">新增商品</el-button>
      </template>
      <template #status="{ row }">
        <el-switch
          v-model="row.status"
          :active-value="1"
          :inactive-value="0"
          @click="statusChange(row.status, row.id)"
        />
      </template>
      <template #action="{ row }">
        <el-button link type="primary" size="small" @click="goDetails(row.id)">详情</el-button>
        <el-button link type="primary" size="small" @click="goForm(row.id)">编辑</el-button>
        <el-button link type="danger" size="small" @click="del(row.id)">删除</el-button>
      </template>
    </TableView>
  </div>
</template>

<style lang="scss" scoped></style>
