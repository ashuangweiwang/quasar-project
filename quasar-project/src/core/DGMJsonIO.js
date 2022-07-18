import jquery from "jquery";
import $ from "jquery";
import DGMWorkSpace from "./DGMWorkSpace";
import DGMGeoMap2D from "./DGMGeoMap2D";
import DGMGraphicsLayer from "./DGMGraphicsLayer";
import DGMTile from "./DGMTile";
import DGMBufferGeometry from "./DGMBufferedGeometry";
import DGMFeatureCollection from "./DGMFeatureCollection";
import DGMFeature from "./DGMFeature";
import DGMVisualStyle from "./DGMVisualStyle";

class DGMJsonIO {
  constructor() {
    //super();
    this.ClassName = "DGMJsonIO";
    this.JsonIOlogo = [];
  }
  //接受服务器Workspace的json数据
  WorkspaceFromJson(jsondata) {
    console.log("测试1", jsondata);
    var workspace = new DGMWorkSpace();
    //对jsondata中id和name赋值给workspace的name
    workspace.id = jsondata.id;
    workspace.Name = jsondata.name; //注意关键字目前只有DGMWorkSpace中的是大写

    workspace.Type = jsondata.type;
    workspace.DataFromDB = jsondata.DataFromDB;
    workspace.DataState = jsondata.DataState;
    workspace.DataFromDB = 1;
    workspace.DataState = 1;
    if (jsondata.hasOwnProperty("Bounds")) {
      workspace.Bounds = jsondata.Bounds;
    }
    //之后对map处理，然后处理之后将map赋值给workspace中的MapManager
    if (jsondata.hasOwnProperty("maps")) {
      ////如果work里面存在map开始对map进行操作
      var WorkspaceMap = jsondata.maps; //jsondata["maps"];
      console.log("WorkspaceMap", WorkspaceMap.length);
      //对work里面的map数据进行操作
      for (var index_i = 0; index_i < WorkspaceMap.length; index_i++) {
        //console.log("index_i",index_i)
        var Map1 = new DGMGeoMap2D(); //定义MAP变量
        if (WorkspaceMap[index_i].hasOwnProperty("layers")) {
          //如果map[i]里面存在layer开始对layer进行操作
          //对map里面的layer数据进行操作
          var Maplayers = WorkspaceMap[index_i]["layers"];

          //var Map1 = new DGMGeoMap2D();//定义MAP变量
          for (var index_j = 0; index_j < Maplayers.length; index_j++) {
            var layer = new DGMGraphicsLayer();
            layer.Clear();
            if (Maplayers[index_j].hasOwnProperty("tiles")) {
              //如果layer中存在tiles开始对tiles操作
              var layerstiles = Maplayers[index_j]["tiles"];

              //var TemTile = new DGMTile();//定义临时的Tile变量
              var TemTile = new DGMTile(); //定义临时的Tile变量
              for (let index_z = 0; index_z < layerstiles.length; index_z++) {
                TemTile.id = layerstiles[index_z]["id"];
                TemTile.name = layerstiles[index_z]["name"];
                TemTile.Type = layerstiles[index_z]["geometrytype"];
                TemTile.tileinfo = Maplayers[index_j]["tileinfo"][index_z]; //tileinfo原先在layer
                //console.log("tileinfo", TemTile.tileinfo)
                TemTile.DataFromDB = layerstiles[index_z].DataFromDB;
                TemTile.DataState = layerstiles[index_z].DataState;
                if (layerstiles[index_z].hasOwnProperty("geometry")) {
                  //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
                  TemTile.BufferGeometry = this.geometryFromJson(
                    layerstiles[index_z]["geometry"]
                  );
                }
                //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
                //console.log("tiles", TemTile.id)

                layer.AddObject(TemTile);
              }
            }
            //将FeatureCollection直接更改成对象
            //layer.FeatureCollection = Maplayers[index_j]["features"];
            layer.FeatureCollection = this.featureFromJson(
              Maplayers[index_j]["features"]
            );
            layer.id = Maplayers[index_j]["id"];
            layer.name = Maplayers[index_j]["name"];
            layer.Style = Maplayers[index_j]["style"]; //<type属性还没有>
            layer.Type = Maplayers[index_j].type;
            layer.DataFromDB = Maplayers[index_j].DataFromDB;
            layer.DataState = Maplayers[index_j].DataState;
            layer.DataFromDB = 1; //测试
            layer.DataState = 1; //测试
            Map1.AddObject(layer);
            //console.log("layer", layer.ObjectArray.length)
            //Layers.AddObject(layer);
            //layer.Clear();
          }
          //console.log("layers",Layers.ObjectArray.length)
        }
        //spaceMap.AddObject(Layers);
        //Layers.Clear();
        Map1.id = WorkspaceMap[index_i]["id"];
        var ProjectPara = {};
        if (WorkspaceMap[index_i].hasOwnProperty("ProjectPara")) {
          ProjectPara.x = WorkspaceMap[index_i].ProjectPara[0];
          ProjectPara.y = WorkspaceMap[index_i].ProjectPara[1];
          ProjectPara.z = WorkspaceMap[index_i].ProjectPara[2];
          ProjectPara.num = WorkspaceMap[index_i].ProjectPara[3];
        }
        Map1.ProjectPara = ProjectPara;
        Map1.name = WorkspaceMap[index_i]["name"];
        Map1.DataFromDB = WorkspaceMap[index_i].DataFromDB;
        Map1.Type = WorkspaceMap[index_i].type;
        Map1.DataState = WorkspaceMap[index_i].DataState;
        Map1.DataFromDB = 1; //测试
        Map1.DataState = 1; //测试
        workspace.AddObject(Map1);
        //console.log("前map里面的layer数组", Map1.ObjectArray.length, "  ",)
        //spaceMap.Clear();
        //console.log("后map里面的layer数组", Map1.ObjectArray.length, "  ",)
      }
    }
    //var map=jsondata.maps
    //workspace=jsondata;
    console.log("测试", workspace);
    //this.WorkspaceToJson(workspace)
    return workspace;
  }

  //接受服务器Workspacelist的json数据
  WorkspaceListFromJson(jsondata) {
    var workspaceList = [];
    for (var index_i = 0; index_i < jsondata.length; index_i++) {
      var workspace = new DGMWorkSpace();
      worklist = jsondata[index_i];
      workspace.id = worklist.id;
      workspace.Name = worklist.name;
      workspaceList.push(workspace);
    }
    return workspaceList;
  }

