import DGMAbstractMap2D from "./DGMAbstractMap2D";
class DGMGeoMap2D extends DGMAbstractMap2D {
  constructor() {
    super();
    this.ClassName = "DGMGeoMap2D";
    this.ProjectPara = { x: 1, y: 1, z: 1, num: 1 };
    //this.ProjectPointlist=[-0.6933749914169312, 601.0399780273438,100,80,480,100,200,200,105,550,0,100] //m4
    this.ProjectPointlist = [
      99.48699951171875, 601.1400146484375, 100, 190, 400, 100, 400, 200, 105,
      700, 0, 100,
    ]; //m5

    //this.LayerManager = new LayerManager();
    // this.TilesManager = new TilesManager();
  }
  Clear() {
    super.Clear();
  }
}
export default DGMGeoMap2D;
