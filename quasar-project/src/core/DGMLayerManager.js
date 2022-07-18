class DGMLayerManager {
  constructor() {
    this.ClassName = "DGMLayerManager";
    this.LayerArray = [];
  }
  AddLayer(layer) {
    this.LayerArray.push(layer);
  }
  Clear() {
    for (var i = 0; i < this.LayerArray.length; i++) {
      this.LayerArray[i].Clear();
    }
    this.LayerArray.length = 0;
  }
}
export default DGMLayerManager;
