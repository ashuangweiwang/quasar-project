import DGMObjectGroup from "./DGMObjectGroup.js";
class DGMAbstractMap2D extends DGMObjectGroup {
  constructor() {
    super();

    //tree
    this.level = 2;
    this.icon = "map";
  }
  Clear() {
    super.Clear();
  }
}
export default DGMAbstractMap2D;
