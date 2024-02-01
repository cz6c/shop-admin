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
export const statusChangeApi = createPost<{ id: string; status: string | number | boolean }, never>("/product/status");
// 删除
export const delProductApi = createPost<{ id: string }, never>("/product/delete");
