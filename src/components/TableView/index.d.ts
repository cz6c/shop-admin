import { VNode, ComponentPublicInstance } from "vue";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { TableProps } from "./index.vue";
import TableView from "./index.vue";

export interface Selection<T = any> {
  fixed?: boolean; // 把选择框列固定在左边
  selectedRows?: T[]; // 指定选中项数组
  onChange: (selectedRows: T[]) => void; //选中项发生变化时的回调
}

export type RenderScope<T> = {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

export type HeaderRenderScope<T> = {
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};
// 表格子项配置
export interface TableCol<T = any>
  extends Partial<Omit<TableColumnCtx<T>, "renderCell" | "renderHeader" | "prop" | "label">> {
  prop: string;
  label: string;
  visible?: boolean;
  headerRender?: (scope: HeaderRenderScope<T>) => VNode; // 自定义表头内容渲染（tsx语法）
  render?: (scope: RenderScope<T>) => VNode | string; // 自定义单元格内容渲染（tsx语法）
}

export type TableViewInstance = Omit<InstanceType<typeof TableView>, keyof ComponentPublicInstance | keyof TableProps>;
