
import RenderAbstractObj from "./RenderAbstractObj";
class RenderLayer extends RenderAbstractObj {
    constructor() {
        super();
        this.ClassName = 'RenderLayer';
        this.Layer;
        this.label = 'Layer'
    }
    Clear() {
        super.Clear();
    }
    AddTile(tile) {
        this.add(tile);
    }
    SetRenerLayer(layer) {
        this.Layer = layer;
        this.label = layer.name;
        this.Layer.DataChanged = 1;

    }
}
export { RenderLayer }