  //将json数据改成json文件//保存到数据库
  WorkspaceToJson(workspace) {
    this.JsonIOlogo.length = 0;
    //var m=new DGMWorkSpace();
    //m.ObjectArray
    //console.log("workspace",workspace)
    var jsondata = {};
    if (
      workspace.DataFromDB == 0 ||
      (workspace.DataFromDB == 1 &&
        workspace.DataChanged == 1 &&
        workspace.DataState == 1)
    ) {
      jsondata.id = workspace.id;
      jsondata.name = workspace.Name;
      jsondata.type = workspace.Type;
      jsondata.Bounds = workspace.Bounds;
      jsondata.DataFromDB = 1;
      jsondata.DataState = 1;

      //提取出workspace中map的数值
      var WorkspaceMaps = [];
      var WorkspaceMaps = workspace.ObjectArray; //这里是Maps
      //对work里面的map数据进行操作
      //console.log(workspace.ObjectArray);
      var Map1 = []; //定义MAP变量
      for (var index_i = 0; index_i < WorkspaceMaps.length; index_i++) {
        //如果map[i]里面存在layer开始对layer进行操作
        var workspaceMap = {};
        workspaceMap.id = WorkspaceMaps[index_i].id;
        workspaceMap.name = WorkspaceMaps[index_i].name;
        workspaceMap.type = WorkspaceMaps[index_i].Type;
        var projectPara = [];

        projectPara.push(WorkspaceMaps[index_i].ProjectPara.x);
        projectPara.push(WorkspaceMaps[index_i].ProjectPara.y);
        projectPara.push(WorkspaceMaps[index_i].ProjectPara.z);
        projectPara.push(WorkspaceMaps[index_i].ProjectPara.num);

        workspaceMap.ProjectPara = projectPara;
        workspaceMap.relation = [];
        workspaceMap.DataFromDB = 1;
        workspaceMap.DataState = 1;
        //对map里面的layer数据进行操作
        var Maplayers = WorkspaceMaps[index_i].ObjectArray; //这里是layers
        var Layers = []; //定义layers变量
        for (var index_j = 0; index_j < Maplayers.length; index_j++) {
          var layerone = {};
          layerone.id = Maplayers[index_j].id; //设定单个layer的id
          layerone.name = Maplayers[index_j].name; //设定单个layer的name
          layerone.style = Maplayers[index_j].Style; //设定单个layer的Style
          layerone.type = Maplayers[index_j].Type;
          //layerone.features = Maplayers[index_j].FeatureCollection;//设定单个layer的features
          layerone.features = this.featureToJson(
            Maplayers[index_j].FeatureCollection
          );
          layerone.DataFromDB = 1; //<>新增加属性
          layerone.DataState = 1; //<>新增加属性
          var layertiles = Maplayers[index_j].ObjectArray; //这里是tiles数据
          var layeronetileinfo = []; //定义临时的tileinfo变量
          var Tile = []; //定义临时的Tile变量
          for (let index_z = 0; index_z < layertiles.length; index_z++) {
            var Tileone = {}; //定义临时的Tile变量
            var tileinfo = {};
            tileinfo.id = layertiles[index_z].id;
            //tileinfo.push({layertiles[index_z].tileinfo);
            Tileone.id = layertiles[index_z].id;
            Tileone.geometrytype = layertiles[index_z].Type;
            Tileone.name = layertiles[index_z].name;

            //处理tile中DGMBufferGeometry的数据
            Tileone.geometry = this.geometryToJson(
              layertiles[index_z].BufferGeometry
            );
            Tileone.DataFromDB = 1; //<>新增加属性
            Tileone.DataState = 1; //<>新增加属性
            //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
            Tile.push(Tileone);
            layeronetileinfo.push(tileinfo);
          }
          layerone.tiles = Tile;
          layerone.tileinfo = layeronetileinfo;

          Layers.push(layerone);
          //workspaceMap.layers = Layers;
          //Map.push(workspaceMap);
          //workspaceMap.Clear();
        }
        workspaceMap.layers = Layers;
        Map1.push(workspaceMap);
      }
      jsondata.maps = Map1;
      //如果是新创建直接处理完整的Workspace进行存储
      this.JsonIOlogo.push(this.UpdateWorkspace(jsondata));
    } else {
      jsondata.id = workspace.id;
      jsondata.name = workspace.Name;
      jsondata.Bounds = workspace.Bounds;
      jsondata.type = workspace.Type;

      jsondata.DataFromDB = 1;
      jsondata.DataState = 1;

      //提取出workspace中map的数值
      //var WorkspaceMaps = [];
      var WorkspaceMaps = workspace.ObjectArray; //这里是Maps
      //对work里面的map数据进行操作
      //console.log(workspace.ObjectArray);
      var Map1 = []; //定义MAP变量
      for (var index_i = 0; index_i < WorkspaceMaps.length; index_i++) {
        //如果map[i]里面存在layer开始对layer进行操作
        //如果是前端创建，保存整个map
        //WorkspaceMaps[0].DataFromDB=0;//测试
        if (
          WorkspaceMaps[index_i].DataFromDB == 0 ||
          (WorkspaceMaps[index_i].DataChanged == 1 &&
            WorkspaceMaps[index_i].DataFromDB == 1 &&
            WorkspaceMaps[index_i].DataState == 1)
        ) {
          var workspaceMap = {};
          workspaceMap.id = WorkspaceMaps[index_i].id;
          workspaceMap.name = WorkspaceMaps[index_i].name;
          workspaceMap.type = WorkspaceMaps[index_i].Type;
          var projectPara = [];

          projectPara.push(WorkspaceMaps[index_i].ProjectPara.x);
          projectPara.push(WorkspaceMaps[index_i].ProjectPara.y);
          projectPara.push(WorkspaceMaps[index_i].ProjectPara.z);
          projectPara.push(WorkspaceMaps[index_i].ProjectPara.num);

          workspaceMap.ProjectPara = projectPara;
          workspaceMap.relation = [];
          workspaceMap.DataFromDB = 1;
          workspaceMap.DataState = 1;
          //对map里面的layer数据进行操作
          var Maplayers = WorkspaceMaps[index_i].ObjectArray; //这里是layers
          var Layers = []; //定义layers变量
          for (var index_j = 0; index_j < Maplayers.length; index_j++) {
            var layerone = {};
            layerone.id = Maplayers[index_j].id; //设定单个layer的id
            layerone.name = Maplayers[index_j].name; //设定单个layer的name
            layerone.style = Maplayers[index_j].Style; //设定单个layer的Style
            layerone.type = Maplayers[index_j].Type;
            //layerone.features = Maplayers[index_j].FeatureCollection;//设定单个layer的features
            layerone.features = this.featureToJson(
              Maplayers[index_j].FeatureCollection
            );
            layerone.DataFromDB = 1; //<>新增加属性
            layerone.DataState = 1; //<>新增加属性
            var layertiles = Maplayers[index_j].ObjectArray; //这里是tiles数据
            var layeronetileinfo = []; //定义临时的tileinfo变量
            var Tile = []; //定义临时的Tile变量
            for (let index_z = 0; index_z < layertiles.length; index_z++) {
              if (layertiles[index_z].DataState != 0) {
                var Tileone = {}; //定义临时的Tile变量
                var tileinfo = {};
                tileinfo.id = layertiles[index_z].id;

                Tileone.id = layertiles[index_z].id;
                Tileone.geometrytype = layertiles[index_z].Type;
                Tileone.name = layertiles[index_z].name;

                //处理tile中DGMBufferGeometry的数据
                Tileone.geometry = this.geometryToJson(
                  layertiles[index_z].BufferGeometry
                );
                Tileone.DataFromDB = 1; //<>新增加属性
                Tileone.DataState = 1; //<>新增加属性
                //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
                Tile.push(Tileone);
                layeronetileinfo.push(tileinfo);
              }
            }
            layerone.tiles = Tile;
            layerone.tileinfo = layeronetileinfo;

            Layers.push(layerone);
            //workspaceMap.layers = Layers;
            //Map.push(workspaceMap);
            //workspaceMap.Clear();
          }
          workspaceMap.layers = Layers;
          Map1.push(workspaceMap);
          //如果数据库的数据存在更改
          this.JsonIOlogo.push(this.UpdateMap(workspaceMap, jsondata.id)); //如果是前端创建，保存整个map
        }
        //如果map[i]里面存在layer开始对layer进行操作
        else {
          var workspaceMap = {};
          workspaceMap.id = WorkspaceMaps[index_i].id;
          workspaceMap.name = WorkspaceMaps[index_i].name;
          workspaceMap.type = WorkspaceMaps[index_i].Type;
          var projectPara = [];

          projectPara.push(WorkspaceMaps[index_i].ProjectPara.x);
          projectPara.push(WorkspaceMaps[index_i].ProjectPara.y);
          projectPara.push(WorkspaceMaps[index_i].ProjectPara.z);
          projectPara.push(WorkspaceMaps[index_i].ProjectPara.num);

          workspaceMap.ProjectPara = projectPara;
          workspaceMap.relation = [];
          workspaceMap.DataFromDB = 1;
          workspaceMap.DataState = 1;
          //对map里面的layer数据进行操作
          var Maplayers = WorkspaceMaps[index_i].ObjectArray; //这里是layers
          var Layers = []; //定义layers变量
          for (var index_j = 0; index_j < Maplayers.length; index_j++) {
            //如果是新建则对layer进行保存
            if (Maplayers[index_j].DataState == 0) {
              var layerone = {};
              layerone.id = Maplayers[index_j].id; //设定单个layer的id
              layerone.name = Maplayers[index_j].name; //设定单个layer的name
              layerone.style = Maplayers[index_j].Style; //设定单个layer的Style
              layerone.type = Maplayers[index_j].Type;

              //layerone.features = Maplayers[index_j].FeatureCollection;//设定单个layer的features
              layerone.features = this.featureToJson(
                Maplayers[index_j].FeatureCollection
              );
              layerone.DataFromDB = 1; //<>新增加属性
              layerone.DataState = 1; //<>新增加属性
              var layertiles = Maplayers[index_j].ObjectArray; //这里是tiles数据
              var layeronetileinfo = []; //定义临时的tileinfo变量
              var Tile = []; //定义临时的Tile变量
              for (let index_z = 0; index_z < layertiles.length; index_z++) {
                if (layertiles[index_z].DataState != 0) {
                  var Tileone = {}; //定义临时的Tile变量
                  var tileinfo = {};
                  tileinfo.id = layertiles[index_z].id;
                  //tileinfo.push(layertiles[index_z].tileinfo);
                  Tileone.id = layertiles[index_z].id;
                  Tileone.geometrytype = layertiles[index_z].Type;
                  Tileone.name = layertiles[index_z].name;

                  //处理tile中DGMBufferGeometry的数据
                  Tileone.geometry = this.geometryToJson(
                    layertiles[index_z].BufferGeometry
                  );
                  Tileone.DataFromDB = 1; //<>新增加属性
                  Tileone.DataState = 1; //<>新增加属性
                  //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
                  Tile.push(Tileone);
                  layeronetileinfo.push(tileinfo);
                }
              }
              layerone.tiles = Tile;
              layerone.tileinfo = layeronetileinfo;

              Layers.push(layerone);
              this.JsonIOlogo.push(this.UpdateLayer(layerone, workspaceMap.id));
              //workspaceMap.layers = Layers;
            }
            if (
              Maplayers[index_j].DataChanged == 1 &&
              Maplayers[index_j].DataFromDB == 1 &&
              Maplayers[index_j].DataState == 1
            ) {
              var layerone = {};
              layerone.id = Maplayers[index_j].id; //设定单个layer的id
              layerone.name = Maplayers[index_j].name; //设定单个layer的name
              layerone.style = Maplayers[index_j].Style; //设定单个layer的Style

              layerone.type = Maplayers[index_j].Type;

              //layerone.features = Maplayers[index_j].FeatureCollection;//设定单个layer的features
              layerone.features = this.featureToJson(
                Maplayers[index_j].FeatureCollection
              );
              layerone.DataFromDB = 1; //<>新增加属性
              layerone.DataState = 1; //<>新增加属性
              var layertiles = Maplayers[index_j].ObjectArray; //这里是tiles数据
              var layeronetileinfo = []; //定义临时的tileinfo变量
              var Tile = []; //定义临时的Tile变量
              for (let index_z = 0; index_z < layertiles.length; index_z++) {
                if (layertiles[index_z].DataState != 0) {
                  var Tileone = {}; //定义临时的Tile变量
                  var tileinfo = {};
                  tileinfo.id = layertiles[index_z].id;
                  //tileinfo.push(layertiles[index_z].tileinfo);
                  Tileone.id = layertiles[index_z].id;
                  Tileone.geometrytype = layertiles[index_z].Type;
                  Tileone.name = layertiles[index_z].name;

                  //处理tile中DGMBufferGeometry的数据
                  Tileone.geometry = this.geometryToJson(
                    layertiles[index_z].BufferGeometry
                  );
                  Tileone.DataFromDB = 1; //<>新增加属性
                  Tileone.DataState = 1; //<>新增加属性
                  //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
                  Tile.push(Tileone);
                  layeronetileinfo.push(tileinfo);
                }
              }
              layerone.tiles = Tile;
              layerone.tileinfo = layeronetileinfo;

              Layers.push(layerone);
              this.JsonIOlogo.push(this.UpdateLayer(layerone, workspaceMap.id));
              //workspaceMap.layers = Layers;
              //Map.push(workspaceMap);
              //workspaceMap.Clear();
            }
          }
          workspaceMap.layers = Layers;
          Map1.push(workspaceMap);
          //如果数据库的数据存在更改
        }
      }
      jsondata.maps = Map1;
    }
    //console.log("测试", jsondata)
    //return jsondata;
  }
  //Download json data to the specified directory
  WorkspaceFileToJson(workspace) {
    var SavingData = {};
    SavingData.id = workspace.id;
    SavingData.ClassName = workspace.ClassName;
    SavingData.name = workspace.Name;
    SavingData.type = workspace.Type;
    SavingData.Bounds = workspace.Bounds;
    SavingData.DataFromDB = 1;
    SavingData.DataState = 1;
    //this.DataFromDB=0;
    //this.DataState=0;

    //提取出workspace中map的数值
    var WorkspaceMaps = [];
    var WorkspaceMaps = workspace.ObjectArray; //这里是Maps
    //对work里面的map数据进行操作
    //console.log(workspace.ObjectArray);
    var Map1 = []; //定义MAP变量
    for (var index_i = 0; index_i < WorkspaceMaps.length; index_i++) {
      //如果map[i]里面存在layer开始对layer进行操作
      var workspaceMap = {};
      workspaceMap.id = WorkspaceMaps[index_i].id;
      workspaceMap.name = WorkspaceMaps[index_i].name;
      workspaceMap.type = WorkspaceMaps[index_i].Type;
      workspaceMap.relation = [];
      workspaceMap.DataFromDB = 1;
      workspaceMap.DataState = 1;
      //对map里面的layer数据进行操作
      var Maplayers = WorkspaceMaps[index_i].ObjectArray; //这里是layers
      var Layers = []; //定义layers变量
      for (var index_j = 0; index_j < Maplayers.length; index_j++) {
        var layerone = {};
        layerone.id = Maplayers[index_j].id; //设定单个layer的id
        layerone.name = Maplayers[index_j].name; //设定单个layer的name
        layerone.style = Maplayers[index_j].Style; //设定单个layer的Style
        layerone.type = Maplayers[index_j].Type; //设定单个layer的Style
        //layerone.features = Maplayers[index_j].FeatureCollection;//设定单个layer的features
        layerone.features = this.featureToJson(
          Maplayers[index_j].FeatureCollection
        );
        layerone.DataFromDB = 1; //<>新增加属性
        layerone.DataState = 1; //<>新增加属性
        var layertiles = Maplayers[index_j].ObjectArray; //这里是tiles数据
        var layeronetileinfo = []; //定义临时的tileinfo变量
        var Tile = []; //定义临时的Tile变量
        for (let index_z = 0; index_z < layertiles.length; index_z++) {
          if (layertiles[index_z].DataState != 0) {
            var Tileone = {}; //定义临时的Tile变量
            var tileinfo = {};
            tileinfo.id = layertiles[index_z].id;
            //tileinfo.push(layertiles[index_z].tileinfo);
            Tileone.id = layertiles[index_z].id;
            Tileone.geometrytype = layertiles[index_z].Type;
            Tileone.name = layertiles[index_z].name;

            //处理tile中DGMBufferGeometry的数据
            Tileone.geometry = this.geometryToJson(
              layertiles[index_z].BufferGeometry
            );
            Tileone.DataFromDB = 1; //<>新增加属性
            Tileone.DataState = 1; //<>新增加属性
            //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
            Tile.push(Tileone);
            layeronetileinfo.push(tileinfo);
          }
        }
        layerone.tiles = Tile;
        layerone.tileinfo = layeronetileinfo;

        Layers.push(layerone);
        //workspaceMap.layers = Layers;
        //Map.push(workspaceMap);
        //workspaceMap.Clear();
      }
      workspaceMap.layers = Layers;
      Map1.push(workspaceMap);
    }
    SavingData.maps = Map1;
    return SavingData;
  }

