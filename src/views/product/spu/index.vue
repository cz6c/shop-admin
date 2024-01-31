<script setup lang="tsx" name="Spu">
import TableView from "@/components/TableView/index.vue";
import { TableCol, TableViewInstance, Selection } from "@/components/TableView/index.d";
import { useTable } from "@/components/TableView/useTable";
import { SearchProps } from "@/components/SearchForm/type";
import { getProductListApi, statusChangeApi, delProductApi } from "@/api/product/spu";
import { ProductItem } from "@/api/product/spu/index.d";
import { $message } from "@/utils/message";

const getListApi = getProductListApi;
const delApi = delProductApi;
const statusApi = statusChangeApi;

const router = useRouter();

const searchList = reactive<SearchProps[]>([
  {
    el: "input",
    prop: "name",
    label: "商品名称",
  },
  {
    el: "date-picker",
    prop: "createTime",
    label: "创建时间",
    props: {
      type: "date",
    },
  },
]);
const columns: TableCol<ProductItem>[] = [
  {
    label: "商品名称",
    prop: "name",
  },
  {
    label: "商品编码",
    prop: "spuCode",
  },
  {
    label: "商品主图",
    prop: "mainPictures",
    render: ({ row: { mainPictures } }) => <el-image src={mainPictures[0]} />,
  },
  {
    label: "商品描述",
    prop: "desc",
  },
  {
    label: "商品分类",
    prop: "categoryName",
  },
  {
    label: "当前价格",
    prop: "price",
  },
  {
    label: "上架状态",
    prop: "status",
    render: ({ row }) => <el-switch v-model={row.status} click={statusChange(row.status, row.id)} />,
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
];
const selectList = ref<ProductItem[]>([]);
const selection: Selection<ProductItem> = {
  selectedRows: selectList.value,
  onChange(selection: ProductItem[]) {
    selectList.value = selection || [];
  },
};
const apiQuery = reactive({
  page: 1,
  limit: 20,
  total: 0,
  name: "",
  createTime: "",
});

const tableRef = ref<TableViewInstance>();

const { loading, tableData, reset, search, getList, pagination } = useTable({
  getListApi,
  apiQuery,
});
getList();

/**
 * @description: 编辑
 * @param {*} id
 */
function goForm(id?: number) {
  console.log(1);
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
async function statusChange(status: boolean, id: number) {
  console.log(id, status);
  try {
    await statusApi({ status, id });
    $message.success("切换成功");
    getList();
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
  <div class="app-page flex flex-col">
    <div class="cz-card mb-10 p16 pb0">
      <SearchForm :columns="searchList" :search-param="apiQuery" @search="search" @reset="reset" />
    </div>
    <div class="cz-card flex-1-hidden px16">
      <TableView
        ref="tableRef"
        :columns="columns"
        :data="tableData"
        :loading="loading"
        showHeader
        title="商品列表"
        :pagination="{ ...pagination, pageQuery: apiQuery }"
        :selection="selection"
      >
        <template #header-tools>
          <el-button type="primary" @click="goForm()">新增商品</el-button>
        </template>
        <template #action="{ row }">
          <el-button link type="primary" size="small" @click="goDetails(row.id)">详情</el-button>
          <el-button link type="primary" size="small" @click="goForm(row.id)">编辑</el-button>
          <el-button link type="danger" size="small" @click="del(row.id)">删除</el-button>
        </template>
      </TableView>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
