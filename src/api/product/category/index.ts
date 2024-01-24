import { createGet, createPost } from "@/utils/request";
import { CategoryItem } from "./index.d";

// 获取树列表
export const getCategoryTreesApi = createGet<never, CategoryItem[]>("/category/trees");

// 获取信息
export const getCategoryInfoApi = createGet<{ id: number }, CategoryItem>("/category/info");
// 新增
export const createCategoryApi = createPost<Partial<CategoryItem>, never>("/category/create");
// 编辑
export const updateCategoryApi = createPost<Partial<CategoryItem>, never>("/category/update");
// 删除
export const delCategoryApi = createPost<{ id: number }, never>("/category/delete");