  //接受服务器Map的json数据
  MapFromJson(jsondata) {
    //console.log("index_i",index_i)
    var Map1 = new DGMGeoMap2D(); //定义MAP变量
    Map1.id = jsondata.id;
    Map1.name = jsondata.name;
    Map1.Type = jsondata.type;
    Map1.DataFromDB = jsondata.DataFromDB; //<新增加属性>
    Map1.DataState = jsondata.DataState; //<新增加属性>
    if (jsondata.hasOwnProperty("layers")) {
      //如果map[i]里面存在layer开始对layer进行操作
      //对map里面的layer数据进行操作
      var Maplayers = jsondata["layers"];

      //var Map1 = new DGMGeoMap2D();//定义MAP变量
      for (var index_j = 0; index_j < Maplayers.length; index_j++) {
        var layer = new DGMGraphicsLayer();
        layer.Clear();
        if (Maplayers[index_j].hasOwnProperty("tiles")) {
          //如果layer中存在tiles开始对tiles操作
          var layerstiles = Maplayers[index_j]["tiles"];

          //var TemTile = new DGMTile();//定义临时的Tile变量
          var TemTile = new DGMTile(); //定义临时的Tile变量
          for (let index_z = 0; index_z < layerstiles.length; index_z++) {
            TemTile.id = layerstiles[index_z]["id"];
            TemTile.name = layerstiles[index_z]["name"];
            TemTile.Type = layerstiles[index_z]["geometrytype"];
            TemTile.tileinfo = Maplayers[index_j]["tileinfo"][index_z]; //tileinfo原先在layer
            TemTile.DataFromDB = layerstiles[index_z].DataFromDB; //<新增加属性>
            TemTile.DataState = layerstiles[index_z].DataState; //<新增加属性>
            if (layerstiles[index_z].hasOwnProperty("geometry")) {
              //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
              TemTile.BufferGeometry = this.geometryFromJson(
                layerstiles[index_z]["geometry"]
              );
            }
            //console.log("tileinfo", TemTile.tileinfo)
            //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
            //console.log("tiles", TemTile.id)
            layer.AddObject(TemTile);
          }
        }
        //将FeatureCollection直接更改成对象
        //layer.FeatureCollection = Maplayers[index_j]["features"];
        layer.FeatureCollection = this.featureFromJson(
          Maplayers[index_j]["features"]
        );
        layer.id = Maplayers[index_j]["id"];
        layer.name = Maplayers[index_j]["name"];
        layer.Style = Maplayers[index_j]["style"];
        layer.Type = Maplayers[index_j].type;
        layer.DataFromDB = Maplayers[index_j].DataFromDB; //<新增加属性>
        layer.DataState = Maplayers[index_j].DataState; //<新增加属性>
        Map1.AddObject(layer);
      }
    }
    return Map1;
  }

