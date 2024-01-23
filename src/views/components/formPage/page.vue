<template>
  <FormView ref="formView" v-model="formData" :columns="columns" labelPosition="top" label-suffix=":--" />
  <el-button type="primary" @click="sumbit()">保存</el-button>
  <el-button type="primary" @click="initilaData()">保存</el-button>
</template>

<script setup lang="ts" name="Form">
import { FormItem, FormViewInstance } from "@/components/FormView/index.d";

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
const columns: FormItem[] = reactive([
  {
    prop: "name",
    label: "Activity name",
    initilaData: "Hello",
    required: true,
    rule: [{ min: 3, max: 6, message: "Length should be 3 to 6", trigger: "blur" }],
    disabled: true,
    itemStyle: { flex: "0 0 100%" },
  },
  {
    prop: "zone",
    label: "Activity zone",
    initilaData: 1,
    required: true,
    type: "select",
    options: [
      {
        label: "Zone one",
        value: 1,
      },
      {
        label: "Zone two",
        value: 0,
      },
    ],
  },
  {
    prop: "count",
    label: "Activity count",
    initilaData: 1,
    required: true,
    type: "selectV2",
    options,
  },
  {
    prop: "time",
    label: "Activity time",
    initilaData: "",
    required: true,
    type: "date",
    elProps: {
      type: "date",
    },
  },
  {
    prop: "delivery",
    label: "Instant delivery",
    initilaData: 0,
    required: true,
    type: "switch",
  },
  {
    prop: "type",
    label: "Activity type",
    initilaData: [1],
    required: true,
    type: "checkbox",
    options: [
      {
        label: "Online activities",
        value: 1,
      },
      {
        label: "Promotion activities",
        value: 0,
      },
    ],
  },
  {
    prop: "resource",
    label: "Resources",
    initilaData: 1,
    required: true,
    type: "radio",
    options: [
      {
        label: "Sponsorship",
        value: 1,
      },
      {
        label: "Venue",
        value: 0,
      },
    ],
  },
  {
    prop: "desc",
    label: "Activity form",
    initilaData: "",
    required: true,
    elProps: {
      type: "textarea",
    },
  },
]);
const formData = reactive({});
const formView = ref<FormViewInstance>();

const sumbit = () => {
  formView.value!.submitForm(() => {
    console.log(1321);
  });
};

function initilaData() {
  formView.value!.initilaData();
}
</script>
