//import DGMObject from './DGMObject.js';

class MeshFeature extends PIXI.Mesh {
    constructor() {
        super();
        this.id;
        this.MeshData = []; //
        this.Style;
    }

    AddMeshData(o) {
        this.MeshData.push(o);
    }

    Clear() {
        super.Clear();
    }


}