<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 400px">
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">Before</div>
          <div v-for="n in 20" :key="n" class="q-my-md">
            {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quis praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </div>
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">After</div>
          <div v-for="n in 20" :key="n" class="q-my-md">
            {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quis praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </div>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";

// const content = ref(null);
const tableData = [
  {
    date: "2022-07-17",
    name: "wsw",
    address: "上海市普陀区金沙江路 1518 弄",
  },
];
let text = ref("111");
defineExpose({
  tableData,
  text,
  splitterModel: ref(50), // start at 50%
});
/*   return {
      tableData,
      text,

      splitterModel: ref(50), // start at 50%
    }; */
</script>
