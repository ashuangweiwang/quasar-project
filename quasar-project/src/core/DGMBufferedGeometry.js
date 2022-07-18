import DGMObject from "./DGMObject";
class DGMBufferGeometry extends DGMObject {
  constructor() {
    super();
    this.ClassName = "DGMBufferedGeometry";
    this.Points = [];
    this.points = [];
    this.Cells = [];
    this.Normals = [];
    this.GeoType; // 0 point 1 line 2 polygon 3 mesh
    this.FeatureID; // pointer to a specific feature object  (geometry feature:   1 -  n relation)
    this.trianglesindex = []; // 三角网中三角形
  }
  AddPoint(point) {
    this.Points.push(point);
  }
  AddCell(cell) {
    this.Cells.push(cell);
  }
  AddNormals(normal) {
    this.Normals.push(normal);
  }
  Clear() {
    for (var i = 0; i < this.Points.length; i++) {
      this.Points[i].Clear();
    }
    this.Points.length = 0;

    for (var i = 0; i < this.Cells.length; i++) {
      this.Cells[i].Clear();
    }
    this.Cells.length = 0;

    for (var i = 0; i < this.Normals.length; i++) {
      this.Normals[i].Clear();
    }
    this.Normals.length = 0;
  }
}
export default DGMBufferGeometry;
