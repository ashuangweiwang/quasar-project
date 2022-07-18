class PixiLayerStage extends PIXI.Container {
    constructor(stage) {
        super()
        this._width = stage._width;
        this._height = stage._height;
        var date = new Date().getTime();
        this.ClassName = 'PixiLayerStage'
        this.id = date;
        this.label = 'Layer'
        this.icon = 'photo'
        this.Parent = stage;
        this.Layer = new DGMGraphicsLayer(this);//放置绘图数据
		//this.Layer.expandable=false;

        this.level = 2;
        this.EditTools = new DGMEditTools(this);
        this.Layer.EditTools = this.EditTools;
        this.Layer.Parent = this
        this.addChild(this.Layer);
        this.LayerData;//放置真实数据
        this.Show = 0;
        this.Conversion=stage.Conversion;
        //this.Features=new DGMFeatureCollection;
       // this.addChild(this.Features);


    }
    AddGraphics(geometry) {
        var proPara = this.Parent.Map.projectPara;
    }
    GetLayerStage(layer, label, parent) {
        this.Layer = layer;
        this.Label = label
    }
    SetLayerStage(layer) {
        this.id = layer.id + '_stage'
        this.LayerData = layer;
        this.LayerData.Parent = this;
        this.label = layer.name;
        this.LayerData.DataChanged = 1;

    }
    AddChild(stage) {
        this.addChild(stage)
    }
    HighlightData(featureid){
        this.HideData();
        this.ShowHighlightData(featureid);


    }
    ShowHighlightData(fId) {
        this.Show = 1;

        // var Conversion = {};

        // Conversion.width = this.Parent._width;
        // Conversion.height = this.Parent._height;
        // Conversion.Bounds = this.Parent.Parent.Bounds;//
        // console.log('workspace的边界框', this.Parent.Parent.Bounds);//缺少的是dgmapp的bounds
        // Conversion.ProjectPara = this.Parent.ProjectPara;


        for (var k = 0; k < this.LayerData.ObjectArray.length; k++) {

            var oPixiTile = this.LayerData.ObjectArray[k];
            // oPixiTile.Tile = this.LayerData.ObjectArray[k];
            // this.AddChild(oPixiTile);
            console.log(oPixiTile)
            if (oPixiTile.BufferGeometry == undefined)
                continue;
            for (var l = 0; l < oPixiTile.BufferGeometry.length; l++) {

                var geometry = oPixiTile.BufferGeometry[l];

                this.Layer.AddHighlightGrphaicFromGeometry(geometry, this.Conversion,fId);
            }
        }

    }
    //主动保存当前数据
    SaveData() {
     
        
        //保存之前需要将layer的数据清空
        var gLen=this.LayerData.ObjectArray[0].BufferGeometry.length
        this.LayerData.ObjectArray[0].BufferGeometry.splice(0,gLen)
        for(var gI=0;gI<this.Layer.children.length;gI++){
            var graphics = this.Layer.children[gI]
            var curve= graphics.GraphicData[0]
            var geometry=this.Layer.To3dGeometry(curve,this.Conversion)
            geometry.FeatureID=graphics.FeatureID;

            geometry.Smooth=graphics.Smooth;

            console.log('graphics.FeatureID',graphics.FeatureID);
            console.log(geometry);
            this.LayerData.AddGeometry(geometry)
        }
        
    }

    //使layer显示

    ShowData() {
        this.Show = 1;

        // var Conversion = {};

        // Conversion.width = this.Parent._width;
        // Conversion.height = this.Parent._height;
        // Conversion.Bounds = this.Parent.Parent.Bounds;//
        // console.log('workspace的边界框', this.Parent.Parent.Bounds);//缺少的是dgmapp的bounds
        // Conversion.ProjectPara = this.Parent.ProjectPara;


        for (var k = 0; k < this.LayerData.ObjectArray.length; k++) {

            var oPixiTile = this.LayerData.ObjectArray[k];
            // oPixiTile.Tile = this.LayerData.ObjectArray[k];
            // this.AddChild(oPixiTile);
            console.log(oPixiTile)
            if (oPixiTile.BufferGeometry == undefined)
                continue;
            for (var l = 0; l < oPixiTile.BufferGeometry.length; l++) {

                var geometry = oPixiTile.BufferGeometry[l];

                this.Layer.AddGrphaicFromGeometry(geometry, this.Conversion);
            }
        }

    }
    //使layer隐藏
    HideData() {
        this.Show = 0;
        this.Layer.children.splice(0, this.Layer.children.length);

    }
    //<张建振>返回现有layer的feature列表
    GetFeatureIDList() {
        var featureCollection = this.LayerData.FeatureCollection.Features;
        var option = [];
        for (let index = 0; index < featureCollection.length; index++) {
            option.push(featureCollection[index].id);
        }
        return option;
    }
}