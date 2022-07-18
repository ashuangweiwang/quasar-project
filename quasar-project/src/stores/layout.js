import { defineStore } from "pinia";
import DGMWorkSpace from "src/core/DGMWorkSpace";
export const useLayoutStore = defineStore("layout", {
  //放全局变量
  state: () => ({
    leftDrawerOpen: false,
    rightDrawerOpen: false,
    gWorkSpace: new DGMWorkSpace(),
  }),

  //wsw 修改state的方法写在action里
  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
  },
});
export class test {}
