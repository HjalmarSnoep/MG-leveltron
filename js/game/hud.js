'use strict';

(function (){
		
function Hud()
{
}
Hud.prototype.reset=function()
{
	this.lives=MG.game.levelData.extra_ships;
	this.player0_call=false;
	this.player1_call=false;
	
	if(!this.canvas) this.canvas=MG.lib.createCanvas("hud_canvas",640,40);
	this.ctx=this.canvas.getContext("2d");
	this.refresh();
};
Hud.prototype.padNumber=function(nr)
{
	nr=""+nr;
	while(nr.length<5) nr="0"+nr;
	return nr;
}
Hud.prototype.refresh=function()
{
	console.log("hud, refreshed");
	
	MG.sprites.draw(this.ctx,"hud","back",0,0,1,0,320,1);// scale it quite a bit.
	MG.sprites.draw(this.ctx,"hud","back",0,0,0);
	MG.sprites.draw(this.ctx,"hud","back",MG.game.room.w-2,0,2);
	
	this.ctx.fillStyle="#000";
	this.ctx.textAlign="right";
	this.ctx.font="18px 'munro_smallregular'";
	
	// write the score..
	var score=this.padNumber(MG.game.results.score)
	var x=MG.game.room.w-score.length*12-12;
	for(var i=0;i<score.length;i++)
	{
		var map=MG.sprites.getFontMap("fonts","mainframe_12");
		if(typeof(map)!="undefined")
		{
			var f=map.indexOf(score.charAt(i));
			if(f!=-1)
			{
				MG.sprites.draw(this.ctx,"fonts","mainframe_12",x+i*12,23,f);
			}
		}
	}
	var score="SCORE:";
	x=x-score.length*10;
	for(var i=0;i<score.length;i++)
	{
		var map=MG.sprites.getFontMap("fonts","mainframe_10");
		if(typeof(map)!="undefined")
		{
			var f=map.indexOf(score.charAt(i));
			if(f!=-1)
			{
				MG.sprites.draw(this.ctx,"fonts","mainframe_10",x+i*10,23,f);
			}
		}
	}
	
	
	for(var i=0;i<this.lives;i++) 
		MG.sprites.draw(this.ctx,"hud","ship",20+40*i,0,0);
	
	var start_humans=Math.floor(640-MG.game.people.length*22)/2;
	for(var i=1;i<=MG.game.people.length;i++) 
	{
		var x=start_humans+22*i;
		if(i<=MG.game.results.humans_total)
		{
			// these are alive
			if(Math.floor(MG.game.results.humans+0.5)>=i)
			{
				// these are free
				if(MG.game.results.humans%1==0.5 && Math.floor(MG.game.results.humans)<i)
				{
					MG.sprites.draw(this.ctx,"hud","man",x,0,1);
				}else{
					MG.sprites.draw(this.ctx,"hud","man",x,0,0);
				}
			}else{
				// these are saved
				if(MG.game.results.humans%1==0.5)
				{
			//		MG.sprites.draw(this.ctx,"hud","man",x,0,1);
					MG.sprites.draw(this.ctx,"hud","man",x,0,2); // burning half..
				}else{
					MG.sprites.draw(this.ctx,"hud","man",x,0,2); // burning half..
				}
			}
		}else{
			// these are dead.
			MG.sprites.draw(this.ctx,"hud","man",x,0,3);
		}
		// these are needed.
		if(i<=MG.game.levelData.humans_needed)
		{
			
			if(i==MG.game.levelData.humans_needed)
			{
				MG.sprites.draw(this.ctx,"hud","needed",x,0,2);
			}else{
				MG.sprites.draw(this.ctx,"hud","needed",x,0,1);
			}
			if(i==1)
				MG.sprites.draw(this.ctx,"hud","needed",x,0,0);
		}
	}
	if(MG.game.results.humans>=MG.game.levelData.humans_needed)
	{
		MG.game.engine.event({type:"won"}); // change music..
	}
	
	// draw Cow!
	//this.cow_points..
	console.log("nr of cowpoints: "+MG.game.cow_points);
	var x=150;
	MG.sprites.draw(this.ctx,"hud","cow",x,0,0);
	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.rect(x,36-Math.floor(32*MG.game.cow_points/100),100,100);
	this.ctx.clip();
	MG.sprites.draw(this.ctx,"hud","cow",x,0,1);
	this.ctx.restore();
};
Hud.prototype.callShip=function(callee)
{
	if(this.lives>0)
	{
		if(callee.player==0 && this.player0_call==false)
		{
			this.player0_call=new MG.game.objects.Ship(); // contains ALL methods and some data..
			this.player0_call.player=callee.player;
			this.player0_call.controlled_by_player=false;
			this.lives--;
			MG.game.engine.spawnObject(this.player0_call,20+40*(this.lives-1),20);
			this.refresh();
			return this.player0_call;
		}
		if(callee.player==1 && this.player1_call==false)
		{
			this.player1_call=new MG.game.objects.Ship(); // contains ALL methods and some data..
			this.player1_call.player=callee.player;
			this.player1_call.controlled_by_player=false;
			MG.game.engine.spawnObject(this.player1_call,20+40*(this.lives-1),20);
			this.lives--;
			this.refresh();
			return this.player1_call;
		}	
	}
	return null;
}
MG.extend(MG,"game");
MG.game.hud=new Hud();

})();