class PixiFeatureCollectionStage extends PIXI.Container {
    constructor(layer) {
        super();
        this.FeatureCollection;
        this.ClassName = 'PixiFeatureCollectionStage';
        var date = new Date().getTime();
        this.id = date;
        this.level = 3;
        this.label = 'FeatureCollection';
        this.Parent = layer;
        this._width = layer.width;
        this._height = layer.height;
        this.Show = 0;
    }
    SetFeatureCollectionStage(features){
     
        this.id = features.id + '_stage';
        this.FeatureCollection = features;
        this.label = features.name;
        this.FeatureCollection.DataChanged = 1;

    }
    ShowData() {
        this.Show = 1;

    }
    HideData() {
        this.Show = 0;
       
    }
}