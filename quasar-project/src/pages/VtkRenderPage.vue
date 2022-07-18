<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: 900px">
      <template v-slot:before>
        <div class="q-pa-md">
          <div>
            <div ref="vtkContainer" />
            <table class="controls">
              <tbody>
                <tr>
                  <td>
                    <select
                      style="width: 100%"
                      :value="representation"
                      @change="setRepresentation($event.target.value)"
                    >
                      <option value="0">Points</option>
                      <option value="1">Wireframe</option>
                      <option value="2">Surface</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="range"
                      min="4"
                      max="80"
                      :value="coneResolution"
                      @input="setConeResolution($event.target.value)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <!-- <div class="q-pa-md"> -->
        <div id="div1">
          <div ref="vtkContainer2" />
        </div>
        <!-- </div> -->
      </template>
    </q-splitter>
  </div>
</template>
<script>
import { ref, unref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import vtkFPSMonitor from "@kitware/vtk.js/Interaction/UI/FPSMonitor";
import vtkWSLinkClient from "@kitware/vtk.js/IO/Core/WSLinkClient";
import vtkRemoteView from "@kitware/vtk.js/Rendering/Misc/RemoteView";
import SmartConnect from "wslink/src/SmartConnect";
export default {
  name: "VtkRenderPage",
  setup() {
    const vtkContainer = ref(null);
    const vtkContainer2 = ref(null);

    const context = ref(null);
    const coneResolution = ref(6);
    const representation = ref(2);
    function setConeResolution(res) {
      coneResolution.value = Number(res);
    }
    function setRepresentation(rep) {
      representation.value = Number(rep);
    }
    watchEffect(() => {
      const res = unref(coneResolution);
      const rep = unref(representation);
      if (context.value) {
        const { actor, coneSource, renderWindow } = context.value;
        coneSource.setResolution(res);
        actor.getProperty().setRepresentation(rep);
        renderWindow.render();
      }
    });
    //
    onMounted(() => {
      if (!context.value) {
        const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
          rootContainer: vtkContainer.value,
        });

        const coneSource = vtkConeSource.newInstance({ height: 1.0 });
        const mapper = vtkMapper.newInstance();
        mapper.setInputConnection(coneSource.getOutputPort());
        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);
        const renderer = fullScreenRenderer.getRenderer();
        const renderWindow = fullScreenRenderer.getRenderWindow();
        //wsw fps
        const fpsMonitor = vtkFPSMonitor.newInstance();
        const fpsElm = fpsMonitor.getFpsMonitorContainer();
        fpsElm.style.position = "relative";
        fpsElm.style.left = "10px";
        fpsElm.style.bottom = "10px";
        fpsElm.style.background = "rgba(255,255,255,0.8)";
        fpsElm.style.borderRadius = "5px";
        fpsMonitor.setContainer(document.querySelector("body"));
        fpsMonitor.setRenderWindow(renderWindow);
        fullScreenRenderer.setResizeCallback(fpsMonitor.update);
        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();
        //服务器绘制
        vtkWSLinkClient.setSmartConnectClass(SmartConnect);
        const body1 = vtkContainer2.value;
        const divRenderer = document.createElement("div");
        body1.appendChild(divRenderer);
        const clientToConnect = vtkWSLinkClient.newInstance();
        // Error
        clientToConnect.onConnectionError((httpReq) => {
          const message =
            (httpReq && httpReq.response && httpReq.response.error) ||
            `Connection error`;
          console.error(message);
          console.log(httpReq);
        });
        // Close
        clientToConnect.onConnectionClose((httpReq) => {
          const message =
            (httpReq && httpReq.response && httpReq.response.error) ||
            `Connection close`;
          console.error(message);
          console.log(httpReq);
        });
        // hint: if you use the launcher.py and ws-proxy just leave out sessionURL
        // (it will be provided by the launcher)
        const config = {
          application: "cone",
          sessionURL: "ws://localhost:1234/ws",
        };
        // Connect
        clientToConnect
          .connect(config)
          .then((validClient) => {
            //const viewStream = this.clientToConnect
            const viewStream = clientToConnect
              .getImageStream()
              .createViewStream("-1");
            const view = vtkRemoteView.newInstance({
              rpcWheelEvent: "viewport.mouse.zoom.wheel",
              viewStream,
            });
            const session = validClient.getConnection().getSession();
            view.setSession(session);
            view.setContainer(divRenderer);
            view.setInteractiveRatio(0.7); // the scaled image compared to the clients view resolution
            view.setInteractiveQuality(50); // jpeg quality
            window.addEventListener("resize", view.resize);
            //wsw fps
            const fpsMonitor1 = vtkFPSMonitor.newInstance();
            const fpsElm1 = fpsMonitor1.getFpsMonitorContainer();
            fpsElm1.style.position = "relative";
            fpsElm1.style.right = "10px";
            fpsElm1.style.bottom = "10px";
            fpsElm1.style.background = "rgba(255,255,255,0.8)";
            fpsElm1.style.borderRadius = "5px";
            fpsMonitor1.setContainer(document.querySelector("div"));
            fpsMonitor1.setRenderWindow(view);
          })
          .catch((error) => {
            console.error(error);
          });
        context.value = {
          fullScreenRenderer,
          renderWindow,
          renderer,
          coneSource,
          actor,
          mapper,
        };
      }
    });

    //wsw 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。
    onBeforeUnmount(() => {
      if (context.value) {
        const { fullScreenRenderer, coneSource, actor, mapper } = context.value;
        actor.delete();
        mapper.delete();
        coneSource.delete();
        fullScreenRenderer.delete();
        context.value = null;
      }
    });
    return {
      splitterModel: ref(50), // start at 50%
      vtkContainer,
      vtkContainer2,
      setRepresentation,
      setConeResolution,
      coneResolution,
      representation,
    };
  },
};
</script>
<style scoped>
.controls {
  position: relative;
  top: 20px;
  left: 20px;
  background: white;
  padding: 5px;
}
</style>
