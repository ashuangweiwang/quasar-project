import DGMAbstractLayer from "./DGMAbstractLayer";
import GraphicsPolygon from "./GraphicsPolygon";
import GraphicData from "./GraphicData";
import GraphicsFeature from "./GraphicsFeature";
import DGMBufferGeometry from "./DGMBufferedGeometry";
import * as PIXI from "pixi.js";
class DGMGraphicsLayer extends DGMAbstractLayer {
  constructor(parent) {
    super();
    this.ClassName = "DGMGraphicsLayer";
    this.EditTools;
    this.Parent;
    this.Conversion = {};

    //this.expandable=true
  }
  Clear() {
    super.Clear();
  }

  GetTile(points) {
    var tile = [];
    return tile;
  }
  //通過點增加多边形
  AddPolygonFromPoints(points, name, featureid, props, linestyle, fillStyle) {
    var graphicsPolygon = new GraphicsPolygon(this.EditTools);
    graphicsPolygon.fillStyle = fillStyle;

    graphicsPolygon.id = this.Parent.id + this.children.length; //geometry.id;
    graphicsPolygon.visible = 1;

    graphicsPolygon.Name = "gra";

    graphicsPolygon.FeatureID = featureid;
    //graphicsPolygon.FeatureID = '0_Qw_Qm1_f1';

    graphicsPolygon.Smooth = this.EditTools.Smooth;

    var data = new GraphicData();
    data.GeoType = "Polygon";

    for (var i = 0; i < points.length; i++) {
      data.points.push(points[i].x);
      data.points.push(points[i].y);
    }
    graphicsPolygon.Style = linestyle;
    graphicsPolygon.AddGraphicData(data);

    this.addChild(graphicsPolygon);

    graphicsPolygon.DrawPolygon();

    if (this.children.length == 1) {
      this.Parent.ShowData();
    }
    //this.expandable=false
  }
  // 通过点增加曲线
  AddCurveFromPoints(points, name, featureid, props, linestyle) {
    var line = new GraphicsFeature(this.EditTools);
    line.id = this.Parent.id + this.children.length; //geometry.id;

    line.Name = name;

    line.Smooth = this.EditTools.Smooth;

    line.FeatureID = featureid; //传递featureid
    var curve = new GraphicData();

    curve.GeoType = "Line";
    curve.points = points;

    line.AddGraphicData(curve);
    line.visible = 1;

    //var Tile = this.ObjectArray[0];
    //Tile.AddObject(line);

    this.addChild(line);
    line.Style = linestyle;
    line.DrawGraphic();

    // if(this.children.length==1){
    // 	this.Parent.ShowData();
    // }
    //this.Conversion=this.Parent.Conversion
    //var geometry=this.To3dGeometry(curve,this.Conversion)
    //this.expandable=false
  }
  // 通过点增加曲线
  AddPointsFromPoints(points, name, featureid, props, linestyle) {
    var point = new GraphicsPoint(this.EditTools);
    point.id = this.Parent.id + this.children.length; //geometry.id;

    point.Name = name;

    point.Smooth = this.EditTools.Smooth;

    point.FeatureID = featureid; //传递featureid
    var pointsdata = new GraphicData();

    pointsdata.GeoType = "Point";
    pointsdata.points = points;

    point.AddGraphicData(pointsdata);
    point.visible = 1;

    //var Tile = this.ObjectArray[0];
    //Tile.AddObject(line);

    this.addChild(point);
    point.Style = linestyle;
    point.DrawGraphic();

    // if(this.children.length==1){
    // 	this.Parent.ShowData();
    // }
    //this.Conversion=this.Parent.Conversion
    //var geometry=this.To3dGeometry(curve,this.Conversion)
    //this.expandable=false
  }

