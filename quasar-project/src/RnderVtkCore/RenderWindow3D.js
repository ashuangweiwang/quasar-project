import "@kitware/vtk.js/favicon";

// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkRenderWindow from "@kitware/vtk.js/Rendering/Core/RenderWindow";
import vtkOpenGLRenderWindow from "@kitware/vtk.js/Rendering/OpenGL/RenderWindow";
import vtkRenderer from "@kitware/vtk.js/Rendering/Core/Renderer";
import vtkRenderWindowInteractor from "@kitware/vtk.js/Rendering/Core/RenderWindowInteractor";
import vtkInteractorStyleTrackballCamera from "@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera";
import vtkCubeAxesActor from "@kitware/vtk.js/Rendering/Core/CubeAxesActor";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkURLExtract from "@kitware/vtk.js/Common/Core/URLExtract";
import "@kitware/vtk.js/Rendering/OpenGL/RenderWindow";
import "@kitware/vtk.js/Rendering/WebGPU/RenderWindow";
import RenderAbstractObj from "./RenderAbstractObj";
import RenderWorkSpaceManager from "./RenderWorkSpaceManager";
class RenderWindows3D extends RenderAbstractObj {
  constructor(curWorkSpaceManager) {
    //绘制窗口
    super();
    this.renderWindow = vtkRenderWindow.newInstance();
    this.renderer = vtkRenderer.newInstance({ background: [0.2, 0.3, 0.4] });
    this.renderWindow.addRenderer(this.renderer);

    this.container;
    this.apiSpecificRenderWindow; //用opengl作为后端绘制
    this.renderWindowInteractor;

    //wkManager对象
    this.workSpaceManager = curWorkSpaceManager;

    this.vtkPicker;
    this.boundProxy;
    this.axesWidget;
  }

  // ----------------------------------------------------------------------------
  // wsw
  // ----------------------------------------------------------------------------
  Init(vtkContainer) {
    this.OnCreate(this.renderer);
    this.SpecificRenderWindow(vtkContainer);
    this.SetupInteractor();
    this.SetupInteractorStyle();
    //this.ShowAxes();
  }
  OnCreate(renderer) {
    for (var i = 0; i < this.workSpaceManager.ObjectArray.length; i++) {
      var curWorkSpace = this.workSpaceManager.ObjectArray[i];
      curWorkSpace.SetupScene(renderer);
    }
  }

  /*   Render() {
    this.renderer.resetCamera();
  } */

  // ----------------------------------------------------------------------------
  // Use OpenGL as the backend to view the all this
  // ----------------------------------------------------------------------------
  SpecificRenderWindow(vtkContainer) {
    // Process arguments from URL
    const userParams = vtkURLExtract.extractURLParameters();
    this.apiSpecificRenderWindow = this.renderWindow.newAPISpecificView(
      userParams.viewAPI
    );
    this.renderWindow.addView(this.apiSpecificRenderWindow);

    // Create a div section to put this into
    //const body1 = vtkContainer.value;
    this.container = document.createElement("div");
    vtkContainer.appendChild(this.container);
    this.apiSpecificRenderWindow.setContainer(this.container);
    const { width, height } = this.container.getBoundingClientRect();
    this.apiSpecificRenderWindow.setSize(width, height);
  }

  // ----------------------------------------------------------------------------
  // wsw  设置交互器
  // ----------------------------------------------------------------------------
  SetupInteractor() {
    this.renderWindowInteractor = vtkRenderWindowInteractor.newInstance();
    this.renderWindowInteractor.setView(this.apiSpecificRenderWindow);
    this.renderWindowInteractor.initialize();
    this.renderWindowInteractor.bindEvents(this.container);
  }
  // ----------------------------------------------------------------------------
  // wsw  设置交互器形式
  // ----------------------------------------------------------------------------
  SetupInteractorStyle() {
    this.renderWindowInteractor.setInteractorStyle(
      vtkInteractorStyleTrackballCamera.newInstance()
    );
  }

  // ----------------------------------------------------------------------------
  // wsw  显示坐标
  // ----------------------------------------------------------------------------
  ShowAxes() {
    const cubeAxes = vtkCubeAxesActor.newInstance();
    cubeAxes.setCamera(this.renderer.getActiveCamera());
    cubeAxes.setDataBounds(this.actor.getBounds());
    this.Render(cubeAxes);
    global.cubeAxes = cubeAxes;
  }
  GetShowBound() {}
  ShowBound() {}
}

export default RenderWindows3D;
