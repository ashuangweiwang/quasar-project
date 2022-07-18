class PixiView extends PIXI.Application {

    constructor(div, divWidth, divHeight) {
        super({
            antialias: true,
            autoDensity: true,
            width: divWidth,
            height: divHeight,
            // resizeTo:true,
            //transparent: true 
            backgroundColor: 0xF5F5F5
        });
        this.UI;
        //this.ClassName = 'DGMApplication';
        this.width1 = divWidth;
        this.Maps = [];
        this.Name;
        // this.GLrenderArea = new PIXI.Application({
        //     antialias: true,
        //     autoDensity: true,
        //     width: divWidth, 
        //     height:divHeight,
        //     //transparent: true 
        //     backgroundColor: 0xFFFFFF
        // });



        div.appendChild(this.renderer.view);

        this.zoomScale = [1, 1]; // 1.0;


        //this.WorkSpaceStage = new PIXI.Container; //绘图
        this.downEvent = [];
        this.pivotPoint = [0, 0];
        this.frameStage = new FrameStage(this);//背景板
        this.AddChild(this.frameStage);
        this.MapsStage = new PIXI.Container; //绘图
        this.AddChild(this.MapsStage);
        this.Grid=0;//0无网格1有网格

        // pick
        this.pickError = 10;

        // editor and test 'addline'
        this.EditTools = new DGMEditTools(this.stage);
        //this.CreateDefaultWorkSpace();
        this.pickError = 10;
        this.Bounds;//对应workspace的bounds
        console.log(this.renderArea)
        console.log(this.satge)

        //this.Conversion = {};
        //this.SetPixiSize(divWidth,divHeight);




    }
    SetPixiSize(width, height) {
        this.renderer.resize(width, height);
    }
    SetupPixiView(maps, bounds) {


        //console.log("zjz1",super.antialias)
        if (maps.length == 0) {
            return;
        }


        this.Bounds = bounds;


        for (var i = 0; i < maps.length; i++) {

            var oPixiMap = new PixiMapStage(this);

            var Conversion={}
            oPixiMap.SetMapStage(maps[i]);
            this.MapsStage.addChild(oPixiMap);

            Conversion.width = oPixiMap._width;//<张建振>添加画布的宽度{}
            Conversion.height = oPixiMap._height;//<张建振>添加画布的高度
            Conversion.Bounds = bounds;//<张建振>添加MAP的大小
            Conversion.ProjectPara = oPixiMap.ProjectPara;//<张建振>添加转换比
            Conversion.ProjectPointlist=oPixiMap.Map.ProjectPointlist;


            oPixiMap.Conversion = Conversion;

            console.log(this.Conversion);
            //画布大小在map层


            //layer
            for (var j = 0; j < oPixiMap.Map.ObjectArray.length; j++) {

                var oPixiLayer = new PixiLayerStage(oPixiMap);
                oPixiLayer.SetLayerStage(oPixiMap.Map.ObjectArray[j]);

                oPixiLayer.LayerData.parent = oPixiMap.Map

                oPixiLayer.Layer.EditTools = oPixiLayer.EditTools;
                oPixiLayer.Layer.label = 'Graphics'
                oPixiLayer.Layer.id= oPixiLayer.LayerData.parent.id+j+'graphics'

                // var line = new GraphicsFeature(this.EditTools);
			    // line.EditTools = this.EditTools;
			    // line.id = oPixiLayer.id+oPixiLayer.Layer.children.length;//geometry.id;
                // oPixiLayer.Layer.addChild(line)

                // oPixiLayer.Features=oPixiLayer.LayerData.FeatureCollection;
                //oPixiLayer.Layer.expandable=false
                //oPixiLayer.Layer.disabled = true
                console.log(' oPixiLayer.Features', oPixiLayer.Features);

                // oPixiLayer.expandable=false;//不显示layerdata的下一级
                oPixiMap.AddChild(oPixiLayer);
                // oPixiLayer.AddChild(oPixiLayer.LayerData.FeatureCollection)
                //console.log("XZZZ",oPixiLayer.Parent)
                //tile


                //显示feature在树中
                // var featureCollection = new DGMFeatureCollection
                // featureCollection.id = oPixiLayer.id + 'Features'
                // featureCollection.label =  oPixiLayer.LayerData.label
                // oPixiLayer.LayerData.children.push(featureCollection)
                //目前接受的数据中若不存在featurecollection则报错
                // oPixiLayer.Features.id=oPixiLayer.id + 'Features'
                // oPixiLayer.Features.label='Features'
                // for (var fc = 0; fc < oPixiLayer.LayerData.FeatureCollection.Features.length; fc++) {
                //     var feature = oPixiLayer.LayerData.FeatureCollection.Features[fc];
                //     feature.label = feature.name;
                //     oPixiLayer.Features.children.push(feature)
                // }
                //  FeatureCollection
                var oPixiFC = new PixiFeatureCollectionStage(oPixiLayer);
                oPixiFC.SetFeatureCollectionStage(oPixiLayer.LayerData.FeatureCollection);
                oPixiFC.Parent=oPixiLayer;//
                oPixiFC.id = oPixiLayer.id + 'Features';
                oPixiFC.label = 'Features';
                oPixiLayer.addChild(oPixiFC);
                for (var l = 0; l < oPixiLayer.LayerData.FeatureCollection.Features.length; l++) {
                    var oPixiFeature = new PixiFeatureStage(oPixiFC)
                    oPixiFeature.SetFeatureStage(oPixiLayer.LayerData.FeatureCollection.Features[l])
                    oPixiFC.addChild(oPixiFeature)
                }



                if (oPixiLayer.LayerData.ObjectArray.length > 0) {
                    for (var k = 0; k < oPixiLayer.LayerData.ObjectArray.length; k++) {

                        var oPixiTile = new PixiTileStage(oPixiLayer);
                        //console.log("XZZZ",oPixiTile.Parent.Parent)
                        oPixiTile.Tile = oPixiLayer.LayerData.ObjectArray[k];
                        // var oPixiFC= new PixiFeatureCollectionStage(oPixiLayer);
                        // oPixiFC.SetFeatureCollectionStage(oPixiLayer.LayerData.FeatureCollection[K]);
                        // for(var l=0; l<oPixiLayer.LayerData.FeatureCollection.Feature.length;l++){
                        //     var oPixiFeature=new PixiFeatureStage(oPixiLayer.LayerData.FeatureCollection)
                        //     oPixiFeature. SetFeatureStage(oPixiLayer.LayerData.FeatureCollection.Feature[i])

                        // }

                        // oPixiLayer.AddChild(oPixiTile);



                        //Geometry  此处取Tile里面的Geometry
                        //？？？添加切片新增的map 没有tile 需要做个判断 此处报错length未定义


                        //默认不显示就注释 显示就取消
                        // if(oPixiTile.Tile.BufferGeometry==undefined)
                        // continue;
                        // for (var l = 0; l < oPixiTile.Tile.BufferGeometry.length; l++) {

                        //     var geometry = oPixiTile.Tile.BufferGeometry[l];

                        //     oPixiLayer.Layer.AddGrphaicFromGeometry(geometry,Conversion);


                        // }
                    }
                }
            oPixiLayer.ShowData();
            }
            
        }
    }
    AddChild(stage) {
        this.stage.addChild(stage)
    }
    RemoveStage(stage) {

    }
    Clear() {
        this.WorkSpace.Clear();
        this.UI.Clear();
        super.Clear();
    }

    ZoomIn() {

        var x = this.stage.x;
        var y = this.stage.y;

        var pPoint = new PIXI.Point(this.view.width / 2, this.view.height / 2);
        var p2Point = new PIXI.Point(0, 0);
        var curpoint = this.stage.worldTransform.apply(pPoint, p2Point);

        //this.GoTo(pPoint.x+x,pPoint.y+y);
        this.stage.scale.set(this.zoomScale[0] * 1.2, this.zoomScale[1] * 1.2,);
        this.zoomScale[0] = this.zoomScale[0] * 1.2;
        this.zoomScale[1] = this.zoomScale[1] * 1.2;

        this.stage.y -= this.stage.height / 20;
        this.stage.x -= this.stage.width / 20;

    }
    ZoomOut() {

        this.stage.scale.set(this.zoomScale[0] / 1.2, this.zoomScale[1] / 1.2,);
        this.zoomScale[0] = this.zoomScale[0] / 1.2;
        this.zoomScale[1] = this.zoomScale[1] / 1.2;


        this.stage.y += this.stage.height / 20;
        this.stage.x += this.stage.width / 20;


    }
    Reset() {
        this.stage.scale.set(1);
        this.stage.x = 0;
        this.stage.y = 0;

    }

    GoTo(x, y) {
        this.pivotPoint[0] = this.stage.width / 2;
        this.pivotPoint[1] = this.stage.height / 2;
        var deltX = this.pivotPoint[0] - x;
        var deltY = this.pivotPoint[1] - y;
        this.Transform(deltX, deltY);
    } //鼠标位置变中心点
    Transform(x, y) {
        this.stage.x += x;
        this.stage.y += y;

    }
    Polygon() {
        if (this.WorkSpace == null)
            this.WorkSpace = new DGMWorkSpace();

        var Map = new DGMGeoMap2D();
        Map.Name = 'map';
        this.WorkSpace.AddObject(Map);

        var Layer1 = new DGMGraphicsLayer();
        Layer1.Name = 'lay';
        Map.AddObject(Layer1);

        var Tile = new DGMTile();
        Layer1.AddObject(Tile);

        var graphicsPolygon = new GraphicsPolygon();

        Tile.AddObject(graphicsPolygon);



        graphicsPolygon.id = 1;
        graphicsPolygon.Name = 'gra';


        var data = new GraphicData();
        data.GeoType = 'Polygon';
        data.points.push(300);
        data.points.push(300);
        data.points.push(100);
        data.points.push(100);

        graphicsPolygon.AddGraphicData(data);
        this.stage.addChild(graphicsPolygon);

        //this.stage.setTransform(0, 0, this.zoomScale[0], this.zoomScale[1], 0, 0, 0, 0);
        graphicsPolygon.DrawPolygon();

    }

    // Setup a ui.
    CreateFrameStage() {

        //画网格
        this.frameStage.DrawGrid();


    }
    RemoveFrameStage(){
        //取消网格
        this.frameStage.RemoveGrid()
    }
    SetActiveEditLayer(Layer1) {
        this.EditTools.ActiveEditLayer = Layer1;
    }

    SetActiveEditLayer() {
        return this.EditTools.ActiveEditLayer;
    }

    CreateDefaultWorkSpace() {
        this.WorkSpace = new DGMWorkSpace();
        this.WorkSpace.id = "WorkSpace";
        this.WorkSpace.Name = "WorkSpace";

        var Map = new DGMGeoMap2D();
        Map.id = 'map';
        Map.Name = 'map';
        this.WorkSpace.AddObject(Map);

        var Layer1 = new DGMGraphicsLayer();
        Layer1.id = 'graphlayer';
        Layer1.Name = 'lay';
        Map.AddObject(Layer1);

        this.SetActiveEditLayer(Layer1);
        this.EditTools.ActiveEditLayer = Layer1;
        this.stage.addChild(Layer1);
    }

    CreateWorkSpace() {
        if (this.WorkSpace == null)
            this.WorkSpace = new DGMWorkSpace();

        var Map = new DGMGeoMap2D();
        Map.Name = 'map';
        this.WorkSpace.AddObject(Map);

        var Layer1 = new DGMGraphicsLayer();
        Layer1.Name = 'lay';
        Map.AddObject(Layer1);

        var Tile = new DGMTile();
        Layer1.AddObject(Tile);

        // var graphicsFeature = new GraphicsFeature(this);
        var graphicsFeature = new GraphicsFeature();
        Tile.AddObject(graphicsFeature);



        graphicsFeature.id = 1;
        graphicsFeature.Name = 'gra';


        var data = new GraphicData();
        data.GeoType = 'Line';

        data.points.push(700);
        data.points.push(100);
        data.points.push(600);
        data.points.push(300);
        data.points.push(100);
        data.points.push(500);
        // data.points.push(400);
        // data.points.push(400);
        // FeatureCollection=new DGMFeatureCollection();
        //Tile.AddObject(FeatureCollection);
        graphicsFeature.AddGraphicData(data);


        //   this.zoomScale[0] =this.view.width / 0.05;
        // this.zoomScale[1] =this.view.height / 0.1;

        this.stage.addChild(graphicsFeature);
        //this.stage.x =this.stage.x - 0.10;
        //this.GLrenderArea.stage.y =this.stage.y - 0.50; //12400
        //this.stage.setTransform(0, 0, 500, 1500, 0, 0, 0, 0);

        //this.stage.setTransform(-0.1, -0.5, this.zoomScale[0], this.zoomScale[1], 0, 0,this.view.width / 2,this.view.height / 2);

        //this.GLrenderArea.stage.setTransform(-0.5 * this.zoomScale[1], -0.1 * this.zoomScale[0], this.zoomScale[0], this.zoomScale[1], 0, 0, 0, 0);
        //this.stage.setTransform(0, 0, this.zoomScale[0], this.zoomScale[1], 0, 0, 0, 0);
        graphicsFeature.DrawGraphic();



    }
    CreateWorkSpaceMesh() {
        const geometry = new PIXI.Geometry()
            .addAttribute('aVertexPosition', // the attribute name
                [-150, -100, // x, y
                    100, -100, // x, y
                    100, 500, -100, 100,
                    150, 150
                ], // x, y
                2) // the size of the attribute
            .addAttribute('aUvs', // the attribute name
                [0, 0, // u, v
                    1, 0, // u, v
                    1, 1,
                    0, 1,
                    1, 1
                ], // u, v
                2) // the size of the attribute
            .addIndex([0, 1, 2, 0, 2, 3]);

        const vertexSrc = `
precision mediump float;
attribute vec2 aVertexPosition;
attribute vec2 aUvs;
uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;
varying vec2 vUvs;
void main() {
  vUvs = aUvs;
  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
}`;

        const fragmentSrc = `
//#version 300 es
precision mediump float;
varying vec2 vUvs;
uniform sampler2D uSampler2;
uniform float time;
//precision highp sampler2DArray;

//	in vec3 EntryPoint;
//in vec3 Normal;
//in mat4 model;
//in mat4 modelView;
//in mat4 projection;			
//out vec4 out_FragColor;
     
//uniform sampler2D LODindexTextureArray;
//uniform sampler2DArray LODdataTextureArray;
  
void main() {
      gl_FragColor = texture2D(uSampler2, vUvs + sin( (time + (vUvs.x) * 14.) ) * 0.1 );
}`;

        const uniforms = {
            uSampler2: PIXI.Texture.from('bunny.png'),
            time: 0,
        };

        const shader = PIXI.Shader.from(vertexSrc, fragmentSrc, uniforms);


        this.WorkSpace = new DGMWorkSpace();
        var Map = new DGMGeoMap2D();
        Map.Name = 'map';
        this.WorkSpace.AddObject(Map);

        var Layer1 = new DGMGraphicsLayer();
        Layer1.Name = 'lay';
        Map.AddObject(Layer1);

        var Tile = new DGMTile();
        Layer1.AddObject(Tile);

        //var meshFeature = new MeshFeature();
        const quad = new PIXI.Mesh(geometry, shader); // new PIXI.Mesh(geometry, shader);

        Tile.AddObject(quad);


        quad.position.set(400, 300);
        quad.scale.set(2);
        //quad.drawMode = PIXI.DRAW_MODES.LINES;
        //quad.lineStyle(4, 0xFEEB77, 4);
        // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
        quad.interactive = true;

        // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
        quad.buttonMode = true;


        // quad
        //     .on('pointerdown', onDragStart)
        //     .on('pointerup', onDragEnd)
        //     .on('pointerupoutside', onDragEnd)
        //     .on('pointermove', onDragMove);


        this.stage.addChild(quad);
    }


    CreateWorkSpaceFromJSON(url) {
        var request = new XMLHttpRequest();
        request.open("get", url);
        request.send(null);
        request.onload = function () {
            if (request.status == 200) {
                var json = JSON.parse(request.responseText);
                console.log(json);
            }
        }

        // var json = JSON.parse(jsonfile);
    }
    SetupRender(s, pixi_stage) {
        pixi_stage.addChild(s);
    }




}