  //接受服务器Maplist的json数据
  MapListFromJson(jsondata) {
    var MapList = [];
    for (var index_i = 0; index_i < jsondata.length; index_i++) {
      var Map1 = new DGMGeoMap2D(); //定义MAP变量
      Mlist = jsondata[index_i];
      Map1.id = Mlist.id;
      Map1.name = Mlist.neme;
      MapList.push(Map1);
    }
    return MapList;
  }

  //将Mapjson数据改成json文件
  MapToJson(Map1) {
    var jsondata = {};
    if (
      Map1.DataFromDB == 0 ||
      (Map1.DataFromDB == 1 && Map1.DataChanged == 1 && Map1.DataState == 1)
    ) {
      jsondata.id = Map1.id;
      jsondata.ClassName = Map1.ClassName;
      jsondata.name = Map1.name;
      jsondata.type = Map1.Type;
      jsondata.DataFromDB = 1; //<新增加属性>
      jsondata.DataState = 1; //<新增加属性>
      //提取出workspace中map的数值
      var Maplayers = Map1.ObjectArray; //这里是layers
      var Layers = []; //定义layers变量
      for (var index_j = 0; index_j < Maplayers.length; index_j++) {
        var layerone = {};
        layerone.id = Maplayers[index_j].id; //设定单个layer的id
        layerone.name = Maplayers[index_j].name; //设定单个layer的name
        layerone.style = Maplayers[index_j].Style; //设定单个layer的Style
        layerone.type = Maplayers[index_j].Type;
        //layerone.features = Maplayers[index_j].FeatureCollection;//设定单个layer的features
        layerone.features = this.featureToJson(
          Maplayers[index_j].FeatureCollection
        );
        layerone.DataFromDB = 1; //<新增加属性>
        layerone.DataState = 1; //<新增加属性>
        var layertiles = Maplayers[index_j].ObjectArray; //这里是tiles数据
        var layeronetileinfo = []; //定义临时的tileinfo变量
        var Tile = []; //定义临时的Tile变量
        for (let index_z = 0; index_z < layertiles.length; index_z++) {
          if (layertiles[index_z].DataState != 0) {
            var Tileone = {}; //定义临时的Tile变量
            var tileinfo = {};
            tileinfo.id = layertiles[index_z].id;
            //tileinfo.push(layertiles[index_z].tileinfo);
            Tileone.id = layertiles[index_z].id;
            Tileone.geometrytype = layertiles[index_z].Type;
            Tileone.name = layertiles[index_z].name;

            //处理tile中DGMBufferGeometry的数据
            Tileone.geometry = this.geometryToJson(
              layertiles[index_z].BufferGeometry
            );
            Tileone.DataFromDB = 1; //<>新增加属性
            Tileone.DataState = 1; //<>新增加属性
            //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
            Tile.push(Tileone);
            layeronetileinfo.push(tileinfo);
          }
        }
        layerone.tiles = Tile;
        layerone.tileinfo = layeronetileinfo;
        Layers.push(layerone);
      }
      jsondata.layers = Layers;
    } else {
      jsondata.id = Map1.id;
      jsondata.name = Map1.name;
      jsondata.type = Map1.Type;
      jsondata.DataFromDB = 1; //<新增加属性>
      jsondata.DataState = 1; //<新增加属性>
      //提取出workspace中map的数值
      var Maplayers = Map1.ObjectArray; //这里是layers
      var Layers = []; //定义layers变量
      for (var index_j = 0; index_j < Maplayers.length; index_j++) {
        if (Maplayers[index_j].DataState != 0) {
          var layerone = {};
          layerone.id = Maplayers[index_j].id; //设定单个layer的id
          layerone.name = Maplayers[index_j].name; //设定单个layer的name
          layerone.style = Maplayers[index_j].Style; //设定单个layer的Style
          layerone.type = Maplayers[index_j].Type;
          //layerone.features = Maplayers[index_j].FeatureCollection;//设定单个layer的features
          layerone.features = this.featureToJson(
            Maplayers[index_j].FeatureCollection
          );
          layerone.DataFromDB = 1; //<新增加属性>
          layerone.DataState = 1; //<新增加属性>
          var layertiles = Maplayers[index_j].ObjectArray; //这里是tiles数据
          var layeronetileinfo = []; //定义临时的tileinfo变量
          var Tile = []; //定义临时的Tile变量
          for (let index_z = 0; index_z < layertiles.length; index_z++) {
            if (layertiles[index_z].DataState != 0) {
              var Tileone = {}; //定义临时的Tile变量
              var tileinfo = {};
              tileinfo.id = layertiles[index_z].id;
              //tileinfo.push(layertiles[index_z].tileinfo);
              Tileone.id = layertiles[index_z].id;
              Tileone.geometrytype = layertiles[index_z].Type;
              Tileone.name = layertiles[index_z].name;

              //处理tile中DGMBufferGeometry的数据
              Tileone.geometry = this.geometryToJson(
                layertiles[index_z].BufferGeometry
              );
              Tileone.DataFromDB = 1; //<>新增加属性
              Tileone.DataState = 1; //<>新增加属性
              //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
              Tile.push(Tileone);
              layeronetileinfo.push(tileinfo);
            }
          }
          layerone.tiles = Tile;
          layerone.tileinfo = layeronetileinfo;
          Layers.push(layerone);
        }
      }
      jsondata.layers = Layers;
    }
    return jsondata;
  }
  //保存json到本地
  MapFileToJson(Map1) {
    var jsondata = {};
    jsondata.id = Map1.id;
    jsondata.ClassName = Map1.ClassName;
    jsondata.name = Map1.name;
    jsondata.type = Map1.Type;
    jsondata.DataFromDB = 1; //<新增加属性>
    jsondata.DataState = 1; //<新增加属性>
    //提取出workspace中map的数值
    var Maplayers = Map1.ObjectArray; //这里是layers
    console.log("hby12", Maplayers);
    var Layers = []; //定义layers变量
    for (var index_j = 0; index_j < Maplayers.length; index_j++) {
      if (Maplayers[index_j].DataState != 0) {
        var layerone = {};
        layerone.id = Maplayers[index_j].id; //设定单个layer的id
        layerone.name = Maplayers[index_j].name; //设定单个layer的name
        layerone.style = Maplayers[index_j].Style; //设定单个layer的Style
        layerone.type = Maplayers[index_j].Type;
        //layerone.features = Maplayers[index_j].FeatureCollection;//设定单个layer的features
        layerone.features = this.featureToJson(
          Maplayers[index_j].FeatureCollection
        );
        layerone.DataFromDB = 1; //<新增加属性>
        layerone.DataState = 1; //<新增加属性>
        var layertiles = Maplayers[index_j].ObjectArray; //这里是tiles数据
        var layeronetileinfo = []; //定义临时的tileinfo变量
        var Tile = []; //定义临时的Tile变量
        for (let index_z = 0; index_z < layertiles.length; index_z++) {
          if (layertiles[index_z].DataState != 0) {
            var Tileone = {}; //定义临时的Tile变量
            var tileinfo = {};
            tileinfo.id = layertiles[index_z].id;
            //tileinfo.push(layertiles[index_z].tileinfo);
            Tileone.id = layertiles[index_z].id;
            Tileone.geometrytype = layertiles[index_z].Type;
            Tileone.name = layertiles[index_z].name;

            //处理tile中DGMBufferGeometry的数据
            Tileone.geometry = this.geometryToJson(
              layertiles[index_z].BufferGeometry
            );
            Tileone.DataFromDB = 1; //<>新增加属性
            Tileone.DataState = 1; //<>新增加属性
            //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
            Tile.push(Tileone);
            layeronetileinfo.push(tileinfo);
          }
        }
        layerone.tiles = Tile;
        layerone.tileinfo = layeronetileinfo;
        Layers.push(layerone);
      }
    }
    jsondata.layers = Layers;
    return jsondata;
  }

