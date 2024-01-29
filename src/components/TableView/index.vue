<script lang="ts" setup name="TableView">
import type { ElTable } from "element-plus";
import TableColumn from "./components/TableColumn.vue";
import { TableCol } from "./index.d";

// 表格配置
export interface TableProps {
  columns: TableCol[]; // 列配置项  ==> 必传
  data: any[]; // data ==> 必传
  loading?: boolean;
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染。
  isSelectionCol?: boolean;
  isIndexCol?: boolean;
}

const props = withDefaults(defineProps<TableProps>(), {
  rowKey: "id",
  loading: false,
  isSelectionCol: false,
  isIndexCol: false,
});

const tableRef = ref<InstanceType<typeof ElTable>>();

/**
 * @description: 列表事件传递
 */
const emits = defineEmits([
  "selection-change", // 当选择项发生变化时会触发该事件
  "row-click", // 当某一行被点击时会触发该事件
]);
const handleSelectionChange = (val: any) => {
  emits("selection-change", val);
};
const handleRowClick = (row: any, column: any, event: MouseEvent) => {
  emits("row-click", row, column, event);
};
</script>
<template>
  <div class="table-view">
    <!-- 表格搜索 -->
    <div class="table-search cz-card">
      <slot name="table-search"></slot>
    </div>
    <div class="table-main cz-card">
      <!-- 表格头部 -->
      <slot name="table-header"></slot>
      <!-- 表格主体 -->
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        :data="props.data"
        :rowKey="props.rowKey"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        v-loading="props.loading"
      >
        <!-- selection || index  -->
        <el-table-column v-if="isSelectionCol" align="center" type="selection" width="50" reserve-selection />
        <el-table-column v-if="isIndexCol" align="center" type="index" width="60" label="序号" />
        <!-- other -->
        <template v-for="(item, index) in columns" :key="index">
          <TableColumn :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" v-bind="scope"></slot>
            </template>
          </TableColumn>
        </template>
        <!-- 默认插槽 -->
        <slot></slot>
        <!-- 插入表格最后一行之后的插槽 -->
        <template #append>
          <slot name="table-append"> </slot>
        </template>
        <!-- 无数据 -->
        <template #empty>
          <div class="table-empty">
            <slot name="table-empty"> </slot>
          </div>
        </template>
      </el-table>
      <!-- 分页器 -->
      <slot name="table-footer"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .table-search {
    margin-bottom: 10px;
    padding: 18px 18px 0;
  }

  .table-main {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
    // padding: 0 16px;
    box-sizing: border-box;
  }
}

// el-table 表格样式
:deep(.el-table) {
  flex: 1;
}
</style>
.
