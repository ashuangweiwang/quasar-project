<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        
      </q-toolbar>
      <div>
        <MenuPage></MenuPage>
      </div>

    </q-header>

    <q-drawer show-if-above v-model="$s.leftDrawerOpen" side="left" bordered>
      <div>
        <!--  <RefTest>TreePage</RefTest> -->
        <TreeNodepage>aaa</TreeNodepage>
      </div>
    </q-drawer>
    <q-drawer show-if-above v-model="$s.rightDrawerOpen" side="right" bordered>
      <div>
        <!-- <spliter-page ref="content">TreePage</spliter-page> -->
        <FatherPage></FatherPage>
        <!-- <ComCounter>PanelPage</ComCounter> -->
      </div>
    </q-drawer>
    <q-page-container>
      <!--  <ComCounter>Render</ComCounter> -->
      <!--   <router-view /> -->
      <index-page>aaa</index-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useLayoutStore } from "../stores/layout";
import IndexPage from "../pages/IndexPage.vue";
import VtkRenderPage from "../pages/VtkRenderPage.vue";
import ComCounter from "../pages/ComCounter.vue";
import SpliterPage from "src/pages/SpliterPage.vue";
import MenuPage from "src/pages/MenuPage.vue";
import TreeNodepage from "src/pages/TreeNodepage.vue";
import FatherPage from "src/pages/FatherPage.vue";
const $s = useLayoutStore();
const content = ref();

console.log(content);
console.log(content.value);
</script>
