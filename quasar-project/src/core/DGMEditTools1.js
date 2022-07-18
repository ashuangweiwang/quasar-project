class OPERATION {
  static NONE = 0;
  static PICK = 1;
  static EDIT = 1;
}

class EDIT_OPTION {
  static EDIT_NONE = 0;
  static ADD_POINTS = 3;
  static ADD_LINES = 4;
  static ADD_POLYGONS = 5;
  static DELETE_POINTS = 6;
  static DELETE_LINES = 7;
  static DELETE_POLYGONS = 8;
  static EDIT_LINE = 8;
  static EDIT_POLYGONS = 9;
}

class MODIFY_OPTION {
  static MOD_NONE = 30;
  static MOD_POINTS = 31;
  static MOD_LINES = 32;
  static MOD_POLYS = 33;
}

class EDIT_POINT {
  static EDIT_NONE = 50;
  static ADDPOINT = 51;
  static DELETEPOINT = 52;
  static MOVEPOINT = 52;
}

class PointGraphic extends PIXI.Graphics {
  constructor(curEditTool) {
    super();
    this.point = new PIXI.Point();
    this.interactive = true;
    this.buttonMode = true; //?
    this.cursor = "move"; //?
    this.EditTools = curEditTool;
    this.on("pointerdown", this.onDragStart)
      .on("pointerup", this.onDragEnd)
      .on("pointerupoutside", this.onDragEnd)
      .on("pointermove", this.onDragMove)
      .on("mouseover", this.onMouseOver)
      .on("mouseout", this.onMouseOut);
  }

  onDragStart(event) {
    //this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    //dgmApp.EditTools.EditOneLine(this);
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.interactive = true;
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      //this.interactive = false;
      //const newPosition = this.data.getLocalPosition(this.parent);
      this.point.x = event.layerX; //往上找有定位属性的父元素的左上角（自身有定位属性的话就是相对于自身），都没有的话，就是相对于body的左上角
      this.point.y = event.layerY;
      this.EditTools.ReDraw();
    }
  }

  onMouseOver() {
    this.alpha = 0.5;
  }

  onMouseOut() {
    this.alpha = 1;
  }
}

// ʹ��edit֮ǰ��Ҫ���ⲿ��ui�Լ�����ѡȡ��ص�picking����Ϊfalse
class DGMEditTools {
  constructor(workspace_stage) {
    this.Operation = OPERATION.NONE;
    this.EditOption = EDIT_OPTION.EDIT_NONE;
    this.ModifyOption = MODIFY_OPTION.MOD_NONE;
    this.EditPoint = EDIT_POINT.EDIT_NONE;
    this.WorkSpace = workspace_stage;

    this.ActiveEditLayer = workspace_stage.Layer; //new DGMGraphicsLayer();

    //this.WorkSpace.addChild(this.ActiveEditLayer)

    //  this.Canvas = canvasView;
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
    this.PolysGraphcis = null;
    this.PointStyle = new PIXI.LineStyle();
    this.LineStyle = new PIXI.LineStyle();
    this.FillStyle = new PIXI.FillStyle();

    this.PointStyle.width = 4;

    this.PointStyle.color = PIXI.utils.rgb2hex([
      10 / 255.0,
      10 / 255.0,
      10 / 255.0,
    ]);

    this.LineStyle.width = 3;
    this.LineStyle.color = PIXI.utils.rgb2hex([
      0 / 255.0,
      0 / 255.0,
      190 / 255.0,
    ]);
    this.LineStyle.native = false;

    this.FillStyle.color = 0x0ff0;
    this.EditFeature;

    this.pickError = 10;

    this.Smooth = 1;
  }

  Destroy() {
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
    this.PolysGraphcis = null;
    this.PointStyle = null;
    this.LineStyle = null;
    this.FillStyle = null;
  }

