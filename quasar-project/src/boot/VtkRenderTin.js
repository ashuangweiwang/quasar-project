import "@kitware/vtk.js";
class VtkRenderTin {
  constructor(oGeometry, actor, mapper) {
    this.geometry = oGeometry.points;
    this.index = oGeometry.trianglesindex;
    this.actor = actor;
    this.mapper = mapper;
  }
  
  Clear() {
    super.Clear();
  }
  drawTin() {
    /* var fullScreenRenderer = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance();
        var actor = vtk.Rendering.Core.vtkActor.newInstance();
        var mapper = vtk.Rendering.Core.vtkMapper.newInstance(); */
    const jSize = 10;
    const iSize = 10;
    //测试数据 点数据geometry[] 索引 index[];
    /*  const geometry = [
          2018.252963, 2147.319828, -1762.693847,
          1143.156210, 2065.574232, -2208.646724,
          3349.902945, 1828.012074, -1902.930539,
          1847.565996, 2711.144726, -2765.518175,
          960.403364, 2846.304006, -3096.285714,
          -67.435643, 1845.978900, -2329.156315
        ]
        const index = [3, 1, 4, 2, 4, 1, 4, 2, 5, 2, 6, 5]; */

    //1
    const polydata = vtk.Common.DataModel.vtkPolyData.newInstance();
    polydata.getPoints().setData(new Float32Array(0, 0, 0, 1, 1, 1), 3);

    //2  get点 设置点数据长度 get点具体值
    const points = polydata.getPoints();
    points.setNumberOfPoints(iSize * jSize, 3);
    const pointValues = points.getData();

    //3 绑定索引到polydata
    const polys = vtk.Common.Core.vtkCellArray.newInstance({
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

    this.actor.setMapper(this.mapper);
    this.mapper.setInputData(polydata); // polyData 为需要显示的数据

    /*    var renderer = fullScreenRenderer.getRenderer();
        renderer.addActor(actor);
        renderer.resetCamera();

        var renderWindow = fullScreenRenderer.getRenderWindow();
        renderWindow.render(); */
  }
}
export { VtkRenderTin };
