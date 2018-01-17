(function (){
	// menu private vars en functions..
	
	function EditorView (  )
	{
		this.margin=100;
	}
	EditorView.prototype.reset=function ()
	{
		this.level_nr=0; // which map..
	}

	EditorView.prototype.init=function (initObj)
	{
		this.engine=MG.game.engine;
		this.canvas=initObj.canvas; // we allready HAVE a EditorView canvas!
		this.scrollbars=initObj.scrollbars;
		this.scrollcontent=initObj.scrollcontent;
		this.dom=initObj.dom;
		console.log("set pointer control")
//		this.scrollbars.addEventListener("pointerdown",this.handlePointer.bind(this));
//		this.scrollbars.addEventListener("pointerup",this.handlePointer.bind(this));
//		this.scrollbars.addEventListener("pointermove",this.handlePointer.bind(this));
		this.canvas.addEventListener("pointerdown",this.handlePointer.bind(this));
		this.canvas.addEventListener("pointerup",this.handlePointer.bind(this));
		this.canvas.addEventListener("pointermove",this.handlePointer.bind(this));
		MG.game.engine.setOutputCanvas(this.canvas); // set the EditorView engine to the SAME canvas.
		this.viewport=MG.game.viewport;
		this.mouse={x:0,y:0,down:false};
	};
	EditorView.prototype.setLevelSize=function(w,h)
	{
		console.log("fix level size in view: "+w+','+h);
		var wid=(w+this.margin*2);
		var hei=(h+this.margin*2);
		if(wid<window.innerWidth) wid=window.innerWidth+this.margin*2;
		if(hei<window.innerHeight) hei=window.innerHeight+this.margin*2;
		this.scrollcontent.style.width=wid+"px";
		this.scrollcontent.style.height=hei+"px";
		MG.editorControls.updateLevelProps(w,h); // sets w en h
	}
	EditorView.prototype.handlePointer=function(ev)
	{
	}
	EditorView.prototype.handlePointer=function(ev)
	{
		switch(ev.type)
		{
			case "pointermove":
				this.mouse.x=ev.pageX+MG.game.camera.x;
				this.mouse.y=ev.pageY+MG.game.camera.y;
			break;
			case "pointerdown":
				this.mouse.x=ev.pageX+MG.game.camera.x;
				this.mouse.y=ev.pageY+MG.game.camera.y;
				this.mouse.down=true;
			break;
			case "pointerup":
				this.mouse.down=false;
			break;
			default:
				console.log("EditorView - handlePointer");
				console.log("unknown event: "+ev.type);
		}
		if(typeof(MG.game.tilemap)!="undefined")
		{
			this.mouse.tileX=Math.floor(this.mouse.x/MG.game.tilemap.tileSize.w);
			this.mouse.tileY=Math.floor(this.mouse.y/MG.game.tilemap.tileSize.h);
			if(this.mouse.down && (this.mouse.oldTileX!=this.mouse.tileX || this.mouse.oldTileY!=this.mouse.tileY))
			{
				console.log("we need to 'paint' block "+this.mouse.tileX+", "+this.mouse.tileY+" "+MG.editorControls.activePaint);
				MG.game.tilemap.setTile(this.mouse.tileX,this.mouse.tileY,MG.editorControls.activePaint);
				//(this.mouse.tileX,this.mouse.tileY,)
			}
		}
	}
	
	EditorView.prototype.createBeginSituation=function()
	{
		console.log("EditorView - createBeginSituation");
		this.results={won:false, score: 0};  // if you start, you haven't won yet.. etc..
	}
	
	EditorView.prototype.moveCamera=function(ev)
	{
		console.log(this.margin)
		var x=ev.currentTarget.scrollLeft-this.margin;
		var y=ev.currentTarget.scrollTop-this.margin;
		console.log("EditorView - moveCamera"+x+" "+y);
		MG.game.camera.setPos(x,y); 
	}

	// we start the EditorView.
	EditorView.prototype.start=function()
	{
		console.log("EditorView.start()");
		this.engine.clearAll();
		// load the level
		this.engine.loadLevel(this.level_nr); // ok, so view is also model here.. hmmmmmm. we might want to split that?
		this.scrollbars.addEventListener("scroll",this.moveCamera.bind(this));
		this.createBeginSituation();
		this.engine.start();
	};
	console.log("create MG.EditorView");
	MG.editorView=new EditorView();
})();
