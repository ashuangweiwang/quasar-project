//import DGMObject from './DGMObject.js';
import * as PIXI from "pixi.js";
class GraphicsFeature extends PIXI.Graphics {
  constructor(editTool) {
    super();

    this.BufferGeometry;

    this.FeatureID;
    this.ClassName = "GraphicsFeature";
    this.Name;
    this.GraphicData = [];
    this.Style;
    this.pickError = 10;
    this.EditTools = editTool;
    this.Smooth = 1;
    this.InteractionOn();
    this.on("pointerdown", this.onDragStart)
      .on("pointerup", this.onDragEnd)
      .on("pointerupoutside", this.onDragEnd)
      .on("pointermove", this.onDragMove)
      .on("mouseover", this.onMouseOver)
      .on("mouseout", this.onMouseOut);

    this.icon = "img:images\\activity-outline.png";
    //this.disabled=true
  }
  AddGraphicData(o) {
    this.GraphicData.push(o);
  }

  Clear() {
    super.Clear();
  }

  CalHitArea(points) {
    var hitPoly = [];
    for (var i = 0; i < points.length; i = i + 1) {
      var x = i;
      hitPoly.push(points[x].x + this.pickError / 10); //this.EditTools.pickError / 10
      hitPoly.push(points[x].y - this.pickError); //this.EditTools.pickError
    }

    for (var i = points.length - 1; i >= 0; i = i - 1) {
      var x = i;
      hitPoly.push(points[x].x + 1); //this.EditTools.pickError / 10
      hitPoly.push(points[x].y + 10); //this.EditTools.pickError
    }

    if (this.hitArea == null) this.hitArea = new PIXI.Polygon(hitPoly);
  }

  DrawGraphic() {
    this.clear();
    for (var i = 0; i < this.GraphicData.length; i++) {
      if (this.GraphicData[i].GeoType == "Line") {
        var linestyle = this.Style;

        if (linestyle != null)
          this.lineStyle(
            linestyle.width,
            linestyle.color,
            linestyle.alpha,
            0.5,
            false
          );

        var hitPoly = [];
        this.moveTo(
          this.GraphicData[i].points[0].x,
          this.GraphicData[i].points[0].y
        );
        // if(0)
        for (var j = 0; j < this.GraphicData[i].points.length - 2; j++) {
          var pos = this.GraphicData[i].points[j];
          var pos1 = this.GraphicData[i].points[j + 1];
          var pos2 = this.GraphicData[i].points[j + 2];

          var N = 20;
          for (var t = 0; t <= N; t++) {
            //var p = Hermit1(pos.x,pos.y,pos1.x,pos1.y,slop1,slop2,t);
            var p;
            if (this.Smooth == 0) {
              p = pos1;
            } else {
              p = Hermit(pos, pos1, pos2, (t * 1.0) / N);
            }
            //var p = Hermit(pos, pos1, pos2, t * 1.000 / N);
            this.lineTo(p.x, p.y);
            hitPoly.push(p);
          }
          //this.lineTo(this.GraphicData[i].points[j].x, this.GraphicData[i].points[j].y);
        }
        if (j == this.GraphicData[i].points.length - 2) {
          var pos = this.GraphicData[i].points[j + 1];
          this.lineTo(pos.x, pos.y);
          hitPoly.push(pos);
        }

        this.hitArea = null;
        this.CalHitArea(hitPoly);
      } else if (this.GraphicData[i].GeoType == "Polygon") {
        var linestyle = this.Style;
        if (linestyle != null)
          this.lineStyle(
            linestyle.width,
            linestyle.color,
            linestyle.alpha,
            linestyle.alignment,
            true
          );

        if (this.fillStyle == null) {
          this.fillStyle = new PIXI.FillStyle();
          this.fillStyle.color = PIXI.utils.rgb2hex([
            Math.random() + 0.1,
            Math.random() + 0.1,
            Math.random() + 0.1,
          ]);
          this.fillStyle.texture = 1;
        }

        this.beginFill(this.fillStyle.color);
        this.drawPolygon(this.GraphicData[i].points);
        this.endFill();
      } else if (this.GraphicData[i].GeoType == "Point") {
        for (var j = 0; j < this.GraphicData[i].points.length; j++) {
          this.beginFill(this.Style.color);
          this.drawCircle(
            this.GraphicData[i].points[j].x,
            this.GraphicData[i].points[j].y,
            3
          );
          this.endFill();

          //this.GraphicData[i].clear();
          //this.PointsGraphcis.set
          // this.GraphicData[i].beginFill(1, 1);
          // var pos = this.GraphicData[i].point;
          // //drawPoints
          // this.GraphicData[i].drawCircle(pos.x, pos.y, 1);
          // this.GraphicData[i].endFill();
        }
      }
    }
  }

  InteractionOn() {
    this.interactive = true;
    this.buttonMode = true;
    this.cursor = "pointer";

    //  this.on('pointerdown', onClick);
  }

  InteractionOff() {
    this.interactive = false;
    this.buttonMode = false;
    this.cursor = "pointer";
    //  this.on('pointerdown', onClick);
  }

  endEdit() {
    this.alpha = 1;
  }

  onDragStart(event) {
    //this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    this.EditTools.EditOneLine(this); ///问题应该在这？？？找不到edittool无法编辑
    //this.EditTools.EditOnePoly(this);//wsw
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      //const newPosition = this.data.getLocalPosition(this.parent);
      //this.x = newPosition.x;
      //this.y = newPosition.y;
    }
  }

  onMouseOver() {
    this.alpha = 0.5;
  }

  onMouseOut() {
    this.alpha = 1;
  }

  //EditTools
}
export default GraphicsFeature;
