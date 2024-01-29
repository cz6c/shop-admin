import { isFunction } from "@/utils/is";
import { $message } from "@/utils/message";
import { cloneDeep } from "lodash-es";

export interface Params {
  getListApi: Fn;
  apiQuery: Record<string, any>;
  beforeFetch?: Fn;
  afterFetch?: Fn;
  columns?: TableCol;
}

export function useTable({ getListApi, apiQuery, beforeFetch, afterFetch, columns }: Params) {
  const state = reactive({
    loading: false,
    tableData: [],
  });
  const apiQueryDefault = cloneDeep(apiQuery);

  /**
   * @description: 获取列表数据
   */
  async function getList() {
    try {
      state.loading = true;
      const params = {};
      for (const key in apiQuery) {
        if (Object.prototype.hasOwnProperty.call(apiQuery, key)) {
          if (apiQuery[key]) params[key] = apiQuery[key];
        }
      }
      if (beforeFetch && isFunction(beforeFetch)) {
        params = beforeFetch(params);
      }
      const { data } = getListApi && isFunction(getListApi) && (await getListApi(params));
      state.tableData = data.list;
      if (afterFetch && isFunction(afterFetch)) {
        state.tableData = (await afterFetch(state.tableData)) || state.tableData;
      }
    } catch (error: any) {
      console.log(error);
      $message.warning(error.message);
    } finally {
      state.loading = false;
    }
  }

  /**
   * @description: 切换pageSize
   * @param {number} pageSize
   */
  const pageSizeChange = (pageSize: number) => {
    apiQuery.page = 1;
    apiQuery.limit = pageSize;
    getList();
  };

  /**
   * @description: 切换currentPage
   * @param {number} currentPage
   */
  const currentPageChange = (currentPage: number) => {
    apiQuery.page = currentPage;
    getList();
  };

  /**
   * @description: 重置搜索
   */
  function reset() {
    Object.assign(apiQuery, apiQueryDefault);
    getList();
  }

  /**
   * @description: 更新columns
   */
  const checkedColumns = ref<TableCol[]>(cloneDeep(columns));
  function updateColumn(data: TableCol[]) {
    checkedColumns.value = data;
  }

  return {
    ...toRefs(state),
    getList,
    reset,
    pageSizeChange,
    currentPageChange,
    checkedColumns,
    updateColumn,
  };
}
