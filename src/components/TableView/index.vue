<script lang="ts" setup name="TableView">
import type { ElTable } from "element-plus";
import TableColumn from "./components/TableColumn.vue";
import { TableCol, Selection } from "./index.d";
import { cloneDeep } from "lodash-es";
import { Pagination } from "./components/TableFooter.vue";

// 表格配置
export interface TableProps {
  columns: TableCol[]; // 列配置项  ==> 必传
  data: any[]; // data ==> 必传
  loading?: boolean;
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染。
  isIndexCol?: boolean; // 序号列
  showHeader?: boolean; // 显示头部操作栏
  title?: string; // 列表标题 需 showHeader 为true
  pagination?: Pagination; // 分页器
  selection?: Selection; // 多选配置
  actionWidth?: string; // 操作列宽度
  actionFixed?: boolean; // 操作列是否右浮固定
}

const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  rowKey: "id",
  isIndexCol: false,
  showHeader: false,
  title: "",
  pagination: null,
  selection: null,
  actionWidth: "150",
  actionFixed: true,
});

const tableRef = ref<InstanceType<typeof ElTable>>();

/**
 * @description: 更新columns
 */
const checkedColumns = ref<TableCol[]>(cloneDeep(props.columns));
function updateColumn(data: TableCol[]) {
  checkedColumns.value = data;
}

/**
 * @description: 列表事件传递
 */
const emits = defineEmits([
  "row-click", // 当某一行被点击时会触发该事件
]);
const handleRowClick = (row: any, column: any, event: MouseEvent) => {
  emits("row-click", row, column, event);
};

defineExpose({
  tableRef,
});
</script>
<template>
  <div class="table-view">
    <!-- 表格头部 -->
    <TableHeader
      v-if="showHeader"
      ref="tableHeaderRef"
      :title="title"
      :columns="columns"
      @update-columns="updateColumn"
    >
      <template #tools>
        <slot name="header-tools"></slot>
      </template>
    </TableHeader>
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="data"
      :rowKey="rowKey"
      @selection-change="selection && selection.onChange"
      @row-click="handleRowClick"
      v-loading="loading"
    >
      <!-- selection || index  -->
      <el-table-column
        v-if="selection"
        align="center"
        type="selection"
        width="50"
        :fixed="selection.fixed"
        reserve-selection
      />
      <el-table-column v-if="isIndexCol" align="center" type="index" width="50" label="序号" />
      <!-- other -->
      <template v-for="(item, index) in showHeader ? checkedColumns : columns" :key="index">
        <template v-if="!showHeader || (showHeader && item.visible)">
          <TableColumn :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" v-bind="scope"></slot>
            </template>
          </TableColumn>
        </template>
      </template>
      <!-- 操作列插槽 -->
      <el-table-column
        v-if="$slots.action"
        align="center"
        label="操作"
        :width="actionWidth"
        :fixed="actionFixed ? 'right' : null"
      >
        <template #default="scope">
          <slot name="action" v-bind="scope"></slot>
        </template>
      </el-table-column>
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
    <TableFooter v-if="pagination" v-bind="pagination" />
  </div>
</template>
<style lang="scss" scoped>
.table-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

// el-table 表格样式
:deep(.el-table) {
  flex: 1;
}
</style>
