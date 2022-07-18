<template>
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
</template>

<script>
import { ref, unref, onMounted, onBeforeUnmount, watchEffect } from "vue";

import "@kitware/vtk.js/Rendering/Profiles/Geometry";

import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";

import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import vtkOrientationMarkerWidget from "@kitware/vtk.js/Interaction/Widgets/OrientationMarkerWidget";
import vtkAnnotatedCubeActor from "@kitware/vtk.js/Rendering/Core/AnnotatedCubeActor";

export default {
  name: "IndexPage",

  setup() {
    const vtkContainer = ref(null);
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
        //wsw 方向插件
        // create axes
        const axes = vtkAnnotatedCubeActor.newInstance();
        axes.setDefaultStyle({
          text: "+X",
          fontStyle: "bold",
          fontFamily: "Arial",
          fontColor: "black",
          fontSizeScale: (res) => res / 2,
          faceColor: "#0000ff",
          faceRotation: 0,
          edgeThickness: 0.1,
          edgeColor: "black",
          resolution: 400,
        });
        // axes.setXPlusFaceProperty({ text: '+X' });
        axes.setXMinusFaceProperty({
          text: "-X",
          faceColor: "#ffff00",
          faceRotation: 90,
          fontStyle: "italic",
        });
        axes.setYPlusFaceProperty({
          text: "+Y",
          faceColor: "#00ff00",
          fontSizeScale: (res) => res / 4,
        });
        axes.setYMinusFaceProperty({
          text: "-Y",
          faceColor: "#00ffff",
          fontColor: "white",
        });
        axes.setZPlusFaceProperty({
          text: "+Z",
          edgeColor: "yellow",
        });
        axes.setZMinusFaceProperty({
          text: "-Z",
          faceRotation: 45,
          edgeThickness: 0,
        });

        // create orientation widget
        const orientationWidget = vtkOrientationMarkerWidget.newInstance({
          actor: axes,
          interactor: renderWindow.getInteractor(),
        });
        orientationWidget.setEnabled(true);
        orientationWidget.setViewportCorner(
          vtkOrientationMarkerWidget.Corners.BOTTOM_RIGHT
        );
        orientationWidget.setViewportSize(0.15);
        orientationWidget.setMinPixelSize(100);
        orientationWidget.setMaxPixelSize(300);

        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();

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
      vtkContainer,
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
  padding: 12px;
}
</style>
