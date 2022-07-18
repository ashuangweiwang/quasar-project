<template>
  <q-header elevated>
    <q-toolbar class="col-8 bg-grey-4">
      <!--  <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      /> -->
      <q-btn-dropdown v-model="menu" flat color="bg-black-3" label="文件" dense>
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section @click="OpenFaultFile"
              >打开Fault文件</q-item-section
            >
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="OpenHorizonFile"
              >打开Horizon文件</q-item-section
            >
          </q-item>
          <q-separator></q-separator>
          <q-separator></q-separator>
          <q-item clickable v-close-popup>
            <q-item-section>退出</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown
        v-model="menu"
        flat
        color="bg-grey-3"
        label="工作区"
        dense
      >
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section @click="WDialog = true">新建工作区</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="DeleteWorkspce">删除工作区</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="WorkspacefromServer"
              >数据库加载工作区
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section @click="ModelDialog = true">建模 </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item clickable v-close-popup>
            <q-item-section @click="drawer = !drawer">展开节点</q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item clickable>
            <q-item-section>文件</q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right"></q-icon>
            </q-item-section>
            <!--保存json数据到本地-->
            <q-menu anchor="top end" self="top start">
              <q-list>
                <q-item v-for="n in 1" :key="n" dense clickable>
                  <q-item-section @click="SaveWorkSpaceJsonData"
                    >保存工作区json文件
                  </q-item-section>
                  <q-menu auto-close anchor="top end" self="top start">
                  </q-menu>
                </q-item>
                <q-item v-for="n in 1" :key="n" dense clickable>
                  <q-item-section @click="SaveMapJsonData"
                    >保存Mapjson文件</q-item-section
                  >
                  <q-menu auto-close anchor="top end" self="top start">
                  </q-menu>
                </q-item>
                <q-item dense clickable>
                  <q-item-section @click="inputFileJsonData"
                    >打开</q-item-section
                  >
                  <q-menu auto-close anchor="top end" self="top start">
                  </q-menu>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
          <!--<张建振>保存函数-->
          <q-item clickable v-close-popup>
            <q-item-section @click="Storageworkspace">保存</q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item clickable v-close-popup>
            <q-item-section>退出</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown v-model="menu" flat color="bg-grey-3" label="编辑" dense>
        <q-list>
          <q-item clickable>
            <q-item-section @click="MDialog = true">新建Map</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="LDialog = true">新建Layer</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="FDialog = true">新建Feature</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section @click="DeleteNode"
              >删除Map/Layer/Feature</q-item-section
            >
          </q-item>
          <q-item clickable>
            <q-item-section @click="AddProjectPoint"
              >添加投影信息</q-item-section
            >
          </q-item>
          <q-item clickable>
            <q-item-section @click="AddProjectPoint"
              >三维视图打开工作区</q-item-section
            >
          </q-item>
          <q-item clickable>
            <q-item-section @click="AddProjectPoint"
              >二维视图打开Map</q-item-section
            >
          </q-item>
          <q-item clickable>
            <q-item-section @click="AddProjectPoint"
              >二维保存编辑</q-item-section
            >
          </q-item>
          <q-separator></q-separator>
          <q-item clickable>
            <q-item-section>全选</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-toolbar-title> </q-toolbar-title>
      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
  <q-dialog
    v-model="workspaceServerDialog"
    persistent
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card>
      <q-bar>
        <div>数据库加载工作区</div>
        <q-space></q-space>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <!--<张建振：这里表格进行显示数据库的中workspaceList>-->
        <q-table
          title="工作区表"
          :rows="workspaceListData"
          :columns="workspaceListColumns"
          row-key="id"
          selection="single"
          v-model:selected="workspaceListselected"
          :filter="workspaceListfilter"
          hide-header
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="200"
              v-model="workspaceListfilter"
              placeholder="查找"
            >
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
          </template>
        </q-table>
        <div class="row justify-end">
          <!--<张建振：这里表格进行显示数据库的中workspaceList>-->
          <q-btn
            type="submit"
            :loading="submitting"
            label="确定"
            @click="sendWorkspace"
          >
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!--   <div v-show="false"> -->
  <div>
    <TreeNodepage ref="tree"></TreeNodepage>
  </div>
