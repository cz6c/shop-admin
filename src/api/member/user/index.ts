import { createGet, createPost } from "@/utils/request";
import { MemberListParams, MemberListResponse, MemberItem } from "./index.d";

// 获取列表
export const getMemberListApi = createGet<MemberListParams, MemberListResponse>("/member/list");

// 获取信息
export const getMemberInfoApi = createGet<{ id: string }, MemberItem>("/member/info");
// 新增
export const createMemberApi = createPost<Partial<MemberItem>, never>("/member/create");
// 编辑
export const updateMemberApi = createPost<Partial<MemberItem>, never>("/member/update");
// 删除
export const delMemberApi = createPost<{ id: string }, never>("/member/delete");
