class ReadFile{
    constructor(){
        this.ClassName = 'ReadFile';
    }
    getFaultWorkspace(temp_str,node){
        if(temp_str=="0")
			{
				alert("请先上传文件");
			}
			else
			{    
				 var arr = temp_str.split(" ");
                 console.log(arr)
				 var Array=[];
				 for(i=0;i<arr.length;i++){
				if(arr[i]!=""){
					Array.push(arr[i])

				}

			}
				 //console.log(Array)
				 var sarr=[];
				// console.log(sarr)      //buffergeometry单个，需要进行处理
				 var marr=[];
				 var farr=[]
				 console.log(farr)     //带有featureid的feature
				 for(var j=0;j<Array.length;j++){
					if(Array[j]=="PROFILE"||Array[j]=="\nPROFILE"){
						//console.log(Array[j+1])
						var f=new DGMFeature;
						f.Name=Array[j+1];
						f.id="PROFILE_"+Array[j+1];
						f.FeatureType="Fault"
						farr.push(f);
					
					}	
					else if(Array[j]=="ms\n"||Array[j]=="\n"){
						 var p1=new DGMBufferGeometry();
						  p1.FeatureID=f.id;
						  p1.points.push(parseFloat(Array[j+2]));
						  p1.points.push(parseFloat(Array[j+1]));
						  p1.points.push(parseFloat(Array[j+4]));
						  p1.id=Array[j+3];
						  sarr.push(p1)
						  
					}

					}
					for(var i=0;i<sarr.length;i=i+len){
				    var p=new DGMBufferGeometry();
					p.points=sarr[i].points;
					p.id=sarr[i].id;
					p.FeatureID=sarr[i].FeatureID;
					p.GeoType='Line'
				    for(var j=i+1;j<sarr.length;j++){	
					if(sarr[i].id==sarr[j].id){
						for(var l=0;l<3;l++){
							p.points.push(sarr[j].points[l])
							
						}
				

					}
					}
					marr.push(p)
					var len=p.points.length/3
				
			
			}
					console.log(marr)//buffergeometry的真实数据
					if(node==null){
						var W1=this.AddFaultWorkspace(farr,marr,f.Name)
						return W1;

					}else{
						this.AddFaultWorkspace1(farr,marr,node)
					}
					
					
				
				  }
  
				
    }
	getFaultFeatureCollection(temp_str){
        if(temp_str=="0")
			{
				alert("请先上传文件");
			}
			else
			{    
				 var arr = temp_str.split(" ");
                 console.log(arr)
				 var Array=[];
				 for(i=0;i<arr.length;i++){
				if(arr[i]!=""){
					Array.push(arr[i])

				}

			}
				 //console.log(Array)
				 var sarr=[];
				// console.log(sarr)      //buffergeometry单个，需要进行处理
				 var marr=[];
				 var farr=[]
				 console.log(farr)     //带有featureid的feature
				 for(var j=0;j<Array.length;j++){
					if(Array[j]=="PROFILE"||Array[j]=="\nPROFILE"){
						//console.log(Array[j+1])
						var f=new DGMFeature;
						f.Name=Array[j+1];
						f.id="PROFILE_"+Array[j+1];
						f.FeatureType="Fault"
						f.label=f.Name
						farr.push(f);
					
					}	
					else if(Array[j]=="ms\n"||Array[j]=="\n"){
						 var p1=new DGMBufferGeometry();
						  p1.FeatureID=f.id;
						  p1.points.push(parseFloat(Array[j+2]));
						  p1.points.push(parseFloat(Array[j+1]));
						  p1.points.push(parseFloat(Array[j+4]));
						  p1.id=Array[j+3];
						  sarr.push(p1)
						  
					}

					}
					for(var i=0;i<sarr.length;i=i+len){
				    var p=new DGMBufferGeometry();
					p.points=sarr[i].points;
					p.id=sarr[i].id;
					p.FeatureID=sarr[i].FeatureID;
					p.GeoType='Line'
				    for(var j=i+1;j<sarr.length;j++){	
					if(sarr[i].id==sarr[j].id){
						for(var l=0;l<3;l++){
							p.points.push(sarr[j].points[l])
							
						}
				

					}
					}
					marr.push(p)
					var len=p.points.length/3
				
			
			}
					console.log(marr)//buffergeometry的真实数据
					var f1=new DGMFeatureCollection;
					f1.label = 'Features'
					for(var i=0;i<farr.length;i++){
						f1.AddFeature(farr[i])
					}
					var tile = new DGMTile;
					tile.id="F"+"_Tile"
					tile.Name="F"+"_Tile";
					tile.label="Tiles"
					for(var l=0;l<marr.length;l++){
						tile.BufferGeometry.push(marr[l])
				 }
				 var allarr=[];
				 allarr[0]=f1;
				 allarr[1]=tile;
				 return allarr;


			
					
					
				
				  }
  
				
    }
	getFaultWorkspace1(temp_str,node){
        if(temp_str=="0")
			{
				alert("请先上传文件");
			}
			else
			{    
				 var arr = temp_str.split(" ");
                 console.log(arr)
				 var Array=[];
				 for(i=0;i<arr.length;i++){
				if(arr[i]!=""){
					Array.push(arr[i])

				}

			}
				 //console.log(Array)
				 var sarr=[];
				// console.log(sarr)      //buffergeometry单个，需要进行处理
				 var marr=[];
				 var farr=[]
				 console.log(farr)     //带有featureid的feature
				 for(var j=0;j<Array.length;j++){
					if(Array[j]=="PROFILE"||Array[j]=="\nPROFILE"){
						//console.log(Array[j+1])
						var f=new DGMFeature;
						f.Name=Array[j+1];
						f.id="PROFILE_"+Array[j+1];
						f.FeatureType="Fault"
						farr.push(f);
					
					}	
					else if(Array[j]=="ms\n"||Array[j]=="\n"){
						 var p1=new DGMBufferGeometry();
						  p1.FeatureID=f.id;
						  p1.points.push(parseFloat(Array[j+2]));
						  p1.points.push(parseFloat(Array[j+1]));
						  p1.points.push(parseFloat(Array[j+4]));
						  p1.id=Array[j+3];
						  sarr.push(p1)
						  
					}

					}
					for(var i=0;i<sarr.length;i=i+len){
				    var p=new DGMBufferGeometry();
					p.points=sarr[i].points;
					p.id=sarr[i].id;
					p.FeatureID=sarr[i].FeatureID;
					p.GeoType='Line'
				    for(var j=i+1;j<sarr.length;j++){	
					if(sarr[i].id==sarr[j].id){
						for(var l=0;l<3;l++){
							p.points.push(sarr[j].points[l])
							
						}
				

					}
					}
					marr.push(p)
					var len=p.points.length/3
				
			
			}
					console.log(marr)//buffergeometry的真实数据
					if(node==null){
						var W1=this.AddFaultWorkspace(farr,marr,f.Name)
						return W1;

					}else{
						this.AddFaultWorkspace1(farr,marr,node)
					}
					
					
				
				  }
  
				
    }
	AddFaultWorkspace1(farr,marr,node){
		var f1=new DGMFeatureCollection;
					node.FeatureCollection=f1;
					for(var i=0;i<farr.length;i++){
						f1.AddFeature(farr[i])
						f1.Features.push(farr[i])
					}
					var tile = new DGMTile;
					tile.id=node.id+"_Tile"
					tile.Name=node.Name+"_Tile";
					for(var l=0;l<marr.length;l++){
						tile.BufferGeometry.push(marr[l])
				 }
				 node.Clear();
				 node.AddObject(tile);

	}
	AddFaultWorkspace(farr,marr,name){
		           var W1=new DGMWorkSpace;
					W1.Name="W_"+"ProFile"+name
					W1.id="FW_"+"ProFile"+name
					W1.Bounds=[0,0,0,100000,100000,100000];
					var M1=new DGMGeoMap2D;
					M1.name="M_"+"ProFile"+name
					M1.id="FM_"+"ProFile"+name
					var L1=new  DGMAbstractLayer;
					L1.name="L_"+"ProFile"+name;
					L1.id="FL_"+"ProFile"+name;
					L1.Type="Fault";
					console.log("123",W1)
					W1.AddObject(M1)
					//W1.AddNode(M1)
					console.log("456",W1)
					M1.AddObject(L1)
					//M1.AddNode(L1)
					var f1=new DGMFeatureCollection;
					L1.FeatureCollection=f1;
					for(var i=0;i<farr.length;i++){
						f1.AddFeature(farr[i])
						
					}
					var tile = new DGMTile;
					tile.id=L1.id+"_Tile"
					tile.Name=L1.Name+"_Tile";
					for(var l=0;l<marr.length;l++){
						tile.BufferGeometry.push(marr[l])
				 }
				 L1.Clear();
				 L1.AddObject(tile);
				 console.log(W1)
				 return W1;
				

	}
	getHorizonWorkspace(temp_str){
		if(temp_str=="0")
			{
				alert("请先上传文件");
			}
			else
			{    
				var arr = temp_str.split(" ");
                 console.log(arr)
				 var Array=[];
				 for(var i=0;i<arr.length;i++){
				if(arr[i]!=""){
					Array.push(arr[i])

				}}
				console.log(Array)
				var sarr=[];
				console.log(sarr)      //buffergeometry单个，需要进行处理
				var marr=[];
				var farr=[]
				console.log(farr) 
                 for(var j=0;j<Array.length;j++){
				if(Array[j]=="PROFILE"||Array[j]=="\nPROFILE"){
	 					console.log(Array[j+1])
						var f=new DGMFeature;
     					f.Name=Array[j+1];
						f.id="PROFILE_"+Array[j+1];
	     				f.FeatureType="Horizon"
						var vis=new DGMVisualStyle;
						vis.Size=2;
						f.VisualStyle=vis;
						//console.log(f)
						farr.push(f);
					
				}	
				else if(Array[j]=="1\n"||Array[j]=="\n"){
					
						 var p1=new DGMBufferGeometry();
						 if(f==undefined){
							var f=new DGMFeature;
							f.Name="H_"+"PROFILE_";
						   f.id="H_"+"PROFILE_";
	     				   f.FeatureType="Horizon"
						  var vis=new DGMVisualStyle;
					   	vis.Size=2;
						f.VisualStyle=vis;
						//console.log(f)
						farr.push(f);

						 }
				         p1.FeatureID=f.id;
                         p1.GeoType='Point';
						 p1.points.push(parseFloat(Array[j+2]));
						 p1.points.push(parseFloat(Array[j+1]));
						 p1.points.push(parseFloat(Array[j+4]));
						  p1.id=Array[j+3];
					      sarr.push(p1)
						
				}}
                console.log(sarr)  
				var W1=this.AddHorizonWorkspace(farr,sarr,f.Name)
                
 }
 return W1
	} 
AddHorizonFeature(temp_str){
		if(temp_str=="0")
			{
				alert("请先上传文件");
			}
			else
			{    
				var arr = temp_str.split(" ");
                 console.log(arr)
				 var Array=[];
				 for(var i=0;i<arr.length;i++){
				if(arr[i]!=""){
					Array.push(arr[i])

				}}
				console.log(Array)
				var sarr=[];
				console.log(sarr)      //buffergeometry单个，需要进行处理
				var marr=[];
				var farr=[]
				console.log(farr) 
                 for(var j=0;j<Array.length;j++){
				if(Array[j]=="PROFILE"||Array[j]=="\nPROFILE"){
	 					console.log(Array[j+1])
						var f=new DGMFeature;
     					f.Name=Array[j+1];
						f.id="PROFILE_"+Array[j+1];
	     				f.FeatureType="Horizon"
						f.label=f.Name
						var vis=new DGMVisualStyle;
						vis.Size=2;
						f.VisualStyle=vis;
						//console.log(f)
						farr.push(f);
					
				}	
				else if(Array[j]=="1\n"||Array[j]=="\n"){
					
						 var p1=new DGMBufferGeometry();
						 if(f==undefined){
							var f=new DGMFeature;
							f.Name="H_"+"PROFILE_";
						   f.id="H_"+"PROFILE_";
	     				   f.FeatureType="Horizon"
						  var vis=new DGMVisualStyle;
					   	vis.Size=2;
						f.VisualStyle=vis;
						//console.log(f)
						farr.push(f);

						 }
				         p1.FeatureID=f.id;
                         p1.GeoType='Point';
						 p1.points.push(parseFloat(Array[j+2]));
						 p1.points.push(parseFloat(Array[j+1]));
						 p1.points.push(parseFloat(Array[j+4]));
						  p1.id=Array[j+3];
					      sarr.push(p1)
						
				}}
				var f1=new DGMFeatureCollection;
				f1.label = 'Features'
					for(var i=0;i<farr.length;i++){
						f1.AddFeature(farr[i])
					}
					var tile = new DGMTile;
					tile.id="_Tile"
					tile.Name="_Tile";
					tile.label="tiles"
					for(var l=0;l<sarr.length;l++){
						tile.BufferGeometry.push(sarr[l])
				 }
                console.log(sarr)  
			var allarr =[]
			allarr[0]=f1;
			allarr[1]=tile;
			return allarr;
			
		    }
		
	}
	AddHorizonWorkspace(farr,sarr,name){
		var W1=new DGMWorkSpace;
					W1.Name="H_"+"ProFile"+name
					W1.id="HW_"+"ProFile"+name
					W1.Bounds=[0,0,0,100,100,100];
					var M1=new DGMGeoMap2D;
					M1.name="HM_"+"ProFile"+name
					M1.id="HM_"+"ProFile"+name
					var L1=new  DGMAbstractLayer;
					L1.name="LH_"+"ProFile"+name;
					L1.id="HL_"+"ProFile"+name;
					L1.Type="Horizon";
					var f1=new DGMFeatureCollection;
					L1.FeatureCollection=f1;
					for(var i=0;i<farr.length;i++){
						
						f1.Features.push(farr[i])
					}
					var tile = new DGMTile;
					tile.id=L1.id+"_Tile"
					tile.Name=L1.name+"_Tile";
					for(var l=0;l<sarr.length;l++){
						tile.BufferGeometry.push(sarr[l])
				 }
                 console.log(tile)
				 W1.AddObject(M1)
				 M1.AddObject(L1)
				 L1.Clear();
				 L1.AddObject(tile);
				 console.log(W1)
				 return W1;

	}
}