//import DGMObject from './DGMObject.js';

class DGMApplication3 extends DGMObject {
    constructor(curDomElem,curWorkSpace) {
        super();
        this.UI;
        this.ClassName = 'DGMApplication3';
        this.WorkSpace;
        this.frameStage;

        //wsw
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.set(0, 6, 10);
        this.camera.lookAt(0, 0, 0);

        this.GLrenderArea = new THREE.WebGLRenderer({ antialias: true });
        this.GLrenderArea.setPixelRatio(window.devicePixelRatio);
        this.GLrenderArea.setSize(780, 360);
        curDomElem.appendChild(this.GLrenderArea.domElement);


        this.zoomScale = [1, 1]; // 1.0;
        this.WorkSpaceStage = new PIXI.Container; //绘图
        this.downEvent = [];
        this.pivotPoint = [0, 0];
        this.frameStage = new FrameStage();//背景板
        // pick
        this.pickError = 10;

        // editor and test 'addline'
        this.EditTools = new DGMEditTools(this.scene);
        this.CreateDefaultWorkSpace();

        // Enable interactivity!
        //this.GLrenderArea.stage.interactive = true;

        // Make sure the whole canvas area is interactive, not just the circle.
        //this.GLrenderArea.stage.hitArea = this.GLrenderArea.renderer.screen;


    }
    //wsw
    
    /* CreateThreeModel(){

         //网格
         const gridHelper = new THREE.GridHelper(10, 20);
         this.scene.add(gridHelper);
 
         //添加立方体
         //const Boxgeometry = new THREE.BoxGeometry();
         //const Boxmaterial = new THREE.MeshBasicMaterial({ color: 0x00fff0 });
         //const cube = new THREE.Mesh(Boxgeometry, Boxmaterial);
         //scene.add(cube);
 
         //添加线
         const Linematerial = new THREE.LineBasicMaterial({ color: 0x0000ff });
         const points = [];
         points.push(new THREE.Vector3(-1, 1, 0));
         points.push(new THREE.Vector3(0, 0, 0));
         points.push(new THREE.Vector3(1, 1, 0));
         points.push(new THREE.Vector3(1, 1, 2));
         points.push(new THREE.Vector3(0, 0, 2));
         points.push(new THREE.Vector3(-1, 1, 2));
         const Linegeometry = new THREE.BufferGeometry().setFromPoints(points);
         const line = new THREE.LineLoop(Linegeometry, Linematerial);
         this.scene.add(line);
 
         //添加三角形面片
         const Tingeometry = new THREE.BufferGeometry();
         const vertices = new Float32Array([
             3.0, -1.0,  1.0,
             4.0, -1.0,  1.0,
             4.0,  1.0,  1.0,
 
             -1.0, 1.0, 1.0,
             -3.0, 1.0, 1.0,
             -3.0, -1.0, 1.0 
         ]);
         Tingeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));  // itemSize = 3 因为每个顶点都是一个三元组。
         const Tinmaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
         const mesh = new THREE.Mesh(Tingeometry, Tinmaterial);
         this.scene.add(mesh); 
 
         //添加三角网
 
 
         //三维坐标轴
         //const axesHelper = new THREE.AxesHelper(50);
         //scene.add(axesHelper);
 
         this.GLrenderArea.render(this.scene, this.camera);
    } */
 
    Clear() {
        this.WorkSpace.Clear();
        this.UI.Clear();
        super.Clear();
    }

