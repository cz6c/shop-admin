<script setup lang="ts" name="GenerateSku">
import { SpecificationItem, SkuItem } from "@/api/product/spu/index.d";

const specList = defineModel<SpecificationItem[]>("specs", { required: true });
const skuList = defineModel<SkuItem[]>("skus", { required: true });

const optionsInputVal = ref<string[]>([]);

function addSpecsItem() {
  if (specList.value.length > 3) return;
  specList.value.push({
    name: "",
    options: [],
  });
}

function handleBlur(item: SpecificationItem, idx: number) {
  if (!optionsInputVal.value[idx] || item.options.includes(optionsInputVal.value[idx])) return;
  item.options.push(optionsInputVal.value[idx]);
  optionsInputVal.value[idx] = "";
}

/**
 * @description: 笛卡尔积生成sku列表
 * @param {SpecificationItem} specList
 */
function generateSKUs(specList: SpecificationItem[]) {
  const arr = specList.map(x => [x.options.filter(Boolean)]);
  return arr.reduce((pre, cur) => pre.flatMap(x => cur[0].map(y => [...x, y])), [[]]);
}

function handleGenerate() {
  skuList.value = generateSKUs(specList.value).map(specs => ({
    specs: specs.map((spec, i) => `${specList.value[i].name}:${spec}`).join(";"),
    costPrice: 0,
    price: 0,
    inventory: 0,
    skuName: "",
    picture: "",
    skuCode: "",
  }));
}

const num = ref(1);
function setPrice() {
  skuList.value.forEach(c => (c.price = c.costPrice * num.value));
}
</script>

<template>
  <div class="generate-sku">
    <!-- 规格 -->
    <div class="mt-12" v-for="(item, idx) in specList" :key="idx">
      <div>
        <div class="flex-y-center justify-between bg-#F5F7FA p-10">
          <div class="flex-y-center">
            <span class="flex-60px">规格名：</span>
            <el-input v-model="item.name" />
          </div>
          <el-button class="ml-8" link type="danger" @click="() => specList.splice(idx, 1)"> 删除 </el-button>
        </div>
        <div class="flex-y-center flex-wrap p-10">
          <span class="flex-60px">规格值：</span>
          <el-popover placement="bottom" trigger="hover" v-for="(value, index) in item.options" :key="index">
            <template #reference>
              <el-tag style="height: 30px" class="mr-8" closable @close="() => item.options.splice(index, 1)">
                {{ value }}
              </el-tag>
            </template>
            <el-input style="width: 126px; height: 30px" v-model="item.options[index]" placeholder="请输入规格值" />
          </el-popover>
          <el-input
            style="width: 126px; height: 30px"
            v-model="optionsInputVal[idx]"
            @blur="handleBlur(item, idx)"
            placeholder="请输入规格值"
          />
        </div>
      </div>
    </div>
    <div class="flex-y-center bg-#F5F7FA p-10 mt-12">
      <el-button link type="primary" @click="addSpecsItem" :disabled="specList.length > 2"> + 新增规格 </el-button>
    </div>
    <!-- sku列表 -->
    <div class="flex-y-center justify-between mt-20 mb-10 px-10">
      <!-- <div class="text-16">sku列表</div> -->
      <el-button type="primary" @click="handleGenerate">生成sku列表</el-button>
      <div>
        <span>销售价倍数：</span>
        <el-input-number
          style="width: 126px; height: 30px"
          v-model="num"
          :min="1"
          :max="10"
          :precision="2"
          :step="0.1"
        />
        <el-button class="ml-20" type="primary" @click="setPrice">批量设置</el-button>
      </div>
    </div>
    <el-table :data="skuList" border style="width: 100%">
      <el-table-column prop="skuName" label="sku名称">
        <template #default="{ row }">
          <el-input style="height: 30px" v-model="row.skuName" />
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" label="sku编码">
        <template #default="{ row }">
          <el-input style="height: 30px" v-model="row.skuCode" />
        </template>
      </el-table-column>
      <el-table-column prop="picture" label="sku图片">
        <template #default="{ row }">
          <UploadImg v-model="row.picture" width="80px" height="80px" />
        </template>
      </el-table-column>
      <el-table-column prop="specs" label="规格" />
      <el-table-column prop="costPrice" label="成本价">
        <template #default="{ row }">
          <el-input-number
            style="height: 30px; width: 100%"
            v-model="row.costPrice"
            :min="0.01"
            :precision="2"
            :step="0.1"
            :controls="false"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="销售价">
        <template #default="{ row }">
          <el-input-number
            style="width: 100%; height: 30px"
            v-model="row.price"
            :min="0.01"
            :precision="2"
            :step="0.1"
            :controls="false"
          />
        </template>
      </el-table-column>
      <el-table-column prop="inventory" label="库存">
        <template #default="{ row }">
          <el-input-number style="width: 100%; height: 30px" v-model="row.inventory" :min="0" :controls="false" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
