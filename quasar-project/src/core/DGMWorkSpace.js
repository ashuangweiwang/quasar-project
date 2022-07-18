import DGMObjectGroup from "./DGMObjectGroup";
import DGMMap2DManager from "./DGMMap2DManager";
class DGMWorkSpace extends DGMObjectGroup {
  constructor() {
    super();
    this.ClassName = "DGMWorkSpace";
    this.MapManager = new DGMMap2DManager();
    this.editor;
    this.picker;
    this.FeatureRelationship = [];

    //tree
    this.level = 1;
    this.icon = "workspaces";
  }
  AddRelation(relation) {
    this.FeatureRelationship.push(relation);
  }
  Clear() {
    super.Clear();
  }
}
export default DGMWorkSpace;