  //
  EditOneLine(feature) {
    if (this.EditOption == EDIT_OPTION.EDIT_LINE) return;

    if (this.Operation == OPERATION.EDIT) return;

    this.Operation = OPERATION.EDIT;
    this.EditOption = EDIT_OPTION.EDIT_LINE;

    // 2
    this.LinesGraphcis = new PIXI.Graphics();

    // 3
    this.WorkSpace.addChild(this.LinesGraphcis);

    if (feature.ClassName == "GraphicsFeature") {
      this.EditFeature = feature;
      for (var i = 0; i < feature.GraphicData.length; i++) {
        if (feature.GraphicData[i].GeoType == "Line") {
          for (var j = 0; j < feature.GraphicData[i].points.length; j++) {
            var pointObj = new PointGraphic(this);
            pointObj.point.x = feature.GraphicData[i].points[j].x;
            pointObj.point.y = feature.GraphicData[i].points[j].y;
            this.PointsGraphcis.push(pointObj);
            this.WorkSpace.addChild(pointObj);
          }
        }
      }
    }

    this.ReDraw();
  }

  EndEditOneLine() {
    if (this.EditOption != EDIT_OPTION.EDIT_LINE) return;

    if (this.EditFeature.ClassName == "GraphicsFeature") {
      var curve = this.EditFeature.GraphicData[0];
      curve.points = [];

      for (var i = 0; i < this.PointsGraphcis.length; i++) {
        curve.points.push(this.PointsGraphcis[i].point);
      }

      this.EditFeature.DrawGraphic();
      this.EditFeature = null;
    }

    //3
    if (this.LinesGraphcis) this.WorkSpace.removeChild(this.LinesGraphcis);

    for (var i = 0; i < this.PointsGraphcis.length; i++) {
      this.WorkSpace.removeChild(this.PointsGraphcis[i]);
    }

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;

    //1
    this.Operation = OPERATION.NONE;
    this.EditOption = EDIT_OPTION.EDIT_NONE;

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
  }
  AddLines() {
    if (this.EditOption == EDIT_OPTION.ADD_LINES) return;

    if (this.Operation == OPERATION.EDIT) return;

    // 1
    this.Operation = OPERATION.EDIT;
    this.EditOption = EDIT_OPTION.ADD_LINES;

    // 2
    this.LinesGraphcis = new PIXI.Graphics();

    // 3
    this.WorkSpace.addChild(this.LinesGraphcis);
  }

  // ���������߹��ܵ���
  EndAddLines(featureid) {
    //1
    this.Operation = OPERATION.NONE;
    this.EditOption = EDIT_OPTION.EDIT_NONE;
    if (this.ActiveEditLayer.ClassName == "DGMGraphicsLayer") {
      var points = [];
      var x = -999999;
      var y = -999999;
      for (var i = 0; i < this.PointsGraphcis.length; i++) {
        if (
          x != this.PointsGraphcis[i].point.x &&
          y != this.PointsGraphcis[i].point.y
        ) {
          points.push(this.PointsGraphcis[i].point);
          x = this.PointsGraphcis[i].point.x;
          y = this.PointsGraphcis[i].point.y;
        }
      }

      if (points.length) {
        var lineStyle = new PIXI.LineStyle();
        var featureCollection =
          this.WorkSpace.LayerData.FeatureCollection.Features;
        for (let index = 0; index < featureCollection.length; index++) {
          if (featureid == featureCollection[index].id) {
            lineStyle.color = featureCollection[index].VisualStyle.Color;
            lineStyle.width = featureCollection[index].VisualStyle.Size;
            break;
          }
        }
        //lineStyle.color = PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]);;
        var name = "line1";
        this.ActiveEditLayer.AddCurveFromPoints(
          points,
          name,
          featureid,
          0,
          lineStyle
        );
      }
    }

    //3
    if (this.LinesGraphcis) this.WorkSpace.removeChild(this.LinesGraphcis);

    for (var i = 0; i < this.PointsGraphcis.length; i++) {
      this.WorkSpace.removeChild(this.PointsGraphcis[i]);
    }

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
  }
  // �����༭����
  AddPoints() {
    if (this.EditOption == EDIT_OPTION.ADD_POINTS) return;

    if (this.Operation == OPERATION.EDIT) return;

    // 1
    this.Operation = OPERATION.EDIT;
    this.EditOption = EDIT_OPTION.ADD_POINTS;

    // 2
    this.LinesGraphcis = new PIXI.Graphics();

    // 3
    this.WorkSpace.addChild(this.LinesGraphcis);
  }

