import "@kitware/vtk.js/favicon";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkPolyData from "@kitware/vtk.js/Common/DataModel/PolyData";
class PolyDataGeometry extends vtkPolyData {
  constructor() {
    super();
    this.ClassName = "PolyDataGeometry";

    this.Points = [];
    this.points = [];
    this.Cells = [];
    this.Normals = [];
    this.GeoType; //
    this.FeatureID; // pointer to a specific feature object  (geometry feature:   1 -  n relation)
    this.trianglesindex = []; // 三角网中三角形
  }
}
export { PolyDataGeometry };