    /* ZoomIn() {

        //this.Reset();
        //var viewcanvas = dgmApp.GLrenderArea.view;
        //var offset = svgcanvas.offsetWidth/2 - viewcanvas.offsetWidth/2;
        var x = this.GLrenderArea.stage.x;
        var y = this.GLrenderArea.stage.y;

        var pPoint = new PIXI.Point(this.GLrenderArea.view.width / 2, this.GLrenderArea.view.height / 2);
        var p2Point = new PIXI.Point(0, 0);
        var curpoint = this.GLrenderArea.stage.worldTransform.apply(pPoint, p2Point);

        //this.GoTo(pPoint.x+x,pPoint.y+y);
        this.GLrenderArea.stage.scale.set(this.zoomScale[0] * 1.2, this.zoomScale[1] * 1.2,);
        this.zoomScale[0] = this.zoomScale[0] * 1.2;
        this.zoomScale[1] = this.zoomScale[1] * 1.2;

        this.GLrenderArea.stage.y -= this.GLrenderArea.stage.height / 20;
        this.GLrenderArea.stage.x -= this.GLrenderArea.stage.width / 20;
        //this.GLrenderArea.stage.updateWorldTransform();
        //var p3Point = new PIXI.Point(0,0);			
        //var curpoint = this.GLrenderArea.stage.worldTransform.apply( pPoint,p3Point ); 
        this.GLrenderArea.stage.x += p3Point.x - p2Point.x;
        this.GLrenderArea.stage.y += p3Point.y - p2Point.y;		
    }
    ZoomOut() {

        this.GLrenderArea.stage.scale.set(this.zoomScale[0] / 1.2, this.zoomScale[1] / 1.2,);
        this.zoomScale[0] = this.zoomScale[0] / 1.2;
        this.zoomScale[1] = this.zoomScale[1] / 1.2;


        this.GLrenderArea.stage.y += this.GLrenderArea.stage.height / 20;
        this.GLrenderArea.stage.x += this.GLrenderArea.stage.width / 20;


    }
    Reset() {
        this.GLrenderArea.stage.scale.set(1);
        this.GLrenderArea.stage.x = 0;
        this.GLrenderArea.stage.y = 0;

    }

    GoTo(x, y) {
        this.pivotPoint[0] = this.GLrenderArea.stage.width / 2;
        this.pivotPoint[1] = this.GLrenderArea.stage.height / 2;
        var deltX = this.pivotPoint[0] - x;
        var deltY = this.pivotPoint[1] - y;
        this.Transform(deltX, deltY);
    } //鼠标位置变中心点
    Transform(x, y) {
        this.GLrenderArea.stage.x += x;
        this.GLrenderArea.stage.y += y;

    } */
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
        // data.points.push(10);
        // data.points.push(50);
        // data.points.push(400);
        // data.points.push(400);
        // FeatureCollection=new DGMFeatureCollection();
        //Tile.AddObject(FeatureCollection);
        graphicsPolygon.AddGraphicData(data);

        // this.zoomScale[0] = this.GLrenderArea.view.width / 0.05;
        //this.zoomScale[1] = this.GLrenderArea.view.height / 0.1;

        graphicsPolygon.DrawPolygon();

        var material=new THREE.MeshBasicMaterial( {color:0xfff000} );
        const graphicsPolygon3D=new THREE.Mesh(graphicsPolygon,material);
        this.scene.add(graphicsPolygon3D);//wsw
        this.GLrenderArea.render(this.scene, this.camera);
        //this.GLrenderArea.stage.x = this.GLrenderArea.stage.x - 0.10;
        //this.GLrenderArea.stage.y = this.GLrenderArea.stage.y - 0.50; //12400
        // this.GLrenderArea.stage.setTransform(0, 0, 500, 1500, 0, 0, 0, 0);

        // this.GLrenderArea.stage.setTransform(-0.1, -0.5, this.zoomScale[0], this.zoomScale[1], 0, 0, this.GLrenderArea.view.width / 2, this.GLrenderArea.view.height / 2);

        //this.GLrenderArea.stage.setTransform(-0.5 * this.zoomScale[1], -0.1 * this.zoomScale[0], this.zoomScale[0], this.zoomScale[1], 0, 0, 0, 0);
        // this.GLrenderArea.stage.setTransform(0, 0, this.zoomScale[0], this.zoomScale[1], 0, 0, 0, 0);
        




    }

    // Setup a ui.
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
        this.scene.add(Layer1);
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


        //   this.zoomScale[0] = this.GLrenderArea.view.width / 0.05;
        // this.zoomScale[1] = this.GLrenderArea.view.height / 0.1;

        //wsw
        var material=new THREE.MeshBasicMaterial( {color:0xfff000} );
        const graphicsFeature3D=new THREE.Mesh(graphicsFeature,material);
        this.scene.add(graphicsFeature3D);

        // this.GLrenderArea.stage.x = this.GLrenderArea.stage.x - 0.10;
        //this.GLrenderArea.stage.y = this.GLrenderArea.stage.y - 0.50; //12400
        // this.GLrenderArea.stage.setTransform(0, 0, 500, 1500, 0, 0, 0, 0);

        // this.GLrenderArea.stage.setTransform(-0.1, -0.5, this.zoomScale[0], this.zoomScale[1], 0, 0, this.GLrenderArea.view.width / 2, this.GLrenderArea.view.height / 2);

        //this.GLrenderArea.stage.setTransform(-0.5 * this.zoomScale[1], -0.1 * this.zoomScale[0], this.zoomScale[0], this.zoomScale[1], 0, 0, 0, 0);
        // this.GLrenderArea.stage.setTransform(0, 0, this.zoomScale[0], this.zoomScale[1], 0, 0, 0, 0);
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


        this.scene.add(quad);
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