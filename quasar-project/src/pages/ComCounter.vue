<template>
  <div>
    <div ref="vtkContainer" />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import RenderWindow3D from "src/RnderVtkCore/RenderWindow3D";
import DGMJsonIO from "src/core/DGMJsonIO";
import RenderWorkSpaceManager from "src/RnderVtkCore/RenderWorkSpaceManager";
import RenderWorkSpace from "src/RnderVtkCore/RenderWorkSpace";
export default {
  name: "ComCounter",

  setup() {
    const vtkContainer = ref(null);

    onMounted(() => {
      var jsonio = new DGMJsonIO();
      var testwk = jsonio.GetWorkspace("Model_");
      var curwk = new RenderWorkSpace(testwk);
      var wkManager = new RenderWorkSpaceManager();
      wkManager.AddObject(curwk);

      var testwindow = new RenderWindow3D(wkManager);
      const elem = vtkContainer.value;
      testwindow.Init(elem);
    });

    return {
      vtkContainer,
      ref,
    };
  },
};
</script>
<style></style>
