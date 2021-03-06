'use strict';

/* the TileMap is the keeper of the active tilemap
   and handles any interactions with this map.
 */

(function (){
		
	function TileMap()
	{
		this.id="default Tilemap";
		this.w=40;
		this.h=60;
		this.tileSize={w:32,h:32};
		
		// we buffer the level in sectors for quicker drawing.
		this.sectorSize={w:32,h:32};
		
		this.f=0; // the map counter for animated tiles.
		this.data=[
				[2,2,2,2,2,2,2,2,2,2,2,2,2],
				[2,1,1,1,1,1,4,4,4,1,1,1,2],
				[2,1,1,1,1,1,4,4,4,1,1,1,2],
				[2,1,1,1,1,1,4,4,4,1,1,1,2],
				[2,1,1,1,1,1,1,1,1,1,1,1,2],
				[2,1,1,1,1,1,1,1,1,1,1,1,2],
				[2,1,1,1,1,1,1,1,1,1,1,1,2],
				[2,1,1,1,1,1,1,1,1,1,1,1,2],
				[2,1,1,1,1,1,1,1,1,1,1,1,2],
				[2,2,2,2,2,2,6,6,2,2,2,2,2]]; // the kinds map..
		this.dictionary=[
			{col: '#aaf', solid: false}, // 0, just a non-wall
			{col: '#aff', solid:false}, // 1, just a a non-wall
			{col: '#300',solid: true},  // 2, just a wall
			{col: 'rgba(121, 220, 242, 0.4)', solid: false}, // 3= water
			{col: '#ff0' ,overEvent: "coin", solid: false}, // 4,coins
			{col: '#f0f',solid: true}, // 5, trampoline 
			{col: '#000',solid: true,touchEvent: "trampoline"}, // bounce 0 block, not really used anymore.
			{col: '#73C6FA',solid: false,overEvent: "Change Color"},
			{col: '#FADF73',solid: false,overEvent: 'next_level'},
			{col: '#C93232',solid: false,overEvent: 'death'},
			{col: '#555',solid: true}, // unlockable!
			{col: '#0FF',solid: false,overEvent: 'unlock'}];
		// copy it in [x][y] order, map is in [y][x] to be better readable.
		
	
		/* The coordinates at which the player spawns and the col of the player */
		this.player= {
			x: 2,
			y: 2,
			col: '#FF9900'
		};
		
	}
	
	// this you can use, to load a NEW data into this object..
	TileMap.prototype.init=function(init_object)
	{
		for(var all in init_object)
		{
			var str=JSON.stringify(init_object[all]);
			console.log("loading "+all+":"+str);
			this[all]=JSON.parse(str);
		}
		// we allready had a default, now we might want to check if there is anything in the init_object object.
		// and we override the defaults.
		// for now, we just stick with the defaults, ok?
	};

	// helper function to work with real coords...
	TileMap.prototype.getTileAt=function(x,y)
	{
		var x=Math.floor(x/this.tileSize.w);
		var y=Math.floor(y/this.tileSize.h);
		return this.getTile(x,y);
	};
	// the direct version of the above function,
	// don't confuse them, these x and y are grid coords!
	// this one is here, so I can optimise collisions.
	TileMap.prototype.getTile=function(x,y)
	{
		if(typeof(this.data[y])!="undefined" && typeof(this.data[y][x])!="undefined")
		{
			var o=JSON.parse(JSON.stringify(this.dictionary[this.data[y][x]]));
			o.x=x;
			o.y=y;
			return o;
		}else
		{
			return {x:x,y:y,solid: true}; // undefined but solid!
		}
	};	
	TileMap.prototype.setTile=function(x,y,kind)
	{
		
		if(y>=0 && y<this.h && x>=0 && x<this.w)
			this.data[y][x]=kind;
	}

	// draw the map into the viewport, using the camera.
	TileMap.prototype.setSize=function(w,h)
	{
		console.log("set tilemap size: "+w+"x"+h);
		// we need to adapt the data to the new size!
		var new_data=[];
		for(var y=0;y<h;y++)
		{
			new_data[y]=[];
			for(var x=0;x<w;x++)
			{
				if(typeof(this.data[y])!="undefined" && typeof(this.data[y][x])!="undefined")
				{
					new_data[y][x]=this.data[y][x];
				}else{
					new_data[y][x]=0;
				}
			}
		}
		this.w=w;
		this.h=h;
		this.data=new_data;

	};
	 
	TileMap.prototype.readFromFile=function(txt)
	{
		var data=JSON.parse(txt);
		this.id=data.id;
		this.w=data.w;
		this.h=data.h;
		this.setSize(this.w,this.h);
		this.data=JSON.parse(JSON.stringify(data.data));// deep copy array
		this.player=JSON.parse(JSON.stringify(data.player));// deep copy array
	}
	TileMap.prototype.getSlotData=function(message)
	{
		console.log("getting slot data from "+message.from);
		this.id=message.id;
		this.w=message.data.w;
		this.h=message.data.h;
		this.setSize(this.w,this.h);
		this.data=JSON.parse(JSON.stringify(message.data.data));// deep copy array
		this.player=JSON.parse(JSON.stringify(message.data.player));// deep copy array
		// we need to refresh some stuff, in the controls..
		MG.editorControls.updateLevelProps(); // show possibly new size and stuff of level.
		MG.editorView.setLevelSize(this.w*this.tileSize.w,this.h*this.tileSize.h); // show possibly new size and stuff of level.
	}
	TileMap.prototype.cleanCopy=function()
	{
		var data={};
		data.id=this.id;
		data.w=this.w;
		data.h=this.h;
		data.data=JSON.parse(JSON.stringify(this.data));// deep copy array
		data.player=JSON.parse(JSON.stringify(this.player));// deep copy array
		return data;
	};

	// draw the map into the viewport, using the camera.
	TileMap.prototype.draw=function(ctx,camera,showSize)
	{
		// get the width of the viewport in tiles..
//		console.log("camera.viewport"+JSON.stringify(camera.viewport));
		var tw=Math.ceil(camera.viewport.width/this.tileSize.w)+2;
		var th=Math.ceil(camera.viewport.height/this.tileSize.h)+2;
		var ox=Math.floor(camera.x/this.tileSize.w)-1;
		var oy=Math.ceil(camera.y/this.tileSize.h)-1;
		//console.log("drawing tiles: "+tw+"x"+th);
		//console.log("of size: "+this.tileSize.w+"x"+this.tileSize.h);
		for(var x=0;x<tw;x++)
		for(var y=0;y<th;y++)
		{
			var tx=x+ox;
			var ty=y+oy;
			if(tx>=0 && ty>=0 && ty<this.data.length && tx<this.data[ty].length)
			{
				var the_tile=this.data[ty][tx];
				ctx.fillStyle=this.dictionary[the_tile].col;
				ctx.strokeStyle="#000";
				ctx.fillRect(tx*this.tileSize.w,ty*this.tileSize.h,this.tileSize.w,this.tileSize.h);
				ctx.strokeRect(tx*this.tileSize.w,ty*this.tileSize.h,this.tileSize.w,this.tileSize.h);
			}else{
				// the tile if undefined;;
				ctx.strokeStyle="#00c";
				ctx.strokeRect(tx*this.tileSize.w,ty*this.tileSize.h,this.tileSize.w,this.tileSize.h);
			}
		}
		if(	showSize==true)
		{
			// we need to show the size the user has set..
			var w=this.w*this.tileSize.w;
			var h=this.h*this.tileSize.h;
			ctx.strokeStyle="rgba(0,0,0,0.5)";
			ctx.lineWidth=this.tileSize.w;
			ctx.strokeRect(-this.tileSize.w/2,-this.tileSize.w/2,w+this.tileSize.w,h+this.tileSize.w);
			
			ctx.strokeStyle="#fff";
			ctx.lineWidth=1;
			ctx.strokeRect(1,1,w,h);
		}
	};
	MG.extend(MG,"game");
	MG.game.TileMap=TileMap;

})();