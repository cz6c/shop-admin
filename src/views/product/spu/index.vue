<script setup lang="tsx" name="Spu">
import TableView from "@/components/TableView/index.vue";
import { TableCol, TableViewInstance } from "@/components/TableView/index.d";
import { useTable } from "@/components/TableView/useTable";
import { SearchProps } from "@/components/SearchForm/type";
import { getProductListApi, statusChangeApi, delProductApi } from "@/api/product/spu";
import { ProductItem } from "@/api/product/spu/index.d";
import { $message } from "@/utils/message";

const getListApi = getProductListApi;
const delApi = delProductApi;
const statusApi = statusChangeApi;

const router = useRouter();

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
    label: "创建时间",
    prop: "createTime",
  },
  {
    label: "操作",
    prop: "action",
    render: ({ row }) => (
      <>
        {/* <el-button link={true} type="primary" size="small" onClick={goDetails(row.id)}>
          详情
        </el-button>
        <el-button link={true} type="primary" size="small" onClick={goForm(row.id)}>
          编辑
        </el-button>
        <el-button link={true} type="danger" size="small" onClick={del(row.id)}>
          删除
        </el-button> */}
      </>
    ),
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
const apiQuery = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableRef = ref<TableViewInstance>();

const { loading, tableData, checkedColumns, reset, getList, pageSizeChange, currentPageChange, updateColumn } =
  useTable({
    getListApi,
    apiQuery,
    columns,
  });
getList();

/**
 * @description: 列表选中
 * @param {*} selection
 */
const selectList: any = ref([]);
function selectionChange(selection: any[]) {
  selectList.value = selection || [];
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
  <div class="app-page">
    <TableView
      ref="tableRef"
      :columns="columns"
      :data="tableData"
      :loading="loading"
      @selection-change="selectionChange"
    >
      <template #table-search>
        <SearchForm :columns="searchList" :search-param="apiQuery" @search="getList" @reset="reset" />
      </template>
      <template #table-header>
        <TableHeader
          ref="tableHeaderRef"
          title="商品列表"
          :columns="columns"
          @update-columns="updateColumn"
          @update-list="getList"
        >
          <template #tools>
            <el-button type="primary" @click="goForm()">新增商品</el-button>
          </template>
        </TableHeader>
      </template>
      <template #table-footer>
        <TableFooter
          :pageQuery="apiQuery"
          :handleSizeChange="pageSizeChange"
          :handleCurrentChange="currentPageChange"
        />
      </template>
      <template #status="{ row }">
        <el-switch
          v-model="row.status"
          :active-value="1"
          :inactive-value="0"
          @click="statusChange(row.status, row.id)"
        />
      </template>
    </TableView>
  </div>
</template>

<style lang="scss" scoped></style>
