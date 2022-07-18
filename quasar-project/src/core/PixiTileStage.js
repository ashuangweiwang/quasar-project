class PixiTileStage extends PIXI.Container{
    constructor(stage){
        super()
        this.Tile;
        this.level=3;
        this.Parent=stage;
        this._width=stage._width;
        this._height=stage._height;
    }
    AddChild(stage){
        this.addChild(stage)
    }
}