  // ���������߹��ܵ���
  EndAddPoints(featureid) {
    //1
    this.Operation = OPERATION.NONE;
    this.EditOption = EDIT_OPTION.EDIT_NONE;
    if (this.ActiveEditLayer.ClassName == "DGMGraphicsLayer") {
      var points = [];
      var x = -999999;
      var y = -999999;
      for (var i = 0; i < this.PointsGraphcis.length; i++) {
        if (
          x != this.PointsGraphcis[i].point.x &&
          y != this.PointsGraphcis[i].point.y
        ) {
          points.push(this.PointsGraphcis[i].point);
          x = this.PointsGraphcis[i].point.x;
          y = this.PointsGraphcis[i].point.y;
        }
      }

      if (points.length) {
        var lineStyle = new PIXI.LineStyle();
        var featureCollection =
          this.WorkSpace.LayerData.FeatureCollection.Features;
        for (let index = 0; index < featureCollection.length; index++) {
          if (featureid == featureCollection[index].id) {
            lineStyle.color = featureCollection[index].VisualStyle.Color;
            lineStyle.width = featureCollection[index].VisualStyle.Size;
            break;
          }
        }
        //lineStyle.color = PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]);;
        var name = "line1";
        this.ActiveEditLayer.AddPointsFromPoints(
          points,
          name,
          featureid,
          0,
          lineStyle
        );
      }
    }

    //3
    if (this.LinesGraphcis) this.WorkSpace.removeChild(this.LinesGraphcis);

    for (var i = 0; i < this.PointsGraphcis.length; i++) {
      this.WorkSpace.removeChild(this.PointsGraphcis[i]);
    }

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
  }
  AddPolys() {
    if (this.EditOption == EDIT_OPTION.ADD_POLYGONS) return;

    if (this.Operation == OPERATION.EDIT) return;

    // 1
    this.Operation = OPERATION.EDIT;
    this.EditOption = EDIT_OPTION.ADD_POLYGONS;

    // // 2
    // this.PolysGraphcis = new PIXI.Graphics();

    // // 3
    // this.WorkSpace.addChild(this.PolysGraphcis);
    // 2
    this.LinesGraphcis = new PIXI.Graphics();

    // 3
    this.WorkSpace.addChild(this.LinesGraphcis);
  }
  EndAddPolys(featureid) {
    //1
    //1
    this.Operation = OPERATION.NONE;
    this.EditOption = EDIT_OPTION.EDIT_NONE;

    if (this.ActiveEditLayer.ClassName == "DGMGraphicsLayer") {
      var points = [];
      var x = -999999;
      var y = -999999;
      for (var i = 0; i < this.PointsGraphcis.length; i++) {
        if (
          x != this.PointsGraphcis[i].point.x &&
          y != this.PointsGraphcis[i].point.y
        ) {
          points.push(this.PointsGraphcis[i].point);
          x = this.PointsGraphcis[i].point.x;
          y = this.PointsGraphcis[i].point.y;
        }
      }

      if (points.length) {
        var lineStyle = new PIXI.LineStyle();
        var fillStyle = new PIXI.FillStyle();

        //var lineStyle = new PIXI.LineStyle();
        var featureCollection =
          this.WorkSpace.LayerData.FeatureCollection.Features;
        for (let index = 0; index < featureCollection.length; index++) {
          if (featureid == featureCollection[index].id) {
            lineStyle.color = featureCollection[index].VisualStyle.Color;
            fillStyle.color = featureCollection[index].VisualStyle.Color;
            break;
          }
        }
        /*
                lineStyle.color = PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]);;
                lineStyle.width = 1;
                var fillStyle = new PIXI.FillStyle();
                fillStyle.color = PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]);;
                fillStyle.texture = 1;
                */
        var name = "polygon1";
        this.ActiveEditLayer.AddPolygonFromPoints(
          points,
          name,
          featureid,
          0,
          lineStyle,
          fillStyle
        );
      }
    }

    //3
    if (this.LinesGraphcis) this.WorkSpace.removeChild(this.LinesGraphcis);

    for (var i = 0; i < this.PointsGraphcis.length; i++) {
      this.WorkSpace.removeChild(this.PointsGraphcis[i]);
    }

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
  }
  EditOnePoly(feature) {
    if (this.EditOption == EDIT_OPTION.EDIT_POLYGONS) return;

    if (this.Operation == OPERATION.EDIT) return;

    this.Operation = OPERATION.EDIT;
    this.EditOption = EDIT_OPTION.EDIT_POLYGONS;

    // 2
    this.LinesGraphcis = new PIXI.Graphics();

    // 3
    this.WorkSpace.addChild(this.LinesGraphcis);

    if (feature.ClassName == "GraphicsPolygon") {
      this.EditFeature = feature;
      for (var i = 0; i < feature.GraphicData.length; i++) {
        if (feature.GraphicData[i].GeoType == "Polygon") {
          for (var j = 0; j < feature.GraphicData[i].points.length; j += 2) {
            var pointObj = new PointGraphic(this);
            pointObj.point.x = feature.GraphicData[i].points[j];
            pointObj.point.y = feature.GraphicData[i].points[j + 1];
            this.PointsGraphcis.push(pointObj);
            this.WorkSpace.addChild(pointObj);
          }
        }
      }
    }
    console.log("edit 的", this);
    this.ReDraw();
  }
  EndEditOnePoly() {
    if (this.EditOption != EDIT_OPTION.EDIT_POLYGONS) {
      console.log("endedit", this);
      return;
    }

    if (this.EditFeature.ClassName == "GraphicsPolygon") {
      var curve = this.EditFeature.GraphicData[0];
      curve.points = [];

      for (var i = 0; i < this.PointsGraphcis.length; i++) {
        curve.points.push(this.PointsGraphcis[i].point.x);
        curve.points.push(this.PointsGraphcis[i].point.y);
      }

      this.EditFeature.DrawPolygon();
      this.EditFeature = null;
    }

    //3
    if (this.LinesGraphcis) this.WorkSpace.removeChild(this.LinesGraphcis);

    for (var i = 0; i < this.PointsGraphcis.length; i++) {
      this.WorkSpace.removeChild(this.PointsGraphcis[i]);
    }

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;

    //1
    this.Operation = OPERATION.NONE;
    this.EditOption = EDIT_OPTION.EDIT_NONE;

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
  }
  EditOnePoint(feature) {
    if (this.EditOption == EDIT_OPTION.EditOnePoint) return;

    if (this.Operation == OPERATION.EDIT) return;

    this.Operation = OPERATION.EDIT;
    this.EditOption = EDIT_OPTION.EDIT_POINT;

    // 2
    this.LinesGraphcis = new PIXI.Graphics();

    // 3
    this.WorkSpace.addChild(this.LinesGraphcis);

    if (feature.ClassName == "GraphicsPoint") {
      this.EditFeature = feature;
      for (var i = 0; i < feature.GraphicData.length; i++) {
        if (feature.GraphicData[i].GeoType == "Point") {
          for (var j = 0; j < feature.GraphicData[i].points.length; j++) {
            var pointObj = new PointGraphic(this);
            pointObj.point.x = feature.GraphicData[i].points[j].x;
            pointObj.point.y = feature.GraphicData[i].points[j].y;
            this.PointsGraphcis.push(pointObj);
            this.WorkSpace.addChild(pointObj);
          }
        }
      }
    }

    this.ReDraw();
  }