  //后台给出的geometry{}类型，转换为curve，存到
  AddGrphaicFromGeometry(geometry, Conversion) {
    //后台给出的默认geometry{}类型
    //转换成curve存储到feature，最后feature.DrawGraphic();
    //没有返回

    if (geometry.GeoType == "Line") {
      var line = new GraphicsFeature(this.EditTools);

      line.EditTools = this.EditTools;
      console.log("line --------", line);
      line.id = this.Parent.id + this.children.length; //geometry.id;

      line.Name = geometry.name;
      line.visible = 0;
      line.Smooth = geometry.Smooth;

      line.FeatureID = geometry.FeatureID;
      var curve = this.To2dGraphics(geometry, Conversion);
      curve.GeoType = "Line";
      line.AddGraphicData(curve);

      //var lineStyle = new PIXI.LineStyle();
      //lineStyle.color = PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]);;
      //lineStyle.color = 12227910
      //lineStyle.width = 2;

      line.Style = this.FindVisualStyle(geometry);

      line.DrawGraphic();
      this.addChild(line);

      return line;
    } else if (geometry.GeoType == "Point") {
      var point = new GraphicsPoint(this.EditTools);
      point.EditTools = this.EditTools;
      console.log("polygon --------", line);
      point.id = this.Parent.id + this.children.length; //geometry.id;

      point.Name = geometry.name;
      point.visible = 0;

      point.FeatureID = geometry.FeatureID;
      var curve = this.To2dGraphics(geometry, Conversion);
      curve.GeoType = "Point";
      point.AddGraphicData(curve);

      //var lineStyle = new PIXI.LineStyle();
      //lineStyle.color = PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]);;
      //lineStyle.color = 12227910
      //lineStyle.width = 2;

      point.Style = this.FindVisualStyle(geometry);

      var fillStyle = new PIXI.FillStyle();
      fillStyle.color = point.Style.color;
      point.fillStyle = fillStyle;

      point.DrawGraphic();
      this.addChild(point);

      return point;
    } else if (geometry.GeoType == "Polygon") {
      var polygon = new GraphicsPolygon(this.EditTools);
      polygon.EditTools = this.EditTools;
      console.log("polygon --------", line);
      polygon.id = this.Parent.id + this.children.length; //geometry.id;

      polygon.Name = geometry.name;
      polygon.visible = 0;
      polygon.Smooth = geometry.Smooth;

      polygon.FeatureID = geometry.FeatureID;
      var curve = this.To2dGraphics(geometry, Conversion);
      curve.GeoType = "Polygon";
      polygon.AddGraphicData(curve);

      //var lineStyle = new PIXI.LineStyle();
      //lineStyle.color = PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]);;
      //lineStyle.color = 12227910
      //lineStyle.width = 2;

      polygon.Style = this.FindVisualStyle(geometry);

      var fillStyle = new PIXI.FillStyle();
      fillStyle.color = polygon.Style.color;
      polygon.fillStyle = fillStyle;

      polygon.DrawPolygon();
      this.addChild(polygon);

      return polygon;
    }
    //this.expandable=false
  }
  //高亮设置
  AddHighlightGrphaicFromGeometry(geometry, Conversion, fId) {
    //后台给出的默认geometry{}类型
    //转换成curve存储到feature，最后feature.DrawGraphic();
    //没有返回

    if (geometry.GeoType == "Line") {
      var line = new GraphicsFeature(this.EditTools);
      line.EditTools = this.EditTools;
      console.log("line --------", line);
      line.id = geometry.id;
      line.Name = geometry.name;
      line.FeatureID = geometry.FeatureID;
      line.Smooth = geometry.Smooth;

      var curve = this.To2dGraphics(geometry, Conversion);
      curve.GeoType = "Line";

      line.AddGraphicData(curve);

      if (line.FeatureID == fId) {
        var highlightStyle = new PIXI.LineStyle();
        console.log("高亮");
        highlightStyle.color = 2551650;
        highlightStyle.width = 2;
        line.Style = highlightStyle;
      } else {
        line.Style = this.FindVisualStyle(geometry);
      }
      line.DrawGraphic();
      this.addChild(line);

      return line;
    } else if (geometry.GeoType == "Polygon") {
      var polygon = new GraphicsPolygon(this.EditTools);
      polygon.EditTools = this.EditTools;
      console.log("polygon --------", line);
      polygon.id = geometry.id;
      polygon.Name = geometry.name;

      polygon.Smooth = geometry.Smooth;

      polygon.FeatureID = geometry.FeatureID;
      var curve = this.To2dGraphics(geometry, Conversion);
      curve.GeoType = "Polygon";
      polygon.AddGraphicData(curve);

      //var lineStyle = new PIXI.LineStyle();
      //lineStyle.color = PIXI.utils.rgb2hex([Math.random() + 0.1, Math.random() + 0.1, Math.random() + 0.1]);;
      //lineStyle.color = 12227910
      //lineStyle.width = 2;
      if (polygon.FeatureID == fId) {
        var highlightStyle = new PIXI.LineStyle();
        console.log("高亮");
        highlightStyle.color = 2551650;
        highlightStyle.width = 10;
        polygon.Style = highlightStyle;
      } else {
        polygon.Style = this.FindVisualStyle(geometry);
      }

      var fillStyle = new PIXI.FillStyle();
      fillStyle.color = polygon.Style.color;
      polygon.fillStyle = fillStyle;

      polygon.DrawPolygon();
      this.addChild(polygon);

      return polygon;
    }

    //this.expandable=false
  }
  To2dGraphics(thereGeometry, Conversion) {
    //接受三维维的graphics，map的变换坐标,三维窗口大小和二维窗口大小(MapBounds和(stageXY)画布大小对应)
    //返回三维维的graphics
    var projectPoint = Conversion.ProjectPointlist;
    var curve = new GraphicData();
    //curve.GeoType = 'Line';
    if (thereGeometry.GeoType == "Line") {
      var x, y; //三维窗口大小和二维窗口大小的变换比例01 23 45

      var ProjectPara = []; //临时？？？
      if (Conversion.ProjectPara.num == 0) {
        x = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        for (let index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};

          ProjectPara.push(thereGeometry.points[index]);
          p.x = (thereGeometry.points[index + 1] - Conversion.Bounds[1]) / x;
          p.y =
            ((thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y) *
              -1 +
            Conversion.height;
          //p = { x: thereGeometry.points.points[index]/x, y: thereGeometry.points.points[index + 1] }
          curve.points.push(p);
        }
      }
      if (Conversion.ProjectPara.num == 1) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        var pointx1 = 0;
        for (var index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};
          var zero = 0.00001;
          var pointi = this.Transferpoint(
            zero,
            projectPoint,
            thereGeometry.points[index],
            thereGeometry.points[index + 1]
          );
          if (projectPoint.length == 3) {
            p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
            ProjectPara.push(thereGeometry.points[index + 1]);
            p.y =
              ((thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y) *
                -1 +
              Conversion.height;
          } else {
            for (var i = 0; i < projectPoint.length; i = i + 3) {
              if (pointi == 0) {
                var distance = this.DistanceResult(
                  projectPoint[pointi],
                  projectPoint[pointi + 1],
                  thereGeometry.points[index],
                  thereGeometry.points[index + 1]
                );
                p.x = distance / x;
                pointx1 = pointx1 + distance;
                ProjectPara.push(thereGeometry.points[index + 1]);
                p.y =
                  (thereGeometry.points[index + 2] / y) * -1 +
                  Conversion.height;
                break;
              } else {
                var distance = this.DistanceResult(
                  projectPoint[pointi],
                  projectPoint[pointi + 1],
                  thereGeometry.points[index],
                  thereGeometry.points[index + 1]
                );
                var pointx = this.strenshPoint(projectPoint, pointi);
                p.x = (pointx + distance) / x;
                ProjectPara.push(thereGeometry.points[index + 1]);
                p.y =
                  (thereGeometry.points[index + 2] / y) * -1 +
                  Conversion.height;
                break;
              }
            }
          }
          // p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
          // ProjectPara.push(thereGeometry.points[index + 1])
          // p.y = (thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y * (-1) + Conversion.height;

          //p = { x: thereGeometry.points.points[index], y: thereGeometry.points.points[index + 2] }
          curve.points.push(p);
          console.log(curve.points);
        }
      }

      if (Conversion.ProjectPara.num == 2) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.height; //y方向的比例<map/画布大小比
        var aaa = this.parent;

        for (var index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};
          p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
          p.y =
            ((thereGeometry.points[index + 1] - Conversion.Bounds[1]) / y) *
              -1 +
            Conversion.height;
          ProjectPara.push(thereGeometry.points[index + 2]);

          //p = { x: thereGeometry.points.points[index], y: thereGeometry.points.points[index + 1] }
          curve.points.push(p);
        }
      }
    } else if (thereGeometry.GeoType == "Point") {
      var x, y; //三维窗口大小和二维窗口大小的变换比例01 23 45

      var ProjectPara = []; //临时？？？
      if (Conversion.ProjectPara.num == 0) {
        x = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        for (let index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};

          ProjectPara.push(thereGeometry.points[index]);
          p.x = (thereGeometry.points[index + 1] - Conversion.Bounds[1]) / x;
          p.y =
            ((thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y) *
              -1 +
            Conversion.height;
          //p = { x: thereGeometry.points.points[index]/x, y: thereGeometry.points.points[index + 1] }
          curve.points.push(p);
        }
      }
      if (Conversion.ProjectPara.num == 1) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        var pointx1 = 0;
        for (var index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};
          var zero = 0.00001;
          var pointi = this.Transferpoint(
            zero,
            projectPoint,
            thereGeometry.points[index],
            thereGeometry.points[index + 1]
          );
          if (pointi == "undefined") {
            p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
            ProjectPara.push(thereGeometry.points[index + 1]);
            p.y =
              ((thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y) *
                -1 +
              Conversion.height;
          } else {
            for (var i = 0; i < projectPoint.length; i = i + 3) {
              if (pointi == 0) {
                var distance = this.DistanceResult(
                  projectPoint[pointi],
                  projectPoint[pointi + 1],
                  thereGeometry.points[index],
                  thereGeometry.points[index + 1]
                );
                p.x = distance / x;
                pointx1 = pointx1 + distance;
                ProjectPara.push(thereGeometry.points[index + 1]);
                p.y =
                  (thereGeometry.points[index + 2] / y) * -1 +
                  Conversion.height;
                break;
              } else {
                var distance = this.DistanceResult(
                  projectPoint[pointi],
                  projectPoint[pointi + 1],
                  thereGeometry.points[index],
                  thereGeometry.points[index + 1]
                );
                var pointx = this.strenshPoint(projectPoint, pointi);
                p.x = (pointx + distance) / x;
                ProjectPara.push(thereGeometry.points[index + 1]);
                p.y =
                  (thereGeometry.points[index + 2] / y) * -1 +
                  Conversion.height;
                break;
              }
            }
          }
          // p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
          // ProjectPara.push(thereGeometry.points[index + 1])
          // p.y = (thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y * (-1) + Conversion.height;

          //p = { x: thereGeometry.points.points[index], y: thereGeometry.points.points[index + 2] }
          curve.points.push(p);
          console.log(curve.points);
        }
      }

      if (Conversion.ProjectPara.num == 2) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.height; //y方向的比例<map/画布大小比
        var aaa = this.parent;

        for (var index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};

          p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
          p.y =
            ((thereGeometry.points[index + 1] - Conversion.Bounds[1]) / y) *
              -1 +
            Conversion.height;
          ProjectPara.push(thereGeometry.points[index + 2]);

          //p = { x: thereGeometry.points.points[index], y: thereGeometry.points.points[index + 1] }
          curve.points.push(p);
        }
      }
    } else if (thereGeometry.GeoType == "Polygon") {
      var x, y; //三维窗口大小和二维窗口大小的变换比例01 23 45

      var ProjectPara = []; //临时？？？
      if (Conversion.ProjectPara.num == 0) {
        x = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        for (let index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};

          ProjectPara.push(thereGeometry.points[index]);
          p.x = (thereGeometry.points[index + 1] - Conversion.Bounds[1]) / x;
          p.y =
            ((thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y) *
              -1 +
            Conversion.height;
          //p = { x: thereGeometry.points.points[index]/x, y: thereGeometry.points.points[index + 1] }
          curve.points.push(p.x);
          curve.points.push(p.y);
        }
      }
      if (Conversion.ProjectPara.num == 1) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        var pointx1 = 0;
        for (var index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};
          var zero = 0.00001;
          var pointi = this.Transferpoint(
            zero,
            projectPoint,
            thereGeometry.points[index],
            thereGeometry.points[index + 1]
          );
          if (pointi == "undefined") {
            p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
            ProjectPara.push(thereGeometry.points[index + 1]);
            p.y =
              ((thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y) *
                -1 +
              Conversion.height;
          } else {
            for (var i = 0; i < projectPoint.length; i = i + 3) {
              if (pointi == 0) {
                var distance = this.DistanceResult(
                  projectPoint[pointi],
                  projectPoint[pointi + 1],
                  thereGeometry.points[index],
                  thereGeometry.points[index + 1]
                );
                p.x = distance / x;
                pointx1 = pointx1 + distance;
                ProjectPara.push(thereGeometry.points[index + 1]);
                p.y =
                  (thereGeometry.points[index + 2] / y) * -1 +
                  Conversion.height;
                break;
              } else {
                var distance = this.DistanceResult(
                  projectPoint[pointi],
                  projectPoint[pointi + 1],
                  thereGeometry.points[index],
                  thereGeometry.points[index + 1]
                );
                var pointx = this.strenshPoint(projectPoint, pointi);
                p.x = (pointx + distance) / x;
                ProjectPara.push(thereGeometry.points[index + 1]);
                p.y =
                  (thereGeometry.points[index + 2] / y) * -1 +
                  Conversion.height;
                break;
              }
            }
          }
          // p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
          // ProjectPara.push(thereGeometry.points[index + 1])
          // p.y = (thereGeometry.points[index + 2] - Conversion.Bounds[2]) / y * (-1) + Conversion.height;

          //p = { x: thereGeometry.points.points[index], y: thereGeometry.points.points[index + 2] }
          curve.points.push(p);
          console.log(curve.points);
        }
      }
      if (Conversion.ProjectPara.num == 2) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.height; //y方向的比例<map/画布大小比
        var aaa = this.parent;

        for (var index = 0; index < thereGeometry.points.length; index += 3) {
          var p = {};

          p.x = (thereGeometry.points[index] - Conversion.Bounds[0]) / x;
          p.y =
            ((thereGeometry.points[index + 1] - Conversion.Bounds[1]) / y) *
              -1 +
            Conversion.height;
          ProjectPara.push(thereGeometry.points[index + 2]);

          //p = { x: thereGeometry.points.points[index], y: thereGeometry.points.points[index + 1] }
          curve.points.push(p.x);
          curve.points.push(p.y);
        }
      }
    }

    return curve;
  }
  DistanceResult(x1, y1, x2, y2) {
    var d1 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    var d = Math.sqrt(d1);
    return d;
  }
  strenshPoint(points, i) {
    var x = 0;
    var x2 = this.DistanceResult(0, 0, points[3], points[4]);
    // var x1=this.DistanceResult(points[i],points[i+1],points[i-3],points[i-2])
    for (var index = 3; index <= i; index = index + 3) {
      if (i == 3) {
        x = x2;
      } else {
        x =
          x2 +
          this.DistanceResult(
            points[index],
            points[index + 1],
            points[index + 3],
            points[index + 4]
          );
      }
    }

    return x;
  }
  Transferpoint(zero, x1, x2, x3) {
    var pointlist = x1;
    var c = {};
    c.x = x2;
    c.y = x3;
    for (var i = 0; i < pointlist.length - 3; i = i + 3) {
      var t1 = (c.x - pointlist[i]) / (pointlist[i + 3] - pointlist[i]);
      var t2 = (c.y - pointlist[i + 1]) / (pointlist[i + 4] - pointlist[i + 1]);
      var t11 = Math.abs(t1);
      var t22 = Math.abs(t2);
      var t12 = Math.abs(t2 - t1);
      if (t11 <= 1 && t11 >= 0) {
        if (t22 <= 1 && t22 >= 0) {
          if (t12 < zero) {
            return i;
          }
          // else{
          // 	continue;
          // }
        }
      }
    }
  }
  //进行二维到三维的坐标变换[0,0,1,(0，1，2)]
  To3dGeometry(curve, Conversion) {
    //接受二维的graphics，map的变换坐标,三维窗口大小(wKBounds)和二维窗口大小(MapBounds)(MapBounds和(stageXY)画布大小对应)
    //返回三维的Geometry
    var bufferedGeometry = new DGMBufferGeometry();
    var x, y; //三维窗口大小和二维窗口大小的变换比例
    bufferedGeometry.GeoType = curve.GeoType;
    bufferedGeometry.id = "666";
    bufferedGeometry.name = "6661";
    if (curve.GeoType == "Line") {
      if (Conversion.ProjectPara.num == 0) {
        x = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        for (let index = 0; index < curve.points.length; index++) {
          var p = curve.points[index];

          bufferedGeometry.points.push(Conversion.ProjectPara.x);

          var geometryY = p.x * x + Conversion.Bounds[1];
          bufferedGeometry.points.push(geometryY);
          var geometryZ =
            (p.y - Conversion.height) * y * -1 + Conversion.Bounds[2];
          bufferedGeometry.points.push(geometryZ);
        }
      }
      if (Conversion.ProjectPara.num == 1) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比

        for (var index = 0; index < curve.points.length; index++) {
          var p = curve.points[index];

          var geometryX = p.x * x + Conversion.Bounds[0];
          bufferedGeometry.points.push(geometryX);

          bufferedGeometry.points.push(Conversion.ProjectPara.y);

          var geometryZ =
            (p.y - Conversion.height) * y * -1 + Conversion.Bounds[2];
          bufferedGeometry.points.push(geometryZ);
        }
      }
      if (Conversion.ProjectPara.num == 2) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.height; //y方向的比例<map/画布大小比
        //var aaa = this.parent;

        for (var index = 0; index < curve.points.length; index++) {
          var p = curve.points[index];

          var geometryX = p.x * x + Conversion.Bounds[0];
          bufferedGeometry.points.push(geometryX);

          var geometryY =
            (p.y - Conversion.height) * y * -1 + Conversion.Bounds[1];
          bufferedGeometry.points.push(geometryY);

          bufferedGeometry.points.push(Conversion.ProjectPara.z);
        }
      }
    }
    if (curve.GeoType == "Point") {
      if (Conversion.ProjectPara.num == 0) {
        x = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        for (let index = 0; index < curve.points.length; index++) {
          var p = curve.points[index];

          bufferedGeometry.points.push(Conversion.ProjectPara.x);

          var geometryY = p.x * x + Conversion.Bounds[1];
          bufferedGeometry.points.push(geometryY);
          var geometryZ =
            (p.y - Conversion.height) * y * -1 + Conversion.Bounds[2];
          bufferedGeometry.points.push(geometryZ);
        }
      }
      if (Conversion.ProjectPara.num == 1) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比

        for (var index = 0; index < curve.points.length; index++) {
          var p = curve.points[index];

          var geometryX = p.x * x + Conversion.Bounds[0];
          bufferedGeometry.points.push(geometryX);

          bufferedGeometry.points.push(Conversion.ProjectPara.y);

          var geometryZ =
            (p.y - Conversion.height) * y * -1 + Conversion.Bounds[2];
          bufferedGeometry.points.push(geometryZ);
        }
      }
      if (Conversion.ProjectPara.num == 2) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.height; //y方向的比例<map/画布大小比
        //var aaa = this.parent;

        for (var index = 0; index < curve.points.length; index++) {
          var p = curve.points[index];

          var geometryX = p.x * x + Conversion.Bounds[0];
          bufferedGeometry.points.push(geometryX);

          var geometryY =
            (p.y - Conversion.height) * y * -1 + Conversion.Bounds[1];
          bufferedGeometry.points.push(geometryY);

          bufferedGeometry.points.push(Conversion.ProjectPara.z);
        }
      }
    }
    if (curve.GeoType == "Polygon") {
      if (Conversion.ProjectPara.num == 0) {
        x = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比
        for (let index = 0; index < curve.points.length; index += 2) {
          //					var p = curve.points[index]
          bufferedGeometry.points.push(Conversion.ProjectPara.x);

          var geometryY = curve.points[index] * x + Conversion.Bounds[1];
          bufferedGeometry.points.push(geometryY);
          var geometryZ =
            (curve.points[index + 1] - Conversion.height) * y * -1 +
            Conversion.Bounds[2];
          bufferedGeometry.points.push(geometryZ);
        }
      }
      if (Conversion.ProjectPara.num == 1) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height; //y方向的比例<map/画布大小比

        for (var index = 0; index < curve.points.length; index += 2) {
          //var p = curve.points[index]
          var geometryX = curve.points[index] * x + Conversion.Bounds[0];
          bufferedGeometry.points.push(geometryX);

          bufferedGeometry.points.push(Conversion.ProjectPara.y);

          var geometryZ =
            (curve.points[index + 1] - Conversion.height) * y * -1 +
            Conversion.Bounds[2];
          bufferedGeometry.points.push(geometryZ);
        }
      }
      if (Conversion.ProjectPara.num == 2) {
        x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width; //X方向的比例<map/画布大小比
        y = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.height; //y方向的比例<map/画布大小比
        //var aaa = this.parent;

        for (var index = 0; index < curve.points.length; index += 2) {
          //var p = curve.points[index]
          var geometryX = curve.points[index] * x + Conversion.Bounds[0];
          bufferedGeometry.points.push(geometryX);
          var geometryY =
            (curve.points[index + 1] - Conversion.height) * y * -1 +
            Conversion.Bounds[1];
          bufferedGeometry.points.push(geometryY);
          bufferedGeometry.points.push(Conversion.ProjectPara.z);
        }
      }
    }
    return bufferedGeometry;
  }
  //进行二维到三维的坐标变换[0,0,1,(0，1，2)]
  /* To3dGeometry(curve, Conversion) {
		//接受二维的graphics，map的变换坐标,三维窗口大小(wKBounds)和二维窗口大小(MapBounds)(MapBounds和(stageXY)画布大小对应)
		//返回三维的Geometry
		var bufferedGeometry = new DGMBufferGeometry();
		var x, y;//三维窗口大小和二维窗口大小的变换比例
		bufferedGeometry.GeoType = curve.GeoType;
		bufferedGeometry.id = '666'
		bufferedGeometry.name = '6661'

		console.log("3d转换的type",curve.GeoType);

		if (Conversion.ProjectPara.num == 0) {
			x = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.width;//X方向的比例<map/画布大小比
			y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height;//y方向的比例<map/画布大小比
			for (let index = 0; index < curve.points.length; index++) {
				var p = curve.points[index]

				bufferedGeometry.points.push(Conversion.ProjectPara.x);

				var geometryY = p.x * x + Conversion.Bounds[1];
				bufferedGeometry.points.push(geometryY);
				var geometryZ = (p.y - Conversion.height) * y * (-1) + Conversion.Bounds[2];
				bufferedGeometry.points.push(geometryZ);

			}
		}
		if (Conversion.ProjectPara.num == 1) {
			x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width;//X方向的比例<map/画布大小比
			y = (Conversion.Bounds[5] - Conversion.Bounds[2]) / Conversion.height;//y方向的比例<map/画布大小比

			for (var index = 0; index < curve.points.length; index++) {

				var p = curve.points[index]

				var geometryX = p.x * x + Conversion.Bounds[0];
				bufferedGeometry.points.push(geometryX);

				bufferedGeometry.points.push(Conversion.ProjectPara.y);

				var geometryZ = (p.y - Conversion.height) * y * (-1) + Conversion.Bounds[2];
				bufferedGeometry.points.push(geometryZ);

			}

		}
		if (Conversion.ProjectPara.num == 2) {
			x = (Conversion.Bounds[3] - Conversion.Bounds[0]) / Conversion.width;//X方向的比例<map/画布大小比
			y = (Conversion.Bounds[4] - Conversion.Bounds[1]) / Conversion.height;//y方向的比例<map/画布大小比
			//var aaa = this.parent;

			for (var index = 0; index < curve.points.length; index++) {
				var p = curve.points[index]


				var geometryX = p.x * x + Conversion.Bounds[0];
				bufferedGeometry.points.push(geometryX);

				var geometryY = (p.y - Conversion.height) * y * (-1) + Conversion.Bounds[1];
				bufferedGeometry.points.push(geometryY);

				bufferedGeometry.points.push(Conversion.ProjectPara.z);
			}

		}
		return bufferedGeometry
	} */
  AddGeometry(geometry) {
    var Tile = this.ObjectArray[0];
    Tile.BufferGeometry.push(geometry);
  }
  //返回geometry中的lineStyle
  FindVisualStyle(geometry) {
    var lineStyle = new PIXI.LineStyle();
    var featureCollection = this.Parent.LayerData.FeatureCollection.Features;
    for (let index = 0; index < featureCollection.length; index++) {
      if (geometry.FeatureID == featureCollection[index].id) {
        lineStyle.color = featureCollection[index].VisualStyle.Color;
        lineStyle.width = featureCollection[index].VisualStyle.Size;
        break;
      }
    }
    return lineStyle;
  }
  //返回geometry中的Visible
  FindVisible(featureid) {
    var featureCollection = this.Parent.LayerData.FeatureCollection.Features;
    for (let index = 0; index < featureCollection.length; index++) {
      if (featureid == featureCollection[index].id) {
        if (featureCollection[index].ShowLogo == 1) return true;
        if (featureCollection[index].ShowLogo == 0) return false;
      }
    }
  }
}
export default DGMGraphicsLayer;
