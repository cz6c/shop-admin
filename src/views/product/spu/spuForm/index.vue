<script lang="ts" setup name="SpuForm">
import { createProductApi, updateProductApi } from "@/api/product/spu";
import { ProductItem } from "@/api/product/spu/index.d";
import GenerateSku from "./components/GenerateSku.vue";
import { useCategory } from "@/views/product/category/useCategory";
import { FormItem, FormViewInstance } from "@/components/FormView/index.d";
import { $message } from "@/utils/message";

const { options, getCategoryTrees } = useCategory();
getCategoryTrees();

const formData = reactive({
  name: "66",
  categoryIds: [1],
  desc: "66",
  price: 0,
  mainPictures: [{ url: "http://qiniu.cz6hy9.top/test/3d79a516792242270a843c0c87baa67c.png" }],
  pictures: [{ url: "http://qiniu.cz6hy9.top/test/3d79a516792242270a843c0c87baa67c.png" }],
  specs: [
    { name: "颜色", options: ["红色", "紫色"] },
    { name: "套餐", options: ["套餐一", "套餐二"] },
    { name: "内存", options: ["128G", "256G"] },
  ],
  skus: [],
});
const columns = reactive<FormItem[]>([
  {
    prop: "name",
    label: "商品名称",
    required: true,
    type: "input",
  },
  {
    prop: "categoryIds",
    label: "商品分类",
    required: true,
    type: "cascader",
    props: { options, props: { value: "id", label: "name", checkStrictly: true } },
  },
  {
    prop: "price",
    label: "商品价格",
    required: true,
    type: "input-number",
    props: {
      min: 0.01,
      precision: 2,
    },
  },
  {
    prop: "status",
    label: "商品状态",
    required: true,
    type: "switch",
    props: {
      activeValue: 1,
      inactiveValue: 0,
      activeText: "已上架",
      inactiveText: "已下架",
    },
  },
  {
    prop: "desc",
    label: "商品描述",
    required: true,
    type: "input",
    props: {
      type: "textarea",
    },
    span: 16,
  },
  {
    prop: "mainPictures",
    label: "商品主图",
    required: true,
    type: "uploads",
    props: {
      width: "100px",
      height: "100px",
    },
    span: 24,
  },
  {
    prop: "pictures",
    label: "商品详情图",
    required: true,
    type: "uploads",
    props: {
      width: "100px",
      height: "100px",
    },
    span: 24,
  },
]);
const formView = ref<FormViewInstance>();

const router = useRouter();

const id = computed(() => Number(router.currentRoute.value.query.id) || 0);

const loading = ref(false);
const sumbit = () => {
  formView.value!.submitForm(async () => {
    if (loading.value) return;
    loading.value = true;
    const json: Partial<ProductItem> = {
      ...formData,
      categoryId: formData.categoryIds[formData.categoryIds.length - 1] || 0,
      mainPictures: formData.mainPictures.map(({ url }) => url),
      pictures: formData.pictures.map(({ url }) => url),
    };
    let api = createProductApi;
    if (id.value) {
      json.id = id.value;
      api = updateProductApi;
    }
    try {
      await api(json);
      loading.value = false;
      $message.success("提交成功");
      router.go(-1);
    } catch (error) {
      loading.value = false;
    }
  });
};

function initData() {
  formView.value!.initData();
}
</script>

<template>
  <div class="cz-card">
    <div class="title">基本信息</div>
    <FormView ref="formView" v-model="formData" :columns="columns" />
    <div class="title">规格信息</div>
    <GenerateSku v-model:specs="formData.specs" v-model:skus="formData.skus" />
    <div class="mt-16">
      <el-button :loading="loading" @click="initData()"> 重置 </el-button>
      <el-button type="primary" :loading="loading" @click="sumbit()"> 提交 </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cz-card {
  padding: 20px;
  box-sizing: border-box;
}
.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}
</style>