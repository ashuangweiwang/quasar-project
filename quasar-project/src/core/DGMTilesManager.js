class DGMTilesManager {
    constructor() {
        this.ClassName = 'DGMTilesManager';
        this.Tiles = [];
    }
    AddTile(tile) {
        this.Tiles.push(tile);
    }
    Clear() {
        for (var i = 0; i < this.Tiles.length; i++) {
            this.Tiles[i].Clear();
        }
        this.Tiles.length = 0;

    }
}