</template>
<script>
import { ref, defineComponent, onMounted } from "vue";
import DGMJsonIO from "../core/DGMJsonIO";
import DGMWorkSpace from "src/core/DGMWorkSpace";
import { useLayoutStore } from "../stores/layout";
import TreeNodepage from "./TreeNodepage.vue";
export default {
  components: {
    TreeNodepage,
  },
  setup() {
    const tree = ref();
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const workspaceServerDialog = ref(false);
    const workspaceListData = ref([]);
    const workspaceListselected = ref([]);
    const nodePage = ref();
    var workspaceArray = ref([]);
    var dgmJsonIO = new DGMJsonIO();
    var gWorkspace = new DGMWorkSpace();
    var root, expanded;
    onMounted(() => {
      console.log("终极测试：", tree.value.root);
      root = tree.value.root;
      expanded = tree.value.expanded;
    });
    function WorkspacefromServer() {
      workspaceServerDialog.value = true; //this.workspaceListData = GetWorkspaceList1(); //var dgmJsonIO = new DGMJsonIO(); //console.log("前", oData)
      workspaceListData.value = dgmJsonIO.GetWorkspaceList();
      //console.log("WorkspacefromServer", workspaceListData);
    }
    function sendWorkspace() {
      var workspaceListId;
      var workspaceListName;
      if (workspaceListselected.value.length != 0) {
        workspaceListId = workspaceListselected.value[0].id;
        workspaceListName = workspaceListselected.value[0].name;
        workspaceServerDialog.value = false;
        gWorkspace = dgmJsonIO.GetWorkspace(workspaceListId);
        workspaceArray.value.push(gWorkspace);
        AddWorkSpace(gWorkspace);
        refresh(root);
        return 1;
      }
      return 0;
    }
    function AddWorkSpace(wk) {
      var oNode = wk; // this.workspaceArray[i];
      oNode.label = oNode.Name;
      root[0].children.push(oNode); //map
      for (var j = 0; j < oNode.ObjectArray.length; j++) {
        var ooNode = oNode.ObjectArray[j];
        ooNode.label = ooNode.name;
        oNode.children.push(ooNode); //layer
        for (var k = 0; k < ooNode.ObjectArray.length; k++) {
          var oooNode = ooNode.ObjectArray[k];
          oooNode.label = oooNode.name;
          var FeatureCollectionNode = oooNode.FeatureCollection;
          FeatureCollectionNode.id = oooNode.id + "Features";
          FeatureCollectionNode.label = "FeatureCollection";
          var tiles = { id: "Tiles", label: "Tiles" };
          oooNode.children = [tiles, FeatureCollectionNode];
          ooNode.children.push(oooNode); //目前接受的数据中若不存在featurecollection则报错
          for (
            var fc = 0;
            fc < oooNode.FeatureCollection.Features.length;
            fc++
          ) {
            var feature = oooNode.FeatureCollection.Features[fc];
            feature.label = feature.Name;
            oooNode.children[1].children.push(feature);
          }
        }
      }
      console.log("赋值之后的root", root);
      expanded.push(root[0].id);
      expanded.push(root[0].children[0].id);
    }
    function refresh(node) {
      expanded.push(node.id); //this.expanded.pop(nodes);
    }
    return {
      ref,
      tree,
      root,
      DGMJsonIO,
      leftDrawerOpen,
      rightDrawerOpen,
      workspaceServerDialog,
      workspaceListData,
      workspaceListselected,
      workspaceArray,
      sendWorkspace,
      WorkspacefromServer,
    };
  },
};
</script>
