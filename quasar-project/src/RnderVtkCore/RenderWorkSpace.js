import { RenderGeoMap } from "./RenderGeoMap.js";
import { RenderLayer } from "./RenderLayer.js";
import { RenderTile } from "./RenderTile.js";
import { PolyDataGeometry } from "./PolyDataGeometry.js";
import RenderAbstractObj from "./RenderAbstractObj.js";
import RenderActor from "./RenderActor.js";

class RenderWorkSpace extends RenderAbstractObj {
  constructor(curwk) {
    super();
    this.WorkSpace = curwk;
  }
  GetFeatureFromID(layer, fid) {
    for (var fc = 0; fc < layer.FeatureCollection.Features.length; fc++) {
      if (layer.FeatureCollection.Features[fc].id == fid) {
        return layer.FeatureCollection.Features[fc].VisualStyle;
      }
    }
  }
  SetupScene(renderer) {
    //wsw 解析wk的各个层级
    //map
    for (var i = 0; i < this.WorkSpace.ObjectArray.length; i++) {
      var oGeoMap = new RenderGeoMap();
      this.AddObject(oGeoMap);
      oGeoMap.Map = this.WorkSpace.ObjectArray[i];
      //layer
      for (var j = 0; j < oGeoMap.Map.ObjectArray.length; j++) {
        var oLayer = new RenderLayer();
        oGeoMap.AddObject(oLayer);
        oLayer.Layer = oGeoMap.Map.ObjectArray[j];
        //tile
        for (var k = 0; k < oLayer.Layer.ObjectArray.length; k++) {
          var oTile = new RenderTile();
          oLayer.AddObject(oTile);
          oTile.Tile = oLayer.Layer.ObjectArray[k];
          //Geometry  此处取Tile里面的Geometry
          if (oTile.Tile.BufferGeometry == undefined) continue; //
          for (var l = 0; l < oTile.Tile.BufferGeometry.length; l++) {
            var oGeometry = oTile.Tile.BufferGeometry[l];
            /*  if (oTile.Tile.PolyDataGeometry == undefined) continue; //
          for (var l = 0; l < oTile.Tile.PolyDataGeometry.length; l++) {
            var oGeometry = oTile.Tile.PolyDataGeometry[l]; */
            var ofeature = this.GetFeatureFromID(
              oLayer.Layer,
              oGeometry.FeatureID
            );

            var Actor = new RenderActor(oGeometry, ofeature, renderer);
            oTile.AddObject(Actor);

            if (oGeometry.type == "Line") {
            } else if (oGeometry.type == "Polygon") {
            } else if (oGeometry.type == "Point") {
            } else if (oGeometry.type == "Tin") {
              Actor.Render();
              /* var tin = new VtkRenderTin(Actor);
              tin.drawTin();
              renderer.addActor(Actor); */
            }
          }
        }
      }
    }
    console.log("RenderWorkSpace", this);
  }
}

export default RenderWorkSpace;
