import "@kitware/vtk.js/favicon";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkPolyData from "@kitware/vtk.js/Common/DataModel/PolyData";
import PolyDataGeometry from "./PolyDataGeometry";

//class RenderActor extends vtkActor {
class RenderActor {
  constructor(polydata, feature, renderer) {
    //super();
    this.mapper = vtkMapper.newInstance(); //mapper具体形式
    this.polydata = polydata;
    this.property; //属性
    this.feature = feature; //wk feature
    this.treeNode;

    renderer.addActor(this);
    renderer.resetCamera();
    this.setMapper(this.mapper);
  }
  Render() {
    const jSize = 10;
    const iSize = 10;

    //1
    const polydata = vtkPolyData.newInstance();
    polydata.getPoints().setData(new Float32Array(0, 0, 0, 1, 1, 1), 3);

    //2  get点 设置点数据长度 get点具体值
    const points = polydata.getPoints();
    points.setNumberOfPoints(iSize * jSize, 3);
    const pointValues = points.getData();

    //3 绑定索引到polydata
    const polys = vtkCellArray.newInstance({
      //size: 4 * (iSize - 1) * (jSize - 1),
      size: (4 * this.geometry.length) / 3,
    });
    polydata.setPolys(polys);
    const polysValues = polys.getData();

    //4 赋值点数据和索引数据
    let cellOffset = 0;
    for (let i = 0; i < this.geometry.length / 3; i++) {
      const offsetIdx = i;
      const offsetPt = 3 * offsetIdx;

      // Fill points coordinates
      pointValues[offsetPt + 0] = this.geometry[0 + 3 * i]; //x
      pointValues[offsetPt + 1] = this.geometry[1 + 3 * i]; //y
      pointValues[offsetPt + 2] = this.geometry[2 + 3 * i]; //z
    }
    for (let i = 0; i < this.index.length / 3; i++) {
      polysValues[cellOffset++] = 3;
      polysValues[cellOffset++] = this.index[0 + 3 * i] - 1; //第一个
      polysValues[cellOffset++] = this.index[1 + 3 * i] - 1; //第二个
      polysValues[cellOffset++] = this.index[2 + 3 * i] - 1; //第三个
    }

    this.setMapper(this.mapper);
    this.mapper.setInputData(polydata); // polyData 为需要显示的数据
  }
}
export default RenderActor;