  //接受服务器layer的json数据
  LayerFromJson(jsondata) {
    //console.log("index_i",index_i)

    var layer = new DGMGraphicsLayer();
    layer.Clear();
    //将FeatureCollection直接更改成对象
    //layer.FeatureCollection = jsondata["features"];
    layer.FeatureCollection = this.featureFromJson(jsondata["features"]);
    layer.id = jsondata["id"];
    layer.name = jsondata["name"];
    layer.Style = jsondata["style"];
    layer.Type = jsondata["type"];
    layer.DataFromDB = jsondata.DataFromDB; //<新增加属性>
    layer.DataState = jsondata.DataState; //<新增加属性>
    if (jsondata.hasOwnProperty("tiles")) {
      //如果layer中存在tiles开始对tiles操作
      var layerstiles = jsondata["tiles"];
      //var TemTile = new DGMTile();//定义临时的Tile变量
      var TemTile = new DGMTile(); //定义临时的Tile变量
      for (let index_z = 0; index_z < layerstiles.length; index_z++) {
        TemTile.id = layerstiles[index_z]["id"];
        TemTile.name = layerstiles[index_z]["name"];
        TemTile.Type = layerstiles[index_z]["geometrytype"];
        TemTile.tileinfo = jsondata["tileinfo"][index_z]; //tileinfo原先在layer
        //console.log("tileinfo", TemTile.tileinfo)
        TemTile.DataFromDB = layerstiles[index_z].DataFromDB; //<新增加属性>
        TemTile.DataState = layerstiles[index_z].DataState; //<新增加属性>
        if (layerstiles[index_z].hasOwnProperty("geometry")) {
          //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
          TemTile.BufferGeometry = this.geometryFromJson(
            layerstiles[index_z]["geometry"]
          );
        }
        //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
        //console.log("tiles", TemTile.id)
        layer.AddObject(TemTile);
      }
    }
    return layer;
  }

