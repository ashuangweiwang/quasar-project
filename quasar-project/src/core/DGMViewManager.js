class DGMViewManager {
    constructor() {
        this.ClassName = 'DGMViewManager';
        this.Views = [];
    }
    AddView(view) {
        this.Views.push(view);
    }
    Clear() {
        for (var i = 0; i < this.Views.length; i++) {
            this.Views[i].Clear();
        }
        this.Views.length = 0;

    }
}