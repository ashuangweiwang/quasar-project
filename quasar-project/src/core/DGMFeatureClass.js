

function ReadTriangles(trianglenode,geometry)
{
	 
	if(trianglenode)
	{
		// 开始解析孩子结点
		if(geometry != null)
		{			
			var unitchildnodes =trianglenode.childNodes;
			for(var j=0;j<unitchildnodes.length;j++)  
			{
				var unitchildnode = unitchildnodes[j];
				if(unitchildnode.nodeName=="Triangle")
				{
				   var trianlgechildnodes = unitchildnode.childNodes;
				   for(var t=0;t<trianlgechildnodes.length;t++)  
					{
					   var trichildnode = trianlgechildnodes[t];
					   if(trichildnode.nodeName=="VertexList")
						{
						   var myString = trichildnode.textContent;
						   if(myString)
							{
							   var xyz = myString.split(" ");
							   var tri = new THREE.Face3();

								if( xyz. length>=1)
								{
									tri.a = parseInt(xyz[0]);
								}

								if( xyz. length >= 2)
								{
									tri.b = parseInt(xyz[1]);
								}

								if( xyz. length>=3)
								{
									tri.c = parseInt(xyz[2]);
								}

						    	 geometry.faces.push(tri);
							}
						}
					}

				}

			}
		}

	}

}

function ReadVertices(vertexnode,geometry)
{
 
	if(vertexnode)
	{
		// 开始解析孩子结点
		if(geometry != null)
		{
		
			var unitchildnodes =vertexnode.childNodes;
			for(var j=0;j<unitchildnodes.length;j++)  
			{
				var unitchildnode = unitchildnodes[j];
				if(unitchildnode.nodeName=="Vertex")
				{
					//nodeprops = unitchildnode.attributes;
					var myString = unitchildnode.textContent ; // not nodeValue (null);
					if(myString)
					{
						var xyz = myString.split(" ");
						//parseInt
						//	parseFloat
						var point = new THREE.Vector3();
						point.z = 0;
						
						if( xyz. length>=1)
						{
							point.x = parseFloat(xyz[0]);
						}

						if( xyz. length >= 2)
						{
							point.y = parseFloat(xyz[1]);
						}

						if( xyz. length>=3)
						{
							point.z = parseFloat(xyz[2]);
						}

						geometry.vertices.push(point);
					}

				}

			}
		}

	}
	 
	 
}

// GeoTin
function ReadTINNode(tinnode)
{   
	var gtin = null;
	try 
	{
		if(tinnode)
		{
			gtin = new THREE.Geometry();

            // 查找unit结点的id
			var nodeprops = tinnode.attributes;
			for(var j=0;j<nodeprops.length;j++)  
			{ 
				if(nodeprops[j].name == "id" || nodeprops[j].name == "gml:id")
				{
					gtin.id = nodeprops[j].value;                  
				}
                else
				{
                   if(nodeprops[j].name == "gml\\:id")
				   {
						gtin.id = nodeprops[j].value;                    
				   }
				}
			}
		      // 开始解析孩子结点
			if(gtin != null)
			{
			
				var unitchildnodes =tinnode.childNodes;
	            for(var j=0;j<unitchildnodes.length;j++)  
			    {
					var unitchildnode = unitchildnodes[j];
					if(unitchildnode.nodeName=="Vertices")
					{
						ReadVertices(unitchildnode,gtin);
					}

					if(unitchildnode.nodeName=="Triangles")
					{
						ReadTriangles(unitchildnode,gtin);
					}
				}
			}
	
		}
	}
	catch(e)
	{
		alert(e.message);
	}

	return gtin;
}

function ReadLineNode(linenode)
{
	var gline = null;
	try 
	{
		if(linenode)
		{
			gline = new THREE.Geometry();

            // 查找unit结点的id
			var nodeprops = linenode.attributes;
			for(var j=0;j<nodeprops.length;j++)  
			{ 
				if(nodeprops[j].name == "id" || nodeprops[j].name == "gml:id")
				{
					gline.id = nodeprops[j].value;                  
				}
                else
				{
                   if(nodeprops[j].name == "gml\\:id")
				   {
						gline.id = nodeprops[j].value;                    
				   }
				}
			}
		      // 开始解析孩子结点
			if(gline != null)
			{
			
				var unitchildnodes =linenode.childNodes;
	            for(var j=0;j<unitchildnodes.length;j++)  
			    {
					var unitchildnode = unitchildnodes[j];
					if(unitchildnode.nodeName=="posList" || unitchildnode.nodeName=="gml\\:posList"  || unitchildnode.nodeName=="gml:posList")
					{
						var myString = unitchildnode.textContent ; // not nodeValue (null);
						if(myString)
						{
							var pointxyz = myString.split("\n");
							var pointcount = 0;
							while(pointcount<pointxyz.length)
							{
								var xyz =  pointxyz[pointcount].split(" ");
								var curcount = 0;
								if(xyz.length>2)
								while(curcount<xyz.length)
                                {
									var point = new THREE.Vector3();
									point.z = 0;
									var pp = curcount;
                                    if(pp <xyz.length)
									{
                                         point.x = parseFloat(xyz[pp]);
										 pp = pp+1;
									}
									 
									if(pp <xyz.length)
									{
                                         point.y = parseFloat(xyz[pp]);
										 pp = pp+1;
									}

                                    if(pp <xyz.length)
									{
                                         point.z = parseFloat(xyz[pp]);
										 pp = pp+1;
									}
                                    curcount = curcount+3;
									gline.vertices.push(point);
								}

                                pointcount = pointcount+1;
							} 

							
						}
					}

				}
			}
	
		}
	}
	catch(e)
	{
		alert(e.message);
	}

	return gline;
}

function ReadPointNode(linenode)
{
	var gline = null;
	try 
	{
		if(linenode)
		{
			gline = new THREE.Geometry();

            // 查找unit结点的id
			var nodeprops = linenode.attributes;
			for(var j=0;j<nodeprops.length;j++)  
			{ 
				if(nodeprops[j].name == "id" || nodeprops[j].name == "gml:id")
				{
					gline.id = nodeprops[j].value;                  
				}
                else
				{
                   if(nodeprops[j].name == "gml\\:id")
				   {
						gline.id = nodeprops[j].value;                    
				   }
				}
			}
		      // 开始解析孩子结点
			if(gline != null)
			{
			
				var unitchildnodes =linenode.childNodes;
	            for(var j=0;j<unitchildnodes.length;j++)  
			    {
					var unitchildnode = unitchildnodes[j];
					if(unitchildnode.nodeName=="gml:pos" || unitchildnode.nodeName=="pos" )
					{
						var myString = unitchildnode.textContent ; // not nodeValue (null);
						if(myString)
						{
							 
								var xyz =  myString.split(" ");
								var curcount = 0;
								if(xyz.length>2)
								while(curcount<xyz.length)
                                {
									var point = new THREE.Vector3();
									point.z = 0;
									var pp = curcount;
                                    if(pp <xyz.length)
									{
                                         point.x = parseFloat(xyz[pp]);
										 pp = pp+1;
									}
									 
									if(pp <xyz.length)
									{
                                         point.y = parseFloat(xyz[pp]);
										 pp = pp+1;
									}

                                    if(pp <xyz.length)
									{
                                         point.z = parseFloat(xyz[pp]);
										 pp = pp+1;
									}
                                    curcount = curcount+3;
									gline.vertices.push(point);
								}
						}
					}

				}
			}
	
		}
	}
	catch(e)
	{
		alert(e.message);
	}

	return gline;
}