  //将layerjson数据改成json文件
  LayerToJson(Layer) {
    var jsondata = {};
    if (Layer.DataFromDB == 0) {
      jsondata.id = Layer.id; //设定单个layer的id
      jsondata.name = Layer.name; //设定单个layer的name
      jsondata.type = Layer.Type;
      //将FeatureCollection直接更改成对象
      //jsondata.features = Layer.FeatureCollection;//设定单个layer的features
      jsondata.features = this.featureToJson(Layer.FeatureCollection); //设定单个layer的features
      jsondata.style = Layer.Style; //设定单个layer的Style
      jsondata.DataFromDB = 1; //<新增加属性>
      jsondata.DataState = 1; //<新增加属性>
      var layertiles = Layer.ObjectArray; //这里是tiles数据
      var layeronetileinfo = []; //定义临时的tileinfo变量
      var Tile = []; //定义临时的Tile变量
      for (let index_z = 0; index_z < layertiles.length; index_z++) {
        if (layertiles[index_z].DataState != 0) {
          var Tileone = {}; //定义临时的Tile变量
          var tileinfo = {};
          tileinfo.id = layertiles[index_z].id;
          //tileinfo.push(layertiles[index_z].tileinfo);
          Tileone.id = layertiles[index_z].id;
          Tileone.geometrytype = layertiles[index_z].Type;
          Tileone.name = layertiles[index_z].name;

          //处理tile中DGMBufferGeometry的数据
          Tileone.geometry = this.geometryToJson(
            layertiles[index_z].BufferGeometry
          );
          Tileone.DataFromDB = 1; //<>新增加属性
          Tileone.DataState = 1; //<>新增加属性
          //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
          Tile.push(Tileone);
          layeronetileinfo.push(tileinfo);
        }
      }
      layerone.tiles = Tile;
      layerone.tileinfo = layeronetileinfo;
    }
    if (
      Layer.DataFromDB == 1 &&
      Layer.DataChanged == 1 &&
      Layer.DataState == 1
    ) {
      jsondata.id = Layer.id; //设定单个layer的id
      jsondata.name = Layer.name; //设定单个layer的name
      jsondata.type = Layer.Type;
      //将FeatureCollection直接更改成对象
      //jsondata.features = Layer.FeatureCollection;//设定单个layer的features
      jsondata.features = this.featureToJson(Layer.FeatureCollection); //设定单个layer的features
      jsondata.style = Layer.Style; //设定单个layer的Style
      jsondata.DataFromDB = 1; //<新增加属性>
      jsondata.DataState = 1; //<新增加属性>
      var layertiles = Layer.ObjectArray; //这里是tiles数据
      var layeronetileinfo = []; //定义临时的tileinfo变量
      var Tile = []; //定义临时的Tile变量
      for (let index_z = 0; index_z < layertiles.length; index_z++) {
        if (layertiles[index_z].DataState != 0) {
          var Tileone = {}; //定义临时的Tile变量
          var tileinfo = {};
          tileinfo.id = layertiles[index_z].id;
          //tileinfo.push(layertiles[index_z].tileinfo);
          Tileone.id = layertiles[index_z].id;
          Tileone.geometrytype = layertiles[index_z].Type;
          Tileone.name = layertiles[index_z].name;

          //处理tile中DGMBufferGeometry的数据
          Tileone.geometry = this.geometryToJson(
            layertiles[index_z].BufferGeometry
          );
          Tileone.DataFromDB = 1; //<>新增加属性
          Tileone.DataState = 1; //<>新增加属性
          //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
          Tile.push(Tileone);
          layeronetileinfo.push(tileinfo);
        }
      }
      layerone.tiles = Tile;
      layerone.tileinfo = layeronetileinfo;
    }
    return jsondata;
  }

  //接受服务器Layerlist的json数据
  LayerListFromJson(jsondata) {
    var LayerList = [];
    for (var index_i = 0; index_i < jsondata.length; index_i++) {
      var layer = new DGMGraphicsLayer();
      Laylist = jsondata[index_i];
      layer.id = Laylist.id;
      layer.name = Laylist.neme;
      //layer.Style = Laylist.style;
      LayerList.push(layer);
    }
    return LayerList;
  }

  //接受服务器tile的json数据
  TileFromJson(jsondata) {
    var TemTile = new DGMTile(); //定义临时的Tile变量
    TemTile.id = jsondata["id"];
    TemTile.name = jsondata["name"];
    TemTile.Type = jsondata["geometrytype"];
    //TemTile.tileinfo = Maplayers[index_j]["tileinfo"][index_z];//tileinfo原先在layer
    //console.log("tileinfo", TemTile.tileinfo)
    TemTile.DataFromDB = jsondata.DataFromDB; //<新增加属性>
    TemTile.DataState = jsondata.DataState; //<新增加属性>
    if (layerstiles[index_z].hasOwnProperty("geometry")) {
      //TemTile.BufferGeometry = layerstiles[index_z]["geometry"];//数组结构
      TemTile.BufferGeometry = this.geometryFromJson(jsondata["geometry"]);
    }
    //TemTile.BufferGeometry = jsondata["geometry"];//数组结构
    console.log("tiles", TemTile.id);
    //layer.AddObject(TemTile)
    return TemTile;
  }

