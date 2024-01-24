// 详情
export interface CategoryItem {
  id: number;
  /** 分类名称 */
  name: string;

  /** 父级分类id */
  parentId: number;

  children: CategoryItem[];
}
