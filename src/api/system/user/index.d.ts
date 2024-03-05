import { GetListParams, GetListResponse } from "@/api/public/index.d";
// 详情
export interface UserItem {
  id: string;
  createTime: string;
  updateTime: string;
  username: string;
  nickname: string;
  avatar: string;
  birthday: string;
  gender: number;
  profession: string;
}

// 列表
export type UserListResponse = GetListResponse<UserItem>;
export interface UserListParams extends GetListParams {
  username?: string;
}
