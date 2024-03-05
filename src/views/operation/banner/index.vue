<script setup lang="tsx" name="Banner">
import TableView from "@/components/TableView/index.vue";
import { TableCol, TableViewInstance, Selection } from "@/components/TableView/index.d";
import { useTable } from "@/components/TableView/useTable";
import { getBannerListApi, delBannerApi, statusChangeApi } from "@/api/operation/banner";
import { BannerItem } from "@/api/operation/banner/index.d";
import { $message } from "@/utils/message";
import { dayjs } from "element-plus";
import BannerFormDrawer from "./components/BannerFormDrawer.vue";

const getListApi = getBannerListApi;
const delApi = delBannerApi;
const statusApi = statusChangeApi;

const columns: TableCol<BannerItem>[] = [
  {
    label: "跳转地址",
    prop: "hrefUrl",
  },
  {
    label: "轮播图片",
    prop: "imgUrl",
    render: ({ row: { imgUrl } }) => <el-image src={imgUrl} />,
  },
  {
    label: "备注",
    prop: "remark",
  },
  {
    label: "排序",
    prop: "sortNum",
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 165,
    formatter: ({ row }) => dayjs(row.createTime).format("YYYY/MM/DD HH:mm:ss"),
  },
  {
    label: "上架状态",
    prop: "status",
    render: ({ row }) => <el-switch v-model={row.status} onClick={() => statusChange(row.id)} />,
  },
  {
    label: "操作",
    prop: "action",
    width: 140,
    fixed: "right",
    render: ({ row }) => (
      <>
        <el-button link type="primary" size="small" onClick={() => goForm(row.id)}>
          编辑
        </el-button>
        <el-button link type="danger" size="small" onClick={() => del(row.id)}>
          删除
        </el-button>
      </>
    ),
  },
];
const selectList = ref<BannerItem[]>([]);
const selection: Selection<BannerItem> = {
  fixed: true,
  selectedRows: selectList.value,
  onChange(selection) {
    selectList.value = selection || [];
  },
};
const apiQuery = reactive({
  page: 1,
  limit: 20,
  total: 0,
  name: "",
  // createTime: "",
});

const tableRef = ref<TableViewInstance>();

const { loading, tableData, getList, pagination } = useTable({
  getListApi,
  apiQuery,
});
getList();

/**
 * @description: 新增/编辑
 * @param {*} id
 */
const isEdit = ref(false);
const nowId = ref("");
function goForm(id?: string) {
  nowId.value = id || "";
  isEdit.value = true;
}

/**
 * @description: 删除
 * @param {*} id
 */
async function del(id: string) {
  ElMessageBox.confirm("确定要删除该轮播图吗?", "删除轮播图", {
    type: "warning",
  })
    .then(async () => {
      try {
        await delApi({ id });
        getList();
        $message.success(`删除成功`);
      } catch (error: any) {
        $message.error(error.message);
      }
    })
    .catch();
}

/**
 * @description: 状态切换
 * @param {*} id
 */
async function statusChange(id: string) {
  try {
    await statusApi({ id });
    $message.success("切换成功");
    getList();
  } catch (error: any) {
    $message.error(error.message);
  }
}
</script>

<template>
  <div class="app-page">
    <div class="cz-card px16">
      <TableView
        ref="tableRef"
        :columns="columns"
        :data="tableData"
        :loading="loading"
        showHeader
        title="轮播图列表"
        :pagination="pagination"
        :selection="selection"
      >
        <template #header-tools>
          <el-button type="primary" @click="goForm()">新增轮播图</el-button>
        </template>
      </TableView>
    </div>
    <BannerFormDrawer :id="nowId" v-model="isEdit" @update-list="getList" />
  </div>
</template>

<style lang="scss" scoped></style>
