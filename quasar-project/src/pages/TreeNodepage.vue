<template>
  <q-tree
    ref="tree"
    :nodes="root"
    node-key="id"
    selected-color="primary"
    tick-strategy="strict"
    v-model:invisible="drawer"
    v-model:selected="selected"
    v-model:ticked="ticked"
    v-model:expanded="expanded"
    dense
    class="bg-grey-1"
    default-expand-all
  >
  </q-tree>
  <q-tree
    ref="pTree"
    :nodes="pixiViewRoot"
    node-key="id"
    selected-color="primary"
    tick-strategy="leaf"
    v-model:selected="pSelected"
    v-model:ticked="pTreeTicked"
    v-model:expanded="expanded"
    default-expand-all
    dense
    class="bg-grey-2"
    accordion
    @update:ticked="onPTreeTick"
    @update:selected="onPTreeSelect"
  >
  </q-tree>
  <q-tree
    ref="sTree"
    :nodes="sectionViewRoot"
    node-key="id"
    selected-color="primary"
    tick-strategy="leaf"
    v-model:selected="sSelected"
    v-model:ticked="sTreeTicked"
    v-model:expanded="expanded"
    default-expand-all
    dense
    accordion
    @update:ticked="onSTreeTick"
    @update:selected="onSTreeSelect"
  >
  </q-tree>
  <q-tree
    ref="rTree"
    :nodes="renderSceneRoot"
    node-key="id"
    selected-color="primary"
    tick-strategy="leaf"
    v-model:selected="tDSelected"
    v-model:ticked="tDTicked"
    v-model:expanded="expanded"
    default-expand-all
    dense
    @update:ticked="onRTreeTick"
  >
  </q-tree>
</template>
<script>
import { defineComponent, ref, watchEffect } from "vue";
export default defineComponent({
  name: "TreeNodepage",
  setup() {
    var root = ref([
      {
        id: "root",
        label: "WorkSpaces",
        children: [],
        icon: "home",
      },
    ]);
    watchEffect(() => console.log("watch", root.value));
    return {
      //splitterModel: ref(50),
      //selected: ref('Food'),
      selected: ref([]),
      pSelected: ref([]),
      sSelected: ref([]),
      ticked: ref([]),
      tDSelected: ref([]),
      tDTicked: ref([]),
      expanded: ref(["root"]),
      workspaceArray: ref([]),
      /*  root: [
        {
          id: "root",
          label: "WorkSpaces",
          children: [],
          icon: "home",
        },
      ], */
      root,
      pixiViewRoot: [
        {
          id: "pixiViewRoot",
          label: "2D Main View",
          children: [],
          icon: "spa",
        },
      ],
      //剖面视图
      sectionViewRoot: [
        {
          id: "sectionViewRoot",
          label: "2D Section View",
          children: [],
          icon: "spa",
        },
      ],
      pixiMapView: ref([]),
      renderSceneRoot: [
        {
          id: "renderSceneRoot",
          label: "3D View",
          children: [],
          icon: "spa",
        },
      ],
      //记录二维视图树勾选
      pTreeTicked: ref([]),
      sTreeTicked: ref([]),
      RTreeTick: ref([]),
      //记录二维视图树的上次勾选
      recentPTreeTicked: [],
      recentSTreeTicked: [],
      recentRTreeTicked: [],
    };
  },
});
</script>
