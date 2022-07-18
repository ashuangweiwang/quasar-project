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
  constructor() {
    super();
    this.point = new PIXI.Point();
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
    //  this.Canvas = canvasView;
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
    this.PolysGraphcis = null;
    this.PointStyle = new PIXI.LineStyle();
    this.LineStyle = new PIXI.LineStyle();
    this.FillStyle = new PIXI.FillStyle();

    this.PointStyle.width = 4;

    this.PointStyle.color = PIXI.utils.rgb2hex([
      100 / 255.0,
      100 / 255.0,
      100 / 255.0,
    ]);

    this.LineStyle.width = 3;
    this.LineStyle.color = 0x0af33;
    this.LineStyle.native = false;

    this.FillStyle.color = 0x0ff0;

    //========================
    this.Type = 0;
  }

  Destroy() {
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;
    this.PolysGraphcis = null;
    this.PointStyle = null;
    this.LineStyle = null;
    this.FillStyle = null;
  }

  // �����༭����
  AddLines(
    e //=====================
  ) {
    // 1
    this.Operation = OPERATION.EDIT;
    this.EditOption = EDIT_OPTION.ADD_LINES;

    // 2
    this.LinesGraphcis = new PIXI.Graphics();

    // 3
    this.WorkSpace.addChild(this.LinesGraphcis);

    //=================
    if (e) {
      this.Type += 1;
    } else {
      this.Type = 0;
    }
  }

  // ���������߹��ܵ���
  EndAddLines() {
    //1
    this.Operation = OPERATION.NONE;
    this.EditOption = EDIT_OPTION.EDIT_NONE;

    //3
    this.WorkSpace.removeChild(this.LinesGraphcis);
    for (var i = 0; i < this.PointsGraphcis.length; i++) {
      this.WorkSpace.removeChild(this.PointsGraphcis[i]);
    }

    //=================
    if (this.Type > 1) {
      this.PolysGraphcis = new PIXI.Graphics();
      this.WorkSpace.addChild(this.PolysGraphcis);

      if (this.PointsGraphcis.length) {
        this.PolysGraphcis.beginFill(this.FillStyle.color, 1);
        this.LinesGraphcis.lineStyle(
          this.LineStyle.width,
          this.LineStyle.color,
          1,
          0.5,
          false
        );
        this.PolysGraphcis.moveTo(
          this.PointsGraphcis[0].point.x,
          this.PointsGraphcis[0].point.y
        );
        for (var i = 1; i < this.PointsGraphcis.length; i++) {
          this.PolysGraphcis.lineTo(
            this.PointsGraphcis[i].point.x,
            this.PointsGraphcis[i].point.y
          );
        }
        this.PolysGraphcis.lineTo(
          this.PointsGraphcis[0].point.x,
          this.PointsGraphcis[0].point.y
        );
        this.PolysGraphcis.endFill();
      }
    }

    // 4
    this.PointsGraphcis = [];
    this.LinesGraphcis = null;

    //========================
    this.Type = 0;
    this.PolysGraphcis = null;
  }

  // �༭������ػ���
  ReDraw() {
    this.drawPolys();
    this.drawLines();
    this.drawPoints();
  }

  drawPolys() {
    if (this.PolysGraphcis == null) return;
    this.PolysGraphcis.clear();
    if (this.PointsGraphcis.length) {
      this.PolysGraphcis.beginFill(this.FillStyle.color, 1);
      this.LinesGraphcis.lineStyle(
        this.LineStyle.width,
        this.LineStyle.color,
        1,
        0.5,
        false
      );
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
      for (var i = 0; i < this.PointsGraphcis.length; i++) {
        var pos = this.PointsGraphcis[i].point;
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

    if (this.EditOption == EDIT_OPTION.ADD_LINES) {
      var lastOne = this.PointsGraphcis.length - 1;
      if (lastOne > 0) {
        this.PointsGraphcis[lastOne].point.x = curpoint.x;
        this.PointsGraphcis[lastOne].point.y = curpoint.y; //,event.layerY);
        this.ReDraw();
      }
    }
  }

  onmousedown(event, offset) {
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
          var pointObj = new PointGraphic();
          pointObj.point.x = curpoint.x;
          pointObj.point.y = curpoint.y;
          this.PointsGraphcis.push(pointObj);
          this.WorkSpace.addChild(pointObj);

          this.ReDraw();
          return;
        }
      } else {
        var pointObj = new PointGraphic();
        pointObj.point.x = curpoint.x;
        pointObj.point.y = curpoint.y;

        this.PointsGraphcis.push(pointObj);
        this.WorkSpace.addChild(pointObj);

        pointObj = new PointGraphic();
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

  ondblclick(event) {
    // ���������߹��ܵ���
    this.EndAddLines();
  }
}

export default DGMEditTools;