  //接受服务器tile的json数据
  TileToJson(Tile) {
    //var m=new DGMWorkSpace();
    //m.ObjectArray
    var jsondata = {};
    if (Tile.DataFromDB == 0) {
      jsondata.id = Tile.id; //设定单个layer的id
      jsondata.name = Tile.name; //设定单个layer的name

      jsondata.Type = Tile.geometrytype;
      //TemTile.tileinfo = Maplayers[index_j]["tileinfo"][index_z];//tileinfo原先在layer
      //console.log("tileinfo", TemTile.tileinfo)
      jsondata.geometry = this.geometryToJson(Tile.BufferGeometry);
      //jsondata.geometry = Tile.BufferGeometry;//数组结构
      jsondata.DataFromDB = 1; //<新增加属性>
      jsondata.DataState = 1; //<新增加属性>
      console.log("tiles", TemTile.id);
      //layer.AddObject(TemTile)
    }
    if (Tile.DataFromDB == 1 && Tile.DataChanged == 1 && Tile.DataState == 1) {
      jsondata.id = Tile.id; //设定单个layer的id
      jsondata.name = Tile.name; //设定单个layer的name

      jsondata.Type = Tile.geometrytype;
      //TemTile.tileinfo = Maplayers[index_j]["tileinfo"][index_z];//tileinfo原先在layer
      //console.log("tileinfo", TemTile.tileinfo)
      jsondata.geometry = this.geometryToJson(Tile.BufferGeometry);
      //jsondata.geometry = Tile.BufferGeometry;//数组结构
      jsondata.DataFromDB = 1; //<新增加属性>
      jsondata.DataState = 1; //<新增加属性>
      console.log("tiles", TemTile.id);
      //layer.AddObject(TemTile)
    }
    return jsondata;
  }
  //将服务器接受tile里面的geometry数据转成DGMBufferGeometry()数据
  geometryFromJson(geometry) {
    var ObjectArray = [];
    if (geometry == undefined) {
      return ObjectArray;
    }
    for (let index = 0; index < geometry.length; index++) {
      var bufferedGeometry = new DGMBufferGeometry();
      bufferedGeometry.id = geometry[index]["id"];
      bufferedGeometry.name = geometry[index]["name"];
      bufferedGeometry.FeatureID = geometry[index]["featureid"];
      bufferedGeometry.Smooth = geometry[index].Smooth;
      bufferedGeometry.GeoType = geometry[index].type; //<新增加属性>
      if (bufferedGeometry.GeoType == "Tin") {
        for (let index_i = 0; index_i < geometry[index]["points"].length; ) {
          var pointsarray = [];
          pointsarray.push(geometry[index]["points"][index_i]);
          pointsarray.push(geometry[index]["points"][index_i + 1]);
          pointsarray.push(geometry[index]["points"][index_i + 2]);

          bufferedGeometry.points.push(pointsarray);
          index_i = index_i + 3;
        }
        for (
          let index_i = 0;
          index_i < geometry[index]["trianglesindex"].length;

        ) {
          var pointsarray = [];
          pointsarray.push(geometry[index]["trianglesindex"][index_i]);
          pointsarray.push(geometry[index]["trianglesindex"][index_i + 1]);
          pointsarray.push(geometry[index]["trianglesindex"][index_i + 2]);
          bufferedGeometry.trianglesindex.push(pointsarray);
          index_i = index_i + 3;
        }
      } else {
        bufferedGeometry.points = geometry[index]["points"];
      }
      bufferedGeometry.DataFromDB = geometry[index].DataFromDB; //<新增加属性>
      bufferedGeometry.DataState = geometry[index].DataState; //<新增加属性>
      ObjectArray.push(bufferedGeometry);
    }
    return ObjectArray;
  }
  //将前端tile里面的DGMBufferGeometry()数据转换成geometry数据
  geometryToJson(BufferGeometry) {
    var jsondata = [];
    for (let index = 0; index < BufferGeometry.length; index++) {
      //if (BufferGeometry[index].DataState != 0) {
      var bufferedGeometryOne = {};

      var bufferedGeometry = new DGMBufferGeometry();
      bufferedGeometry = BufferGeometry[index];
      bufferedGeometryOne.id = bufferedGeometry.id;
      bufferedGeometryOne.name = bufferedGeometry.name;
      //bufferedGeometryOne.points = bufferedGeometry.points
      bufferedGeometryOne.featureid = bufferedGeometry.FeatureID;
      bufferedGeometryOne.type = bufferedGeometry.GeoType; //<新增加属性>

      if (bufferedGeometryOne.type == "Tin") {
        bufferedGeometryOne.trianglesindex = bufferedGeometry.trianglesindex;
        bufferedGeometryOne.points = bufferedGeometry["points"];
      } else {
        bufferedGeometryOne.points = bufferedGeometry["points"];
      }
      bufferedGeometryOne.Smooth = bufferedGeometry.Smooth;
      bufferedGeometryOne.DataFromDB = 1; //<新增加属性>
      bufferedGeometryOne.DataState = 1; //<新增加属性>
      jsondata.push(bufferedGeometryOne);
      //}
    }
    return jsondata;
  }
  //将服务器接受layer里面的feature数据转成DGMFeature()数据
  featureFromJson(feature) {
    //console.log("feature",feature)
    var featureCollection = new DGMFeatureCollection();
    var ObjectArray = [];
    if (feature == undefined) {
      return featureCollection;
    }
    for (let index = 0; index < feature.length; index++) {
      var layerfeature = new DGMFeature();
      var visualStyle = new DGMVisualStyle();
      layerfeature.id = feature[index]["id"];
      layerfeature.Name = feature[index]["name"];
      layerfeature.Type = feature[index]["type"];

      layerfeature.GeoCode = feature[index].GeoCode;
      layerfeature.FeatureType = feature[index]["FeatureType"];
      layerfeature.UpProp = feature[index]["upprop"];
      layerfeature.DownProp = feature[index]["downprop"];
      layerfeature.DataFromDB = feature[index].DataFromDB; //<新增加属性>
      layerfeature.DataState = feature[index].DataState; //<新增加属性>
      if (feature[index].hasOwnProperty("color")) {
        visualStyle.Color = feature[index].color;
        visualStyle.Size = feature[index].size;
      }
      layerfeature.VisualStyle = visualStyle;
      ObjectArray.push(layerfeature);
    }
    featureCollection.Features = ObjectArray;
    return featureCollection;
  }
  //将服务器接受layer里面的DGMFeature()数据转成feature数据发送给服务器
  featureToJson(featureCollection) {
    var feature = featureCollection.Features;
    var jsondata = [];
    //console.log(feature)
    for (let index = 0; index < feature.length; index++) {
      //if (feature[index].DataState != 0) {
      var featureOne = {};
      var layerfeature = new DGMFeature();

      layerfeature = feature[index];
      featureOne.id = layerfeature.id;
      featureOne.name = layerfeature.Name;
      featureOne.type = layerfeature.Type;
      featureOne.GeoCode = layerfeature.GeoCode;
      featureOne.FeatureType = layerfeature.FeatureType;
      featureOne.color = layerfeature.VisualStyle.Color;
      featureOne.size = layerfeature.VisualStyle.Size;
      featureOne.AmbientIntensity = layerfeature.VisualStyle.AmbientIntensity;
      featureOne.Shininess = layerfeature.VisualStyle.Shininess;
      featureOne.Transparency = layerfeature.VisualStyle.Transparency;
      featureOne.upprop = layerfeature.UpProp;
      featureOne.downprop = layerfeature.DownProp;
      featureOne.DataFromDB = 1; //<新增加属性>
      featureOne.DataState = 1; //<新增加属性>
      jsondata.push(featureOne);
      //}
    }
    return jsondata;
  }

