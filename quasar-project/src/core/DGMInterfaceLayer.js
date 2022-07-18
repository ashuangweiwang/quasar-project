class Segment {
    constructor() {
        this.StartIndex;
        this.EndIndex;
        this.StartNormal = []; //?
        this.EndNormal = [];
    }
}
class InterfaceLine {
    constructor() {
        //super();
        this.Id;
        this.FeatureType;
        this.Name;
        this.Points = []; // xy
        this.IntegerPoints = new Uint32Array; //
        this.PointsSmoothType = []; //
        this.Segments = [];

    }
}

class InterfaceTile extends DGMTile {
    constructor() {
        super();
        this.Id;
        this.FeatureIDs = [];
        this.InterfaceLines = [];
    }
}

class InterfaceFeature extends DGMFeature {
    constructor() {
        super();
        this.Id;
        this.Name;
        this.FeatureType;
        this.Props = [];
        this.Tiles = []; // tiles id
    }
}

class DGMInterfaceLayer extends DGMAbstractLayer {
    constructor() {
        super();
        this.Tiles = [];
        this.InterfaceFeatures = new DGMFeatureCollection; // 
    }
}