  EndEditOnePoint() {
    if (this.EditOption != EDIT_OPTION.EDIT_POINT) return;

    if (this.EditFeature.ClassName == "GraphicsPoint") {
      var curve = this.EditFeature.GraphicData[0];
      curve.points = [];

      for (var i = 0; i < this.PointsGraphcis.length; i++) {
        curve.points.push(this.PointsGraphcis[i].point);
      }

      this.EditFeature.DrawGraphic();
      this.EditFeature = null;
    }

    //3
    if (this.LinesGraphcis) this.WorkSpace.removeChild(this.LinesGraphcis);

    for (var i = 0; i < this.PointsGraphcis.length; i++) {
      this.WorkSpace.removeChild(this.PointsGraphcis[i]);
    }

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;

    //1
    this.Operation = OPERATION.NONE;
    this.EditOption = EDIT_OPTION.EDIT_NONE;

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
  }
  // �༭������ػ���
  ReDraw() {
    //this.drawPolys();
    this.drawLines();
    this.drawPoints();
  }

  drawPolys() {
    if (this.PolysGraphcis == null) return;
    this.PolysGraphcis.clear();
    if (this.PointsGraphcis.length) {
      this.PolysGraphcis.beginFill(this.FillStyle.color, 1);
      // this.LinesGraphcis.lineStyle(this.LineStyle.width, this.LineStyle.color, 1, 0.5, false);
      //this.PolysGraphcis.lineStyle(this.LineStyle);
      this.PolysGraphcis.moveTo(
        this.PointsGraphcis[i].point.x,
        this.PointsGraphcis[i].point.y
      );
      for (var i = 1; i < this.PointsGraphcis.length; i++) {
        this.PolysGraphcis.lineTo(
          this.PointsGraphcis[i].point.x,
          this.PointsGraphcis[i].point.y
        );
      }

      this.PolysGraphcis.endFill();

      //this.drawPoints();
    }
  }
  drawLines() {
    if (this.LinesGraphcis == null) return;

    this.LinesGraphcis.clear();
    //this.WorkSpace.addChild(this.LinesGraphcis);

    if (this.PointsGraphcis.length) {
      //this.LinesGraphcis.lineStyle(this.LineStyle);
      //this.LinesGraphcis.lineStyle(this.LineStyle);
      var pos = this.PointsGraphcis[0].point;
      this.LinesGraphcis.lineStyle(
        this.LineStyle.width,
        this.LineStyle.color,
        1,
        0.5,
        false
      );
      this.LinesGraphcis.moveTo(pos.x, pos.y);
      for (var i = 0; i < this.PointsGraphcis.length - 2; i++) {
        pos = this.PointsGraphcis[i].point;
        var pos1 = this.PointsGraphcis[i + 1].point;
        var pos2 = this.PointsGraphcis[i + 2].point;

        var N = 20;
        for (var t = 0; t <= N; t++) {
          var p;
          if (this.Smooth == 0) {
            p = pos1;
          } else {
            p = Hermit(pos, pos1, pos2, (t * 1.0) / N);
          }
          //var p = Hermit1(pos.x,pos.y,pos1.x,pos1.y,slop1,slop2,t);
          // var p = pos1//= Hermit(pos, pos1, pos2, t * 1.000 / N);
          this.LinesGraphcis.lineTo(p.x, p.y);
        }
      }

      if (i == this.PointsGraphcis.length - 2) {
        pos = this.PointsGraphcis[i + 1].point;
        this.LinesGraphcis.lineTo(pos.x, pos.y);
      }
      //this.drawPoints();
    }
  }

