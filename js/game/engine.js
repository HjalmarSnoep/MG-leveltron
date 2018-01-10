'use strict';

(function (){
		
function Engine()
{
	this.state="pauzed";
	this.state_counter=0;
	this.view=null;
	this.counter=0;
	this.stateCounter=0;
	this.objects=[]; // game objects!
	this.win_conditions=[]; // array of possible win_conditions
	this.loose_conditions=[]; // array of possible loose_conditions
	this.types=[]; // typelists
	this.performanceChecks={};
	this.freeze_counter=90;
	this.end_counter=20;
	this.ended=false;
	this.won=false;
	this.total_time=60*180;// you got 3 minutes
	
	this.canvas=MG.game.canvas; // by default we will just take the game.canvas, which is actually created by the gamePAGE!

	MG.input.mouse.clickHandler=this.clickPointer.bind(this);
}

Engine.prototype.clickPointer=function(ev)
{
	if(this.state!="playing"){
		console.log("Game ignores click, not playing.."+this.state);
		return;
	}
	// find out the closest gameObject.
	var os=this.objects,i,o,closest=-1,dist=200; // object click area..
	for(i=os.length-1;i>=0;i--)
	{
		o=os[i];
		if(o.clickable)
		{
			var dx=o.x-MG.input.mouse.x;
			var dy=o.y-MG.input.mouse.y;
			var len=Math.sqrt(dx*dx+dy*dy);
			if(len<dist)
			{
				dist=len;
				closest=i;
			}
		}
	}
	if(closest!=-1)
	{
		var clicked_object=this.objects[closest];
		clicked_object.event({type:"click"});
	}
};
Engine.prototype.startPerformanceCheck=function(name)
{
	var now=this.getTimeStamp();
	var stamp=this.performanceChecks[name];
	if(typeof(stamp)==="undefined")
	{
		console.log("init timestamp for "+name);
		stamp={last:[],total:0,average:0,times:0,max:0,min:50000,stamp:now};
	}
	stamp.stamp=now;
	this.performanceChecks[name]=stamp;	
}
Engine.prototype.endPerformanceCheck=function(name)
{
	var now=this.getTimeStamp();
	var stamp=this.performanceChecks[name];
	var dt=now-stamp.stamp;
	stamp.last.push(dt);
	if(stamp.last.length>60) stamp.last.splice(0,1);
//	console.log(stamp.last);
	this.performanceChecks[name]=stamp;	
}

Engine.prototype.getTimeStamp=function()
{
	return  window.performance.now();
//	return new Date().getTime();
}

Engine.prototype.start=function()
{
	console.log("Starting Game Engine");
	MG.game.pause=false;// we have started!
	MG.game.controller=1; // it is either one or two..
	this.switchState("frozen");
	
};

Engine.prototype.stop=function()
{
	console.log("Stopping Game Engine");
	this.switchState("paused");
};
	
Engine.prototype.spawnObject=function(o,x,y)
{
		o.x=x;
		o.y=y;
		o.type=o.constructor.name;
		this.objects.push(o);
		// now fire the spawn event for this object.
		o.event({type: "spawn"}); //no more info necessary;
//		console.log("this.objects :"+this.objects.length);
};
Engine.prototype.moveObjects=function()
{
	var os=this.objects,i,o;
	for(i=os.length-1;i>=0;i--)
	{
		o=os[i];
		o.behaviour(o);
		if(o.remove)
		{	o.event({type:"despawn"});// allow object to clean up after itself..
			os.splice(i,1); //
		}
	}
};
Engine.prototype.findObjectWithId=function (id)
{
	var os=this.objects,i,o;
	for(i=os.length-1;i>=0;i--)
	{
		o=os[i];
		if(o.id==id) return o;
	}
	return null; // no object found.
}

Engine.prototype.switchState=function(st)
{
	if(this.state!=st)
	{
		this.state=st;
		this.stateCounter=0;
		MG.input.mouse.clickHandler=null;
		switch(st)
		{
			case "win":
				console.log("game state switch to win");
			break;
			case "lost":
				console.log("game state switch to lost");
				
			break;
			case "stopped":
				console.log("game state switch to stopped");
			break;
			case "frozen":
			case "playing":
				console.log("game state switch to playing");
//				MG.trons.musitron.stopAll();
//				MG.trons.musitron.play("game");
				if(this.ended==true)
				{
					console.log("ended, but showing a few more frames..");
					this.end_counter--;
					if(this.end_counter<=0) this.switchState("stopped");
				}
				this.loop();
			break;			
			case "pause":
				console.log("game state switch to playing");
				MG.trons.musitron.stopAll();
			break;			
			default:
				console.log("Attmpt to switch game state to: " +st);
				return;
		}
	}else{
		console.log("Game Engine allready in state: "+st+" no action taken");
	}
	
}
Engine.prototype.event=function(e)
{
	console.log("game Engine Event: "+JSON.stringify(e))
	switch(e.type)
	{
		case "lost":
//			MG.trons.musitron.stop("game");		
//			setTimeout(MG.trons.musitron.play,5000,"rest");		
//			MG.trons.musitron.play("lost",false);
			this.switchState("stopped");
			setTimeout(MG.flow.gotoPage.bind(MG.flow),10000,"menu");
		break;
		case "win":
		case "won":
	//		MG.trons.musitron.stop("game");		
	//		MG.trons.musitron.play("rest");		
	//		MG.trons.musitron.play("win",false);
			this.switchState("stopped");
		break;
		default:
			console.log("unknown game Engine Event."+e.type);
	}
};
Engine.prototype.checkCollisions=function()
{
	var os=this.objects;
	var o1,o2,i,j;
	for(i=0;i<os.length;i++)
	{
		o1=os[i];
		for(j=0;j<os.length;j++)
		{
			if(i!=j)
			{
				o2=os[j];
				if(o1.collisions[o2.type])
				{
					MG.game.collisions.check(o1,o2);
				}
			}
		}
	}
};
Engine.prototype.drawObjects=function(ctx)
{
	var os=this.objects,i,o;
	//console.log("drawObjects :"+this.objects.length);
	for(i=0;i<os.length;i++)
	{
		o=os[i];
		o.draw(ctx);
	}
};

Engine.prototype.checkWinAndLoose=function ()
{
}
var ts=0;
Engine.prototype.setOutputCanvas=function(c)
{
	this.canvas=c;
}
Engine.prototype.clearBackground=function(ctx)
{
	ctx.fillStyle="#00f";
	ctx.fillRect(0,0,MG.game.viewport.w,MG.game.viewport.h);
}

Engine.prototype.continueLoop=function()
{
	if(MG.game.pause!=true)
		window.requestAnimationFrame(this.loop.bind(this));
}	
	
Engine.prototype.clearAll=function()
{	
	this.objects=[];
//	MG.trons.musitron.stopAll();		
	this.freeze_counter=3; // we will show what's coming in the level just a bit.
	this.end_counter=20;
	this.state="pauzed";
	MG.game.pause=true;
	
};

Engine.prototype.loadLevel=function(nr)
{
	var level_data=MG.game.levels.getData(nr);
	console.log("loaded level_data "+nr+":"+JSON.stringify(level_data));
	MG.game.tilemap=new MG.game.TileMap(); // now we can get two tilemaps if we want..
	MG.game.tilemap.init(level_data); // deze returned nog niks..
	
	MG.game.camera1=new MG.game.Camera(); // now we can get two camera's if we want.
	MG.game.camera2=new MG.game.Camera(); // now we can get two camera's if we want.
	MG.game.camera=MG.game.camera1; // active camera.
	MG.game.camera1.init(MG.game.tilemap.w*MG.game.tilemap.tileSize.w,MG.game.tilemap.h*MG.game.tilemap.tileSize.h,MG.game.viewport.w,MG.game.viewport.h);
	MG.game.camera2.init(MG.game.tilemap.w*MG.game.tilemap.tileSize.w,MG.game.tilemap.h*MG.game.tilemap.tileSize.h,MG.game.viewport.w,MG.game.viewport.h);
	MG.game.camera1.setPos(0,0); 
	MG.game.camera2.setPos(0,0); 
	
	// player set to initial position..
	MG.game.hero1=new MG.game.objects.Hero(1);
	MG.game.hero2=new MG.game.objects.Hero(2);
	MG.game.hero=MG.game.hero1; // this one has control!
	this.spawnObject(MG.game.hero1,MG.game.viewport.w/3,MG.game.viewport.h/2);
	this.spawnObject(MG.game.hero2,MG.game.viewport.w/3,MG.game.viewport.h/2);
//	this.spawnObject(MG.game.hero,1113,1145);

	// spawn everything that needs to be spawned..
}
Engine.prototype.moveCameraToHero=function ()
{
	var px=MG.game.hero.x-MG.game.camera.viewport.width/2;
	var py=MG.game.hero.y-MG.game.camera.viewport.height/2;
	// now shift the viewpoint a little towards the way the hero is moving!
	px+=MG.game.hero.dx*40;
	py+=MG.game.hero.dy*40;
	MG.game.camera.moveToPoint(px,py);
}
Engine.prototype.loop=function ()
{
	
	this.counter++;
	this.stateCounter++;
	var ctx=this.canvas.getContext("2d");
	
	// we need to clear the background, before we start shifting the camera around!
	this.clearBackground(ctx);
	
	// shift the canvas to the camera position!
	// so we can just draw everything on it's normal position!
	ctx.save();
	ctx.translate(-MG.game.camera.x,-MG.game.camera.y);
	
	// end of camera stuff.
	switch(this.state)
	{
		case "frozen":
			console.log("frozen: "+this.freeze_counter);
			this.freeze_counter--;
			if(this.freeze_counter<=0) 
			{
				console.log("switching to playing");
				this.switchState("playing");
			}
			
			MG.game.tilemap.draw(ctx,MG.game.camera); // let the tilemap draw itself for the sake of debugging..
			this.drawObjects(ctx);
			this.continueLoop(); // next FRAME
		break;
		case "playing":
				this.startPerformanceCheck("moveCameraToHero"); 
				this.moveCameraToHero()
				this.endPerformanceCheck("moveCameraToHero"); // from loop to loop..
				this.startPerformanceCheck("moveObjects"); 
				this.moveObjects();
				this.endPerformanceCheck("moveObjects"); // from loop to loop..
				this.startPerformanceCheck("checkCollisions"); 
				this.checkCollisions();
				this.endPerformanceCheck("checkCollisions"); // from loop to loop..
				this.startPerformanceCheck("clearBackground"); 
				this.clearBackground(ctx);
				this.endPerformanceCheck("clearBackground"); // from loop to loop..
				this.startPerformanceCheck("drawTilemap"); 
				MG.game.tilemap.draw(ctx,MG.game.camera); // let the grid draw itself
				this.endPerformanceCheck("drawTilemap"); // from loop to loop..
				this.startPerformanceCheck("drawObjects"); 
				this.drawObjects(ctx);
				this.endPerformanceCheck("drawObjects"); // from loop to loop..
				this.startPerformanceCheck("particles"); 
				MG.game.particles.draw(ctx);
				this.endPerformanceCheck("particles"); // from loop to loop..
				this.checkWinAndLoose();
				if(this.ended)
				{
					this.end_counter--;
					if(this.end_counter<=0)
					{	
						if(this.won==true)
							this.event({type:"win"});
						else
							this.event({type:"lost"});
					}
				}
				
			this.continueLoop(); // next FRAME
		break;
		default:
			console.log("sorry unknown game state in loop: "+this.state+" quitting game Loop");
	}
	
//	MG.sprites.draw(ctx,"logo","small",logo_x,7,0,);

	//ctx.drawImage(MG.game.hud.canvas,0,0); // show the hud!
	//ctx.fillText(MG.game.ship1.hits,20,10);
	//ctx.fillText(MG.game.ship2.hits,500,10);
	
	ctx.restore(); // restore the canvas from the camera shift.
	
	// now draw any hud stuff.
	
	if(1) // performance testing
	{
		var all;
		var i=0;
		var now=this.getTimeStamp();
		var dt=now-ts;
		ts=now;
		var fps=Math.round(1000/dt)+" fps";
		var y=5;
		MG.trons.fontron.writeOnContext(ctx,20,y,"def","fps",1,2);
		MG.trons.fontron.writeOnContext(ctx,100,y,"def",fps,1,2);
		for(all in this.performanceChecks)
		{
			// show performance report..
			i++;
			MG.trons.fontron.writeOnContext(ctx,20,y+i*8,"def",all,1,2);
			var dt=Math.round(this.performanceChecks[all].last[0]*100)/100;
			MG.trons.fontron.writeOnContext(ctx,100,y+i*8,"def",dt+"ms",1,2);
		}
	}


};




	MG.extend(MG,"game");
	MG.game.engine=new Engine();

})();