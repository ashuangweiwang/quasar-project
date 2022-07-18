class DGMMap2DManager {
  constructor() {
    this.ClassName = "DGMMap2DManager";
    this.LayerArray = [];
  }
  AddMap(map) {
    this.LayerArray.push(layer);
  }
  Clear() {
    for (var i = 0; i < this.LayerArray.length; i++) {
      this.LayerArray[i].Clear();
    }
    this.LayerArray.length = 0;
  }
}
export default DGMMap2DManager;
