import DGMObjectGroup from "./DGMObjectGroup";
class DGMTile extends DGMObjectGroup {
  constructor() {
    super();
    this.ClassName = "DGMTile";
    this.TileInfo;
    this.BufferGeometry = [];
    // this.BufferGeometry = new DGMBufferGeometry();
    //this.GraphcisCollection = new DGMFeatureCollection();
    //this.style;
  }
  Clear() {
    super.Clear();
  }
}
export default DGMTile;
