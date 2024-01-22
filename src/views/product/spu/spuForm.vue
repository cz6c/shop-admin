<script lang="ts" setup name="ProductFormDrawer">
import { FormInstance, FormRules } from "element-plus";
import { useFrom } from "@/hooks/useFrom";
import { saveProductApi, updateProductApi } from "@/api/product/spu";
import { ProductInfo } from "@/api/product/spu/index.d";
import GenerateSku from "./components/GenerateSku.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  id: {
    type: Number,
  },
});
const emits = defineEmits(["update:modelValue"]);

const dialog = computed({
  get: () => props.modelValue,
  set: value => {
    emits("update:modelValue", value);
  },
});

const loading = ref(false);

const ruleFormRef = ref<FormInstance>();
const formData = reactive({
  username: "",
  remark: "",
  roleId: "",
  deptId: "",
  avatar: "",
});
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "Please input activity form", trigger: "blur" }],
});
const handleSubmit = async () => {
  loading.value = true;
  console.log(formData);
  const json: ProductInfo = {
    ...formData,
  };
  let api = saveProductApi;
  if (props.id) {
    json.id = props.id;
    api = updateProductApi;
  }
  try {
    await api(json);
  } catch (error) {}
  setTimeout(() => {
    loading.value = false;
    dialog.value = false;
  }, 600);
};
const { resetForm, submitForm } = useFrom(handleSubmit);

const handleOpen = () => {
  resetForm(unref(ruleFormRef));
};
</script>

<template>
  <div class="cz-card">
    <div>基本信息</div>
    <el-form :model="formData" status-icon ref="ruleFormRef" :rules="rules" label-width="120px">
      <el-form-item label="username" prop="username">
        <el-input v-model="formData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="remark" prop="remark">
        <el-input v-model="formData.remark" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div>规格信息</div>
    <GenerateSku />
    <div class="demo-drawer__footer">
      <el-button @click="dialog = false">Cancel</el-button>
      <el-button type="primary" :loading="loading" @click="submitForm(ruleFormRef)">{{
        loading ? "Submitting ..." : "Submit"
      }}</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cz-card {
  padding: 20px;
  box-sizing: border-box;
}
</style>
