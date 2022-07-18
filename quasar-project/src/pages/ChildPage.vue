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
export default {
  setup() {
    const childValue = ref("调用成功，我是子组件的的值");
    var testRoot = ref([]);

    //打印子组件的ref的值
    function childFunction() {
      console.log("调用成功，我是子组件的方法");
    }

    return {
      childValue,
      childFunction,
      testRoot,
    };
  },
};
</script>
