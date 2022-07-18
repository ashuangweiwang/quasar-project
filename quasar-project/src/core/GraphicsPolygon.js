//import DGMObject from './DGMObject.js';
import * as PIXI from "pixi.js";
class GraphicsPolygon extends PIXI.Graphics {
  constructor(editTool) {
    super();
    this.BufferGeometry;

    this.FeatureID;
    this.ClassName = "GraphicsPolygon";
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

    this.icon = "img:images\\poy1.png";
    //this.disabled=true
    this.label = "";
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
  DrawPolygon() {
    this.clear();
    for (var i = 0; i < this.GraphicData.length; i++) {
      if (this.GraphicData[i].GeoType == "Line") {
        var linestyle = this.Style;

        /* var LineStyle=new PIXI.LineStyle;
                LineStyle.width=3; */
        //if (linestyle != null)
        this.lineStyle(
          linestyle.width,
          linestyle.color,
          linestyle.alpha,
          0.5,
          false
        );
        //this.lineStyle(linestyle.width, PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]), 1, 0.5, false);
        //this.lineStyle(linestyle.width, linestyle.color, linestyle.alpha, linestyle.alignment, true);

        var hitPoly = [];
        //this.beginFill(PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]));

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
            var p = Hermit(pos, pos1, pos2, (t * 1.0) / N);
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

        //this.endFill();
      } else if (this.GraphicData[i].GeoType == "Polygon") {
        var linestyle = this.Style;

        var fillStyle = this.fillStyle;
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

        if (this.GraphicData[i].points.length < 3) {
          alert("At Least 3 Points");
          return;
        }

        var smoPoints = [];
        // smoPoints.push(this.GraphicData[i].points[0])
        // smoPoints.push(this.GraphicData[i].points[1])
        for (var j = 0; j < this.GraphicData[i].points.length - 4; j += 2) {
          var pos = {};
          pos.x = this.GraphicData[i].points[j];
          pos.y = this.GraphicData[i].points[j + 1];
          var pos1 = {};
          pos1.x = this.GraphicData[i].points[j + 2];
          pos1.y = this.GraphicData[i].points[j + 3];
          var pos2 = {};
          pos2.x = this.GraphicData[i].points[j + 4];
          pos2.y = this.GraphicData[i].points[j + 5];

          var N = 20;
          for (var t = 0; t <= N; t++) {
            //var p = Hermit1(pos.x,pos.y,pos1.x,pos1.y,slop1,slop2,t);
            var p;
            if (this.Smooth == 0) {
              p = pos1;
            } else {
              p = Hermit(pos, pos1, pos2, (t * 1.0) / N);
            }
            smoPoints.push(p.x);
            smoPoints.push(p.y);
            //var p = Hermit(pos, pos1, pos2, t * 1.000 / N);
            //this.lineTo(p.x, p.y);
            //hitPoly.push(p);
          }

          //this.lineTo(this.GraphicData[i].points[j].x, this.GraphicData[i].points[j].y);
          // if (j == this.GraphicData[i].points.length - 4) {

          //   }
        }

        this.beginFill(this.fillStyle.color);

        if (this.Smooth == 0) {
          this.drawPolygon(this.GraphicData[i].points);
        } else {
          var index = this.GraphicData[i].points.length - 2;
          var x = this.GraphicData[i].points[index];
          var y = this.GraphicData[i].points[index + 1];

          var pos = {};
          pos.x = this.GraphicData[i].points[index - 2];
          pos.y = this.GraphicData[i].points[index - 1];
          var pos1 = {};
          pos1.x = x;
          pos1.y = y;
          var pos2 = {};
          pos2.x = this.GraphicData[i].points[0];
          pos2.y = this.GraphicData[i].points[1];

          //第二个点
          var pos3 = {};
          pos3.x = this.GraphicData[i].points[2];
          pos3.y = this.GraphicData[i].points[3];

          var N = 20;
          for (var t = 0; t <= N; t++) {
            //var p = Hermit1(pos.x,pos.y,pos1.x,pos1.y,slop1,slop2,t);
            var p;

            p = Hermit(pos, pos1, pos2, (t * 1.0) / N);

            smoPoints.push(p.x);
            smoPoints.push(p.y);
            //var p = Hermit(pos, pos1, pos2, t * 1.000 / N);
            //this.lineTo(p.x, p.y);
            //hitPoly.push(p);
          }
          for (var t = 0; t <= N; t++) {
            //var p = Hermit1(pos.x,pos.y,pos1.x,pos1.y,slop1,slop2,t);
            var p;

            p = Hermit(pos1, pos2, pos3, (t * 1.0) / N);

            smoPoints.push(p.x);
            smoPoints.push(p.y);
            //var p = Hermit(pos, pos1, pos2, t * 1.000 / N);
            //this.lineTo(p.x, p.y);
            //hitPoly.push(p);
          }
          this.drawPolygon(smoPoints);
        }
        this.endFill();
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
    this.EditTools.EditOnePoly(this); //wsw
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
}
export default GraphicsPolygon;
