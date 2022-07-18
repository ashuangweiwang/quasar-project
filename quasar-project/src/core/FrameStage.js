class FrameStage extends PIXI.Container {
  constructor(renderArea) {
    super();
    this.ClassName = "Frame";
    this.GraphicsData = [];
    this.Text = [];

    this.CellSize;
    this.editor;
    this.picker;
    this.renderArea = renderArea;
    this._width = this.renderArea.renderer.view.width;
    this._height = this.renderArea.renderer.view.height;
  }

  AddGraphicsData(d) {
    this.GraphicsData.push(d);
  }
  SetCellSize(size) {
    this.CellSize = size;
  }

  //画背景板静态网格
  //画背景板静态网格
  DrawLine(delta, c, w, a) {
    //取得画布（根容器Stage）的长宽
    var appwidth = this.renderArea.renderer.view.width;
    var appheight = this.renderArea.renderer.view.height;
    //根据缩放程度调整网格间距

    //console.log(renderArea.stage.scale);

    var line_h = new Array();
    for (
      var i = -((1.5 * appwidth) / delta);
      i < (2.5 * appwidth) / delta - 1;
      i++
    ) {
      line_h[i] = new PIXI.Graphics();
      line_h[i].lineStyle(w, c, a);
      line_h[i].moveTo(0, 0);
      line_h[i].lineTo(0, 4 * appheight);
      line_h[i].x = (i + 1) * delta;
      line_h[i].y = -(1.5 * appheight);
      this.addChild(line_h[i]);
    }

    var line_a = new Array();
    for (
      var i = -((1.5 * appheight) / delta);
      i < (2.5 * appheight) / delta - 1;
      i++
    ) {
      line_a[i] = new PIXI.Graphics();
      line_a[i].lineStyle(w, c, a);
      line_a[i].moveTo(0, 0);
      line_a[i].lineTo(appwidth * 4, 0);
      line_a[i].x = -(appwidth * 1.5);
      line_a[i].y = (i + 1) * delta;
      this.addChild(line_a[i]);
    }

    /* var line_h = new Array();
        for (var i = -(1.5 * appwidth / delta); i < (2.5 * appwidth) / delta - 1; i++) {
            line_h[i] = new PIXI.Graphics;
            line_h[i].lineStyle(w, c, a);
            line_h[i].moveTo(0, 0);
            line_h[i].lineTo(0, 4 * appheight);
            line_h[i].x = (i + 1) * delta;
            line_h[i].y = -(1.5 * appheight);
            renderArea2.stage.addChild(line_h[i]);

        }

        var line_a = new Array();
        for (var i = -(1.5 * appheight / delta); i < (2.5 * appheight) / delta - 1; i++) {
            line_a[i] = new PIXI.Graphics;
            line_a[i].lineStyle(w, c, a);
            line_a[i].moveTo(0, 0);
            line_a[i].lineTo(appwidth * 4, 0);
            line_a[i].x = -(appwidth * 1.5);
            line_a[i].y = (i + 1) * delta;;
            renderArea2.stage.addChild(line_a[i]);

        }
 */
    /*         var line_h = new Array();
        for (var i = -(1.5 * appwidth / delta); i < (2.5 * appwidth) / delta - 1; i++) {
            line_h[i] = new PIXI.Graphics;
            line_h[i].lineStyle(w, c, a);
            line_h[i].moveTo(0, 0);
            line_h[i].lineTo(0, 4 * appheight);
            line_h[i].x = (i + 1) * delta;
            line_h[i].y = -(1.5 * appheight);
            renderArea3.addChild(line_h[i]);

        }

        var line_a = new Array();
        for (var i = -(1.5 * appheight / delta); i < (2.5 * appheight) / delta - 1; i++) {
            line_a[i] = new PIXI.Graphics;
            line_a[i].lineStyle(w, c, a);
            line_a[i].moveTo(0, 0);
            line_a[i].lineTo(appwidth * 4, 0);
            line_a[i].x = -(appwidth * 1.5);
            line_a[i].y = (i + 1) * delta;;
            renderArea3.addChild(line_a[i]);

        }   */
  }
  DrawGrid() {
    this.DrawLine(20, 0x000000, 0.3, 0.2);
    this.DrawLine(80, 0x000000, 0.3, 0.6);
  }
  RemoveGrid() {
    this.children.splice(0, this.children.length);
  }

  //显示刻度
  /*     DisplayScale() {

        //取得画布（根容器Stage）的长宽
        var appwidth = app.renderer.view.width;
        var appheight = app.renderer.view.height;

        var deltax = 0;//deltax,deltay从当前图像坐标减去画布大小得到
        var deltay = 0;

        function creatText(x) {
            var style = new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 15,

            });
            var message = new PIXI.Text("0", style);
            app.stage.addChild(message);
            message.position.set(x, appheight - 20);

        }

        for (var i = 0; i<10;i++) {
            creatText(15+i*80);
        }


    } */
  //创建指北针
  /*  createBunny(x, y) {

        const texture = PIXI.Texture.from('images/N.png');
        const bunny = new PIXI.Sprite(texture);
        // 像素缩放模式
        texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        // create our little bunny friend..

        bunny.interactive = true;

        // 这个按钮模式将意味着当你用鼠标滚动兔子时，手光标会出现
        bunny.buttonMode = true;

        //把图标的锚点放在中间
        bunny.anchor.set(0.5);

        //设置比例
        bunny.scale.set(0.1);

        // 使用鼠标+触摸设置事件
        // the pointer events
        bunny
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

        //将精灵移动到指定的位置
        bunny.x = x;
        bunny.y = y;
        app.stage.addChild(bunny);

        function onDragStart(event) {
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
        }

        function onDragEnd() {
            this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
        }

        function onDragMove() {
            if (this.dragging) {
                const newPosition = this.data.getLocalPosition(this.parent);
                this.x = newPosition.x;
                this.y = newPosition.y;
            }
        }

    }*/
}
export default FrameStage;
