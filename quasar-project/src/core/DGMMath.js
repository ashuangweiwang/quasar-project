var DGMMath;
{
  var Hermit1 = function (x1, y1, x2, y2, slop1, slop2, t) {
    var a0, a1, b0, b1, H;
    a0 =
      (1 + (2 * (t - x1)) / (x2 - x1)) *
      ((t - x2) / (x1 - x2)) *
      ((t - x2) / (x1 - x2));
    a1 =
      (1 + (2 * (t - x2)) / (x1 - x2)) *
      ((t - x1) / (x2 - x1)) *
      ((t - x1) / (x2 - x1));
    b0 = (t - x1) * ((t - x2) / (x1 - x2)) * ((t - x2) / (x1 - x2));
    b1 = (t - x2) * ((t - x1) / (x2 - x1)) * ((t - x1) / (x2 - x1));

    Hx = x1 * a0 + x2 * a1 + slop1 * b0 + slop2 * b1;
    Hy = y1 * a0 + y2 * a1 + slop1 * b0 + slop2 * b1;
    var p = new PIXI.Point(Hx, Hy);
    return p; //返回参数t处的插值结果
  };
  var Mdot = function (a, p) {
    var p1 = new PIXI.Point(a * p.x, a * p.y);
    return p1;
  };
  var Sub = function (p1, p2) {
    var p = new PIXI.Point(p1.x - p2.x, p1.y - p2.y);
    return p;
  };

  var Add = function (p1, p2) {
    var p = new PIXI.Point(p1.x + p2.x, p1.y + p2.y);
    return p;
  };

  var Hermit = function (p1, p2, p3, t) {
    var p = new PIXI.Point();

    var a = new PIXI.Point();
    var b = new PIXI.Point();
    var c = new PIXI.Point();
    var d = new PIXI.Point();
    var r1 = new PIXI.Point(p2.x - p1.x, p2.y - p1.y);
    var r2 = new PIXI.Point(p3.x - p2.x, p3.y - p2.y);

    // a = 2P1-2p2+R1+R2
    a.x = 2 * p1.x - 2 * p2.x + r1.x + r2.x;
    a.y = 2 * p1.y - 2 * p2.y + r1.y + r2.y;

    // b = -3P1+3p2-2R1-R2
    b.x = -3 * p1.x + 3 * p2.x - 2 * r1.x - r2.x;
    b.y = -3 * p1.y + 3 * p2.y - 2 * r1.y - r2.y;

    c.x = r1.x;
    c.y = r1.y;
    d.x = p1.x;
    d.y = p1.y;
    // C = R1
    // d = P1

    //p.x = p1.x + (p2.x - p1.x)*t;
    //p.y = p1.y + (p2.y - p1.y)*t;
    var t3 = t * t * t;
    var t2 = t * t;
    p.x = a.x * t3 + b.x * t2 + c.x * t + d.x;
    p.y = a.y * t3 + b.y * t2 + c.y * t + d.y;

    return p; //返回参数t处的插值结果
  };
}
