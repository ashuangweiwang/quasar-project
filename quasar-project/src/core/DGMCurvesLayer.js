import DGMAbstractLayer from "./DGMAbstractLayer.js";
class DGMCurvesLayer extends DGMAbstractLayer {
  constructor() {
    this.ClassName = "DGMCurvesLayer";
  }
  Clear() {
    super.Clear();
  }

  AddCurveFromPoints(points) {}
}
export default DGMCurvesLayer;
