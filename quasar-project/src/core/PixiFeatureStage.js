class PixiFeatureStage extends PIXI.Container {
    constructor(features) {
        super()
        this.Feature;
        this.ClassName = 'PixiFeatureStage';
        var date = new Date().getTime();
        this.id = date;
        this.level = 4;
        this.label = 'Feature';
        this.Parent = features;
        this._width = features.width;
        this._height = features.height;
        this.Show = 0;
        this.VisualStyle=new DGMVisualStyle();
	

    }
    SetFeatureStage(feature){
     
        this.id = feature.id + '_stage';
        this.Feature = feature;
        this.label = feature.Name;
        this.Feature.DataChanged = 1;

    }
    ShowData() {
        this.Show = 1;
    }
    HideData() {
        this.Show = 0;
      

    }






}