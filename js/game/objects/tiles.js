'use strict';
(function (){
		
	/* define the tile eventlisteners underneath, 
	   you can also define custom eventlisteners in levels, 
	   make sure you give it a unique name, then..*/
	
	
	// coins overEvent
	MG.game.tileEvents.addEventListener("coin",function(e)
	{
		// coin event
		var x=e.tile.x;
		var y=e.tile.y;
		e.tilemap.setTile(x,y,1); // to air!
		// spawn a small explosion particle.
		MG.game.particles.create("checking",(x+0.5)*e.tilemap.tileSize.w,(y+0.5)*e.tilemap.tileSize.h,"#f00"); // show we are checking this out..
	})
	MG.game.tileEvents.addEventListener("water",function(e)
	{
		// touch water event
		e.activator.inWater=true;
	})

	MG.game.tileEvents.addEventListener("unlock",function(e)
	{
		// we make the grey things no longer solid! event
		console.log(JSON.stringify(MG.game.tilemap.dictionary));
		MG.game.tilemap.dictionary[10].solid=false;
		MG.game.tilemap.dictionary[10].col="#ccdddd";
		console.log(JSON.stringify(MG.game.tilemap.dictionary));
	})

	// trampoline touchEvent
	MG.game.tileEvents.addEventListener("trampoline",function(e)
	{
		if(e.activator.move_iterations<2)
			e.activator.dy-=10;
	})


})();
