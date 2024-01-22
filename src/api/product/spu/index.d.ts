import { GetListParams, GetListResponse } from "@/api/public/index.d";
// 详情
export interface ProductItem {
  /** 商品名称 */
  name: string;

  /** 商品描述 */
  desc: string;

  /** 当前价格 */
  price: number;

  /** 主图图片集合[ 主图图片链接 ] */
  mainPictures: string[];

  /** 商品详情图片集合[ 图片链接 ] */
  pictures: string[];

  /** 一对多sku */
  skus: SkuItem[];

  /** 多对多规格 */
  specs: SpecificationItem[];

  /** 多对一分类 */
  category: string;

  status: 0 | 1;

  isDelete: 0 | 1;
}
// 新增/编辑body
export interface ProductInfo extends Omit<ProductItem, "id" | "status" | "isDelete"> {
  id?: number;
  status?: 0 | 1;
  isDelete?: 0 | 1;
}
// 列表
export type ProductListResponse = GetListResponse<ProductItem>;
export interface ProductListParams extends GetListParams {
  username?: string;
}

export interface SkuItem {
  /** sku名称 */
  skuName: string;

  /** 库存 */
  inventory: number;

  /** 成本价 */
  costPrice: number;

  /** 当前价格 */
  price: number;

  /** sku图片 */
  picture: string;

  /** sku编码 */
  skuCode: string;

  /** 规格集合[ 规格信息 ] */
  specs: string;
}

export type SpecificationItem = {
  /** 规格名称 */
  name: string;

  /** 规格值数组 */
  options: string[];
};
