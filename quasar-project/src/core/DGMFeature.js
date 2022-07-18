import DGMObject from "./DGMObject";
import DGMVisualStyle from "./DGMVisualStyle";
class DGMFeature extends DGMObject {
  constructor() {
    super();
    this.ClassName = "DGMFeature";
    this.VisualStyle = new DGMVisualStyle();
    this.FeatureType;
    this.UpProp;
    this.DownProp;
    this.GeoCode;

    //tree
    this.level = 4;
    this.ShowLogo = 0;
  }

  Clear() {
    super.Clear();
  }
}
export default DGMFeature;
