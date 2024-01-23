<script lang="ts" setup name="SpuForm">
import { saveProductApi, updateProductApi } from "@/api/product/spu";
import { ProductInfo } from "@/api/product/spu/index.d";
import GenerateSku from "./components/GenerateSku.vue";
import { FormItem, FormViewInstance } from "@/components/FormView/index.d";

const formData = reactive({
  name: "Hello",
  desc: "",
  price: 0,
  mainPictures: [],
  pictures: [],
  category: "",
  skus: [],
  specs: [],
});
const columns = reactive<FormItem[]>([
  {
    prop: "name",
    label: "商品名称",
    required: true,
    rules: [{ min: 3, max: 6, message: "Length should be 3 to 6", trigger: "blur" }],
    type: "input",
  },
  {
    prop: "category",
    label: "商品分类",
    required: true,
    type: "cascader",
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
    prop: "delivery",
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
      width: "160px",
      height: "160px",
    },
    span: 24,
  },
  {
    prop: "pictures",
    label: "商品详情图",
    required: true,
    type: "uploads",
    props: {
      width: "60px",
      height: "60px",
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
    console.log(1321);
    loading.value = true;
    console.log(formData);
    const json: ProductInfo = {
      ...formData,
    };
    let api = saveProductApi;
    if (id.value) {
      json.id = id.value;
      api = updateProductApi;
    }
    try {
      await api(json);
    } catch (error) {}
    setTimeout(() => {
      loading.value = false;
    }, 600);
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
    <GenerateSku />
    <div class="mt-16">
      <el-button type="primary" :loading="loading" @click="sumbit()">
        {{ loading ? "提交中..." : "提交" }}
      </el-button>
      <el-button type="primary" :loading="loading" @click="initData()">
        {{ loading ? "重置中..." : "重置" }}
      </el-button>
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