  //AJAX数据操作
  //直接连接数据库服务器获取数据
  GetWorkspaceList() {
    var WorkspaceList;
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://182.92.3.51:5001/GetWorkspaceList", //<服务器>
      //url:"http://localhost:5000/GetWorkspaceList",//<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        WorkspaceList = oData;
      },
      error: function () {
        console.log("failed to load json");
        WorkspaceList = [];
      },
    });
    return WorkspaceList;
  }
  //<张建振>对数据库进行连接设计获得完整的Workspace
  GetWorkspace(id) {
    //var Workspace=new DGMJsonIO();
    var workspace;
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://182.92.3.51:5001/GetWorkspace/" + id, //<服务器>
      //url:"http://localhost:5000/GetWorkspace/"+id,//<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        //var dgmJsonIO = new DGMJsonIO();
        //console.log("前", oData)
        workspace = oData;
        //console.log(workspace)
      },
      error: function () {
        console.log("failed to load json");
        return 0;
      },
    });
    return this.WorkspaceFromJson(workspace);
  }
  //<张建振>将worksapce保存到服务器上数据库
  UpdateWorkspace(gWorkspace) {
    //var Workspace=new DGMJsonIO();
    //var dgmJsonIO = new DGMJsonIO();

    //var data = this.WorkspaceToJson(gWorkspace);
    //console.log(data)
    $.ajax({
      type: "POST",
      data: JSON.stringify(gWorkspace),
      contentType: "application/json",
      url: "http://182.92.3.51:5001/UpdateWorkspace", //<服务器>
      //url: "http://localhost:5000/UpdateWorkspace", //<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        console.log("成功");
        return 1;
      },
      error: function () {
        console.log("failed to load json");
        return 0;
        //alert("shuju")
      },
    });
  }

  //<张建振>将worksapce保存到服务器上数据库
  UpdateMap(map1, id) {
    //var Workspace=new DGMJsonIO();
    //var dgmJsonIO = new DGMJsonIO();

    //var data = this.WorkspaceToJson(map);
    $.ajax({
      type: "POST",
      data: JSON.stringify(map1),
      contentType: "application/json",
      url: "http://182.92.3.51:5001/UpdateMap/" + id, //<服务器>
      //url: "http://localhost:5000/UpdateMap/" + id, //<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        console.log("成功");
        return 1;
      },
      error: function () {
        console.log("failed to load json");
        return 0;
      },
    });
  }

  //<张建振>将worksapce保存到服务器上数据库
  UpdateLayer(layer, id) {
    //var Workspace=new DGMJsonIO();
    //var dgmJsonIO = new DGMJsonIO();

    //var data = this.WorkspaceToJson(map);
    $.ajax({
      type: "POST",
      data: JSON.stringify(layer),
      contentType: "application/json",
      url: "http://182.92.3.51:5001/UpdateLayer/" + id, //<服务器>
      //url: "http://localhost:5000/UpdateLayer/" + id, //<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        console.log("成功");
        return 1;
      },
      error: function () {
        console.log("failed to load json");
        return 0;
        //alert("shuju")
      },
    });
  }

  //<张建振>将worksapce中Map保存到服务器上数据库
  AddMap(gWorkspace, id) {
    //var Workspace=new DGMJsonIO();
    //var dgmJsonIO = new DGMJsonIO();

    var data = this.MapToJson(gWorkspace);
    //console.log(data)
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      //url: "http://182.92.3.51:5001/AddMap/"+id,//<服务器>
      //url:"http://localhost:5000/AddMap/"+id,//<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        console.log("成功");
      },
      error: function () {
        console.log("failed to load json");
        //alert("shuju")
      },
    });
  }

  //<张建振>将Map的layer保存到服务器上数据库
  AddLayer(gWorkspace, id) {
    //var Workspace=new DGMJsonIO();
    //var dgmJsonIO = new DGMJsonIO();

    var data = this.LayerToJson(gWorkspace);
    //console.log(data)
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      //url: "http://182.92.3.51:5001/AddLayer/"+id,//<服务器>
      //url:"http://localhost:5000/AddLayer/"+id,//<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        console.log("成功");
      },
      error: function () {
        console.log("failed to load json");
        //alert("shuju")
      },
    });
  }
  //<张建振>对数据库进行连接设计获得数据库中的Workspace行号
  getWorkspaceRows() {
    //var Workspace=new DGMJsonIO();
    var getWorkspaceRow;
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://182.92.3.51:5001/GetWorkspaceRows", //<服务器>
      //url:"http://localhost:5000/GetWorkspace/"+id,//<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        getWorkspaceRow = oData;
      },
      error: function () {
        console.log("failed to load json");
        getWorkspaceRow = 0;
        //alert("shuju")
      },
    });
    return getWorkspaceRow;
  }

  //<张建振>对数据库进行连接设计获得数据库中的Workspace行号
  findID(name, id) {
    var data = {};
    data.name = name; //
    //var data = this.LayerToJson(gWorkspace);
    //console.log(data)
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      //url: "http://182.92.3.51:5001/find/"+id,//<服务器>
      //url:"http://localhost:5000/find/"+id,//<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        return oData;
        //console.log("成功");
      },
      error: function () {
        console.log("failed to load json");
        return "连接失败";
        //alert("shuju")
      },
    });
  }
  //<张建振>对数据库进行连接设计获得数据库中的Workspace行号
  getKeyWords(type) {
    var getWorkspaceRow;
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://182.92.3.51:5001/GetKeyWords/" + type, //<服务器>
      //url:"http://localhost:5000/GetKeyWords/"+type,//<本地>
      dataType: "json",
      async: false,
      success: function (oData) {
        if (oData.hasOwnProperty("msg")) {
          getWorkspaceRow = 0;
        } else {
          getWorkspaceRow = oData;
        }
      },
      error: function () {
        console.log("failed to load json");
        getWorkspaceRow = 0;
      },
    });
    return getWorkspaceRow;
  }
}
export default DGMJsonIO;
