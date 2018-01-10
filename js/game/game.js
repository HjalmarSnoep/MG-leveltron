(function (){
	// menu private vars en functions..
	
	function Game (  )
	{
	}
	Game.prototype.reset=function ()
	{
		this.level_nr=0; // which map..
	}

	Game.prototype.init=function (initObj)
	{
		this.engine=MG.game.engine;
		this.canvas=initObj.canvas; // we allready HAVE a game canvas!
		this.controls=initObj.controls;
		this.dom=initObj.dom;
		MG.game.engine.setOutputCanvas(this.canvas); // set the game engine to the SAME canvas.
		this.viewport=MG.game.viewport;
	};
	
	Game.prototype.createBeginSituation=function()
	{
		console.log("game - createBeginSituation");
		this.results={won:false, score: 0};  // if you start, you haven't won yet.. etc..
	}
	Game.prototype.checkWinLoose=function()
	{
		
	}

	// we start the game.
	Game.prototype.start=function()
	{
		console.log("game.start()");
		this.engine.clearAll();
		// load the level
		this.engine.loadLevel(this.level_nr);
		this.createBeginSituation();
		this.engine.start();
	};
	console.log("create MG.game");
	MG.game=new Game();
})();
