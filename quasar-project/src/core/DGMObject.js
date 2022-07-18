/**
 * super class DGMObject.
 * @class
 */
import * as PIXI from "pixi.js";
class DGMObject extends PIXI.Container {
  constructor() {
    super();
    this.ClassName = "DGMObject";
    this.Type = "unknown";
    this.Name;
    this.DefaultProps = [];
    this.UserProps = []; //用户定义属性 属性名称 属性值
    this.id;
    this.interactive = true;

    this.iconColor;

    this.DataChanged = 1;
    this.DataFromDB = 0;
    this.DataState = 0;
  }

  AddDefaultProp(prop) {
    this.DefaultProps.push(car);
  }

  AddUserProp(prop) {
    this.UserProps.push(car);
  }

  Clear() {
    this.DefaultProps = [];
    this.UserProps = [];
    super.removeChildren();
  }
}
export default DGMObject;
