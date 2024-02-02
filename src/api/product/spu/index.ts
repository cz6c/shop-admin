import { createGet, createPost } from "@/utils/request";
import { ProductListParams, ProductListResponse, ProductItem } from "./index.d";

// 获取列表
export const getProductListApi = createGet<ProductListParams, ProductListResponse>("/product/list");

// 获取信息
export const getProductInfoApi = createGet<{ id: string }, ProductItem>("/product/info");
// 新增
export const createProductApi = createPost<Partial<ProductItem>, never>("/product/create");
// 编辑
export const updateProductApi = createPost<Partial<ProductItem>, never>("/product/update");
// 状态切换
export const statusChangeApi = createGet<{ id: string }, never>("/product/statusCheck");
// 删除
export const delProductApi = createPost<{ id: string }, never>("/product/delete");

// 批量删除sku
export const betchDelSkuApi = createPost<{ ids: string[] }, never>("/sku/delete");

// 批量删除规格
export const betchDelSpecsApi = createPost<{ ids: string[] }, never>("/specs/delete");
