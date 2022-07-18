import DGMObjectGroup from "./DGMObjectGroup";
class DGMFeatureCollection extends DGMObjectGroup {
  constructor() {
    super();
    this.ClassName = "DGMFeatureCollection";
    this.id = "";
    this.Features = [];
    //tree
    this.label = "Features";
    this.level = 3;
  }
  AddFeature(feature) {
    // console.log("这不会是空的吧",feature);
    feature.label = feature.Name;
    feature.parent = this;
    this.Features.push(feature);
    //tree
    this.children.push(feature);
  }
  RemoveFeature(feature) {
    for (var i = 0; i < this.Features.length; i++) {
      if (feature.id == this.Features[i].id) this.Features.splice(feature, 1);
      //树的children同时改变
      // this.children.splice(feature,1)
    }
  }
  Clear() {
    for (var i = 0; i < this.Features.length; i++) {
      this.Features[i].Clear();
    }
    this.Features.length = 0;
    super.Clear();
  }
}
export default DGMFeatureCollection;