  drawPoints() {
    for (var i = 0; i < this.PointsGraphcis.length; i++) {
      this.PointsGraphcis[i].clear();
      //this.PointsGraphcis.set
      this.PointsGraphcis[i].beginFill(this.PointStyle.color, 1);
      var pos = this.PointsGraphcis[i].point;

      this.PointsGraphcis[i].drawCircle(pos.x, pos.y, this.PointStyle.width);
      this.PointsGraphcis[i].endFill();
    }
  }

  onmousemove(event, offset) {
    //curpoint = this.WorkSpace.toGlobal( );
    var pPoint = new PIXI.Point(event.layerX - offset, event.layerY);
    var p2Point = new PIXI.Point(event.layerX - offset, event.layerY);
    var curpoint = this.WorkSpace.worldTransform.applyInverse(pPoint, p2Point);

    //curpoint.x = pPoint.x- this.WorkSpace.x;
    //curpoint.y = pPoint.y- this.WorkSpace.y;

    if (this.EditOption == EDIT_OPTION.ADD_POLYGONS) {
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        this.PointsGraphcis[lastOne].point.x = curpoint.x;
        this.PointsGraphcis[lastOne].point.y = curpoint.y; //,event.layerY);
        this.ReDraw();
      }
    }
    if (this.EditOption == EDIT_OPTION.ADD_LINES) {
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        this.PointsGraphcis[lastOne].point.x = curpoint.x;
        this.PointsGraphcis[lastOne].point.y = curpoint.y; //,event.layerY);
        this.ReDraw();
      }
    }
  }
  ontouchmove(event, offset) {
    //curpoint = this.WorkSpace.toGlobal( );
    var pPoint = new PIXI.Point(event.layerX - offset, event.layerY);
    var p2Point = new PIXI.Point(event.layerX - offset, event.layerY);
    var curpoint = this.WorkSpace.worldTransform.applyInverse(pPoint, p2Point);

    //curpoint.x = pPoint.x- this.WorkSpace.x;
    //curpoint.y = pPoint.y- this.WorkSpace.y;

    if (this.EditOption == EDIT_OPTION.ADD_POLYGONS) {
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        this.PointsGraphcis[lastOne].point.x = curpoint.x;
        this.PointsGraphcis[lastOne].point.y = curpoint.y; //,event.layerY);
        this.ReDraw();
      }
    }
    if (this.EditOption == EDIT_OPTION.ADD_POINTS) {
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        this.PointsGraphcis[lastOne].point.x = curpoint.x;
        this.PointsGraphcis[lastOne].point.y = curpoint.y; //,event.layerY);
        this.ReDraw();
      }
    }
    if (this.EditOption == EDIT_OPTION.ADD_LINES) {
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        this.PointsGraphcis[lastOne].point.x = curpoint.x;
        this.PointsGraphcis[lastOne].point.y = curpoint.y; //,event.layerY);
        this.ReDraw();
      }
    }
  }
  ontouchstart(event, offset) {
    // var st=document.documentElement.scrollTop;

    // var box=document.getElementById('editBox');
    // var left=event.clientX+7;
    // var top=event.clientY;
    // box.style.left=left+st+'px';
    // box.style.top=top+st+'px';
    // box.style.display='block'

    var button = event.button;

    var pPoint = new PIXI.Point(event.layerX - offset, event.layerY);
    var p2Point = new PIXI.Point(event.layerX - offset, event.layerY);
    var curpoint = this.WorkSpace.worldTransform.applyInverse(pPoint, p2Point);
    //curpoint.x = pPoint.x- this.WorkSpace.x;
    //curpoint.y = pPoint.y- this.WorkSpace.y;
    if (this.EditOption == EDIT_OPTION.ADD_LINES) {
      // right button
      if (button == 2) {
        var lastOne = this.PointsGraphcis.length - 1;
        if (lastOne > 0) {
          this.WorkSpace.removeChild(this.PointsGraphcis[lastOne]);
        }
        this.PointsGraphcis.pop();
        // PointsGraphcis.pop();
        return;
      }

      // left buttuon
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        if (
          this.PointsGraphcis[lastOne].point.x == curpoint.x &&
          curpoint.y == this.PointsGraphcis[lastOne].point.y
        ) {
          var pointObj = new PointGraphic(this);
          pointObj.point.x = curpoint.x;
          pointObj.point.y = curpoint.y;
          this.PointsGraphcis.push(pointObj);
          this.WorkSpace.addChild(pointObj);

          this.ReDraw();
          return;
        }
      } else {
        var pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        this.ReDraw();
        return;
      }
      //ReDraw();
    } else if (this.EditOption == EDIT_OPTION.ADD_POLYGONS) {
      // right button
      if (button == 2) {
        var lastOne = this.PointsGraphcis.length - 1;
        if (lastOne > 0) {
          this.WorkSpace.removeChild(this.PointsGraphcis[lastOne]);
        }
        this.PointsGraphcis.pop();
        // PointsGraphcis.pop();
        return;
      }

      // left buttuon
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        if (
          this.PointsGraphcis[lastOne].point.x == curpoint.x &&
          curpoint.y == this.PointsGraphcis[lastOne].point.y
        ) {
          var pointObj = new PointGraphic(this);
          pointObj.point.x = curpoint.x;
          pointObj.point.y = curpoint.y;
          this.PointsGraphcis.push(pointObj);
          this.WorkSpace.addChild(pointObj);

          this.ReDraw();
          return;
        }
      } else {
        var pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        this.ReDraw();
        return;
      }
      //ReDraw();
    }
  }
  onmousedown(event, offset) {
    // var st=document.documentElement.scrollTop;

    // var box=document.getElementById('editBox');
    // var left=event.clientX+7;
    // var top=event.clientY;
    // box.style.left=left+st+'px';
    // box.style.top=top+st+'px';
    // box.style.display='block'

    var button = event.button;

    var pPoint = new PIXI.Point(event.layerX - offset, event.layerY);
    var p2Point = new PIXI.Point(event.layerX - offset, event.layerY);
    var curpoint = this.WorkSpace.worldTransform.applyInverse(pPoint, p2Point);
    //curpoint.x = pPoint.x- this.WorkSpace.x;
    //curpoint.y = pPoint.y- this.WorkSpace.y;
    if (this.EditOption == EDIT_OPTION.ADD_LINES) {
      // right button
      if (button == 2) {
        var lastOne = this.PointsGraphcis.length - 1;
        if (lastOne > 0) {
          this.WorkSpace.removeChild(this.PointsGraphcis[lastOne]);
        }
        this.PointsGraphcis.pop();
        // PointsGraphcis.pop();
        return;
      }

      // left buttuon
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        if (
          this.PointsGraphcis[lastOne].point.x == curpoint.x &&
          curpoint.y == this.PointsGraphcis[lastOne].point.y
        ) {
          var pointObj = new PointGraphic(this);
          pointObj.point.x = curpoint.x;
          pointObj.point.y = curpoint.y;
          this.PointsGraphcis.push(pointObj);
          this.WorkSpace.addChild(pointObj);

          this.ReDraw();
          return;
        }
      } else {
        var pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        this.ReDraw();
        return;
      }
      //ReDraw();
    } else if (this.EditOption == EDIT_OPTION.ADD_POINTS) {
      // right button
      if (button == 2) {
        var lastOne = this.PointsGraphcis.length - 1;
        if (lastOne > 0) {
          this.WorkSpace.removeChild(this.PointsGraphcis[lastOne]);
        }
        this.PointsGraphcis.pop();
        // PointsGraphcis.pop();
        return;
      }

      // left buttuon
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        if (
          this.PointsGraphcis[lastOne].point.x == curpoint.x &&
          curpoint.y == this.PointsGraphcis[lastOne].point.y
        ) {
          var pointObj = new PointGraphic(this);
          pointObj.point.x = curpoint.x;
          pointObj.point.y = curpoint.y;
          this.PointsGraphcis.push(pointObj);
          this.WorkSpace.addChild(pointObj);

          this.ReDraw();
          return;
        }
      } else {
        var pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        this.ReDraw();
        return;
      }
      //ReDraw();
    } else if (this.EditOption == EDIT_OPTION.ADD_POLYGONS) {
      // right button
      if (button == 2) {
        var lastOne = this.PointsGraphcis.length - 1;
        if (lastOne > 0) {
          this.WorkSpace.removeChild(this.PointsGraphcis[lastOne]);
        }
        this.PointsGraphcis.pop();
        // PointsGraphcis.pop();
        return;
      }

      // left buttuon
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        if (
          this.PointsGraphcis[lastOne].point.x == curpoint.x &&
          curpoint.y == this.PointsGraphcis[lastOne].point.y
        ) {
          var pointObj = new PointGraphic(this);
          pointObj.point.x = curpoint.x;
          pointObj.point.y = curpoint.y;
          this.PointsGraphcis.push(pointObj);
          this.WorkSpace.addChild(pointObj);

          this.ReDraw();
          return;
        }
      } else {
        var pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        pointObj = new PointGraphic(this);
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        this.ReDraw();
        return;
      }
      //ReDraw();
    }
  }
  name(params) {
    YC_cppRun("work.cpp"); //执行c/c++文件
    let pval = run_c_func("花有清香月有阴。", "歌管楼台声细细，"); //执行c/c++函数
    printf("%s\n", "秋千院落夜沉沉。");
    printf("%.15f\n", pval);

    function runjs_func(pstr) {
      //该函数被work.cpp执行
      printf(`${pstr}，\n`);
    }
    function get_title() {
      //该函数被work.cpp执行
      return "春宵";
    }
  }
}
export default DGMEditTools;
