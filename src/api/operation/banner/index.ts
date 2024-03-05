import { createGet, createPost } from "@/utils/request";
import { BannerListParams, BannerListResponse, BannerItem } from "./index.d";

// 获取列表
export const getBannerListApi = createGet<BannerListParams, BannerListResponse>("/banner/list");

// 获取信息
export const getBannerInfoApi = createGet<{ id: string }, BannerItem>("/banner/info");
// 新增
export const createBannerApi = createPost<Partial<BannerItem>, never>("/banner/create");
// 编辑
export const updateBannerApi = createPost<Partial<BannerItem>, never>("/banner/update");
// 删除
export const delBannerApi = createPost<{ id: string }, never>("/banner/delete");
// 状态切换
export const statusChangeApi = createGet<{ id: string }, never>("/banner/statusCheck");
