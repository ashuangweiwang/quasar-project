class DGMGraphicData {
  constructor() {
    this.ClassName = "DGMGraphicData";
    this.Points = [];
    this.Cells = [];
    this.Type;
    this.Style;
  }

  AddPoints(point) {
    this.Points.push(point);
  }
  AddCells(cell) {
    this.Cells.push(cell);
  }
  Clear() {
    this.Points = [];
    this.Cells = [];
  }
}
export default DGMGraphicData;
