import { createGet, createPost } from "@/utils/request";
import { UserListParams, UserListResponse, UserItem } from "./index.d";

// 获取列表
export const getUserListApi = createGet<UserListParams, UserListResponse>("/user/list");

// 获取信息
export const getLoginUserInfoApi = createGet<never, UserItem>("/user/info");

// 获取信息
export const getUserInfoApi = createGet<{ id: string }, UserItem>("/user/info");
// 新增
export const createUserApi = createPost<Partial<UserItem>, never>("/user/create");
// 编辑
export const updateUserApi = createPost<Partial<UserItem>, never>("/user/update");
// 状态切换
export const statusChangeApi = createPost<{ id: string; status: string | number | boolean }, never>("/user/status");
// 删除
export const delUserApi = createPost<{ id: string }, never>("/user/delete");
