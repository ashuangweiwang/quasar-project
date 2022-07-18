import RenderAbstractObj from "./RenderAbstractObj";
class RenderTile extends RenderAbstractObj {
  constructor() {
    super();
    this.ClassName = "RenderTile";
    this.Tile;
    this.label = "Tile";
    this.level = 1;
    this.DataChanged = 0;
  }
  Clear() {
    super.Clear();
  }
  SetRenderTile(tile) {
    this.Tile = tile;
    //this.label = "tile";
    this.Tile.DataChanged = 1;
  }
  ShowRenderTile() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].line.material.visible = true;
    }
  }
  HideRenderTile() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].line.material.visible = false;
    }
  }

  AddObjectDem(bufferGeometry) {}
  AddObjectLine(bufferGeometry) {}
  AddObjectMesh(bufferGeometry) {}
  AddObjectPoint(bufferGeometry) {}
}
export { RenderTile };
