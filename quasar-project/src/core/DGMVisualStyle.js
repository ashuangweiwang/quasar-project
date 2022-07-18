import DGMObject from "./DGMObject.js";
const { def } = require("@vue/shared");

class DGMVisualStyle extends DGMObject {
  constructor() {
    super();
    this.ClassName = "DGMVisualStyle";
    this.Color = 16716610;
    this.Size = 5; // pointsize or linewidth
    this.Texture;
    //其他参数根据需要继续添加
  }
  Clear() {
    super.Clear();
  }
}
export default DGMVisualStyle;
