class PixiMapStage extends PIXI.Container {
    constructor(app) {
        super()
        this.Map;
        // this.LayersStage=[]
        var date = new Date().getTime();
        this.ClassName = 'PixiMapStage'

        this.id = date;
        this.label = 'Map'
        this.icon = 'map'
        this.level = 1
        this.Parent = app;
        this._width = app.renderer.width;
        this._height = app.renderer.height;
        this.DataChanged = 0;
        this.ProjectPara;
        this.ProjectPointlist;
        this.Show = 0;//默认为隐藏状态

        this.Conversion={};

    }
    SetStageWH(width, height) {
        this._width = width;
        this._height = height;
    }
    GetMapStage(map, label, parent) {
        this.Map = map;
        this.label = label;
        //this.Parent=parent;
    }
    SetMapStage(map) {
        this.ProjectPara = map.ProjectPara;
        this.id = map.id + '_stage';
        this.Map = map;
        this.label = map.name;
        this.Map.DataChanged = 1;
    }
    AddChild(stage) {
        this.addChild(stage)
    }
    ShowData() {
        this.Show = 1;

        // var Conversion = {}

        // Conversion.width = this._width;//<张建振>添加画布的宽度{}
        // Conversion.height = this._height;//<张建振>添加画布的高度
        // Conversion.Bounds = this.Parent.Bounds;//<张建振>添加MAP的大小
        // Conversion.ProjectPara = this.ProjectPara;//<张建振>添加转换比

        //画布大小在map层


        //layer
        for (var j = 0; j < this.children.length; j++) {

            var oPixiLayer = this.children[j];

            if (oPixiLayer.LayerData.ObjectArray.length > 0) {
                for (var k = 0; k < oPixiLayer.LayerData.ObjectArray.length; k++) {

                    var oPixiTile = oPixiLayer.LayerData.ObjectArray[k];

                    if (oPixiTile.BufferGeometry == undefined)
                        continue;
                    for (var l = 0; l < oPixiTile.BufferGeometry.length; l++) {

                        var geometry = oPixiTile.BufferGeometry[l];

                        this.Layer.AddGrphaicFromGeometry(geometry, this.Conversion);
                    }
                }
            }
        }
    }
    HideData() {
        for (var j = 0; j < this.children.length; j++) {

            var oPixiLayer = this.children[j];

            oPixiLayer.children.splice(0, oPixiLayer.children.length)
        }
    }
}