import DGMObjectGroup from "./DGMObjectGroup.js";
import DGMFeatureCollection from "./DGMFeatureCollection.js";
import DGMTile from "./DGMTile.js";
class DGMAbstractLayer extends DGMObjectGroup {
  constructor() {
    super();
    this.ClassName = "DGMAbstractLayer";
    //this.TileManager = new DGMTilesManager();
    this.TilesLODTree;
    this.Style;
    //this.Features;
    this.FeatureCollection = new DGMFeatureCollection();

    var tile = new DGMTile();
    this.AddObject(tile);

    //tree
    this.level = 3;
    this.icon = "photo";
  }
  Clear() {
    super.Clear();
  }
}
export default DGMAbstractLayer;
