import RenderAbstractObj from "./RenderAbstractObj";
class RenderGeoMap extends RenderAbstractObj {
    constructor() {
        super();
        this.ClassName = 'RenderGeoMap';
        this.Map;
        this.label = 'Map'
        this.icon = 'map'
        this.level = 1
        this.DataChanged = 0;

    }
    AddLayer(layer) {
        this.add(layer);
    }

    SetRenderMap(map) {
        this.Map = map;
        this.label = map.name;
        this.Map.DataChanged = 1;
    }

    Clear() {
        super.Clear();
    }

}
export { RenderGeoMap }
