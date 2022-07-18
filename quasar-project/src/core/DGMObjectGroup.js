import DGMObject from "./DGMObject.js";

class DGMObjectGroup extends DGMObject {
  constructor() {
    super();
    this.ObjectArray = [];
    this.ClassName = "DGMObjectGroup";
    this.Bounds = []; //<zjz>六个float前三个X-ZMin,X-ZMax

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

  //用于树管理
  GetNode() {
    this.label = this.Name;
    //this.children=this.ObjectArray;
  }
  AddNode(oNode) {
    if (oNode.level != this.level + 1) {
      alert("The new node is not the child of the selected node ");
      return;
    }
    oNode.parent = this;
    this.children.push(oNode);
    this.AddObject(oNode);
    this.DataChanged = 1; //标记已经修改
  }
  //nlj
  RemoveNode(oNode) {
    this.children.forEach((value, index, array) => {
      if (value.id == oNode.id) {
        array.splice(index, 1);

        this.DataChanged = 1; //标记已经修改
        this.RemoveObject(oNode);
        return;
      }
    });
  }
  RemoveObject(oNode) {
    this.ObjectArray.forEach((value, index, array) => {
      if (value.id == oNode.id) {
        array.splice(index, 1);
        return;
      }
    });
  }
}
export default DGMObjectGroup;
//DGMObjectGroup.ClassName = 'DGMObjectGroup';
