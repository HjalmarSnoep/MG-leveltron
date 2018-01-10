'use strict';

/* the TileEvents is the keeper of the events on a tilemap
   and handles any interactions with this map.
 */

(function (){
		
	function TileEvents()
	{
		this.listeners={};
	}
	// draw the map into the viewport, using the camera.
	TileEvents.prototype.addEventListener=function(name,listener)
	{	
		this.listeners[name]=listener;
	};
	TileEvents.prototype.event=function(e)
	{
		if(typeof(this.listeners[e.type])!="undefined")
		{
			this.listeners[e.type](e);
//			console.log("I seem to have this type of event, let me pass it on..");
		}else{
			console.log("This type of event for Tiles is undefined "+e.type);
		}
	}
	MG.extend(MG,"game");
	MG.game.tileEvents=new TileEvents();
	

	/* if you are looking for the actual listeners,
	   try game/objects/tiles.js :)
	   This is just the code to make listeners possible.
	   The idea is that most gameplay-edits can be made
	   in game/objects or in game/engine.js
   */

})();