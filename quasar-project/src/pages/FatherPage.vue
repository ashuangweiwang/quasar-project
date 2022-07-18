<template>
  <div>
    <ChildPage ref="childRef"> </ChildPage>
  </div>
  <div>
    <TreeNodepage ref="content"> </TreeNodepage>
  </div>
</template>
<script>
//<script lang="ts">
import {
  onMounted,
  ref,
  reactive,
  nextTick,
  toRefs,
  computed,
  provide,
} from "vue";

import ChildPage from "./ChildPage.vue"; //引入子组件
import TreeNodepage from "./TreeNodepage.vue";
export default {
  components: {
    ChildPage,
    TreeNodepage,
  },
  setup() {
    const childRef = ref(); //定义子组件的ref
    const content = ref();

    //打印子组件的ref的值
    function getChildRefValue(value) {
      console.log(childRef.value);
    }
    var wsw;
    onMounted(() => {
      console.log("子组件ref对象", childRef.value);
      console.log("获取子组件的childValue值", childRef.value.childValue);
      console.log(
        "调用子组件的childFunction方法",
        childRef.value.childFunction
      );
      console.log("content.vlaue", content.value);
      console.log("root", content.value.root);
      console.log("testRoot", childRef.value.testRoot);
      /*  wsw = content.value.root[0];
      wsw.children.push(111111111); */
    });

    return {
      getChildRefValue,
      childRef, //记得要返回子组件的ref，不然访问不到
      content,
    };
  },
};
</script>
