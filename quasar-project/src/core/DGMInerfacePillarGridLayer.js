class InerfacePillarGrid extends DGMFeature {
    constructor() {
        super();
        this.GridSize = [0, 0];
        this.GridOrigin = [0, 0];
        this.GridSpacing = [0, 0];
        this.DataIndex = []; //short/charArray RGBA Index; <pos number  faultnumber>
        this.Interfaces = []; //short/charArray RGBA <z1,z2,z3,z4>
        this.InterfaceProps = []; // R  <id>   or  RG<cid id>
        this.PillarNodes = []; // RG  <z,id>	  
        this.DataType; // CHAR  SHORT  INT32	  
    }
}

class InterfaceGridTile extends DGMTile {
    constructor() {
        super();
        this.Id;
        this.InerfaceGrid = new InerfacePillarGrid;
    }
}

class DGMInterfacePillarGridLayer extends DGMAbstractLayer {
    constructor() {
        super();
        this.Tiles = []; // push InterfaceGridTile
        this.InterfaceFeatures = new DGMFeatureCollection; // 
    }
}