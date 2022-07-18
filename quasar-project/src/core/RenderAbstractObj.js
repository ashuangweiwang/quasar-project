class RenderAbstractObj {
  constructor() {
    this.ObjectArray = [];
    this.ClassName = "RenderAbstractObj";
    //用于树组织
    this.label;
    this.icon;
    this.parent;
    this.children = [];
    this.level;
  }

  AddObject(obj) {
    this.ObjectArray.push(obj);
  }
  Clear() {
    for (var i = 0; i < this.ObjectArray.length; i++) {
      this.ObjectArray[i].Clear();
    }
    this.ObjectArray.length = 0;
    super.Clear();
  }
}
export default RenderAbstractObj;
