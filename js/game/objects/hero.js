'use strict';
(function (){
		
	
function Hero(nr) // constuctor!
{
	this.desc="Hero";
	this.x=100;  
	this.y=64;
	this.w=28;
	this.h=35;
	this.nr=nr;
	this.w2=this.w/2; // we need these a lot, so let's just calculate those upfront..
	this.h2=this.h/2; // 
	this.controlled=true;
	this.onGround=false;
	// subscribe to collisions, they will arrive in events.
	this.collisions={};
	this.collisions["hitTile"]=true; // hit walls.
	this.collisions["overTile"]=true; // get coins and stuff, switch to water mode, that kind of thing.
	this.state="normal"; // is you Don't know where you are, falling is a good one to start.. it will find ground under you if it is there.
	this.counter=0;
}
Hero.inheritsFrom(MG.game.objects.DefaultObject);

Hero.prototype.draw=function(ctx)
{
	ctx.fillStyle="#fff";
	ctx.beginPath();
		ctx.arc(this.x,this.y,10,0,Math.PI*2);
	ctx.fill();
	ctx.strokeStyle="#0f0";
	// draw hitShape..
	this.showHitShape(ctx);
};

Hero.prototype.behaviour=function()
{
	if(MG.game.controller!=this.nr) return; // no behaviour if NOT in control.
	this.clearEventStack();
	// get the users' intentions..
	if(this.controlled)
	{
		this.ddx=0;
		this.ddy=0;
		if(this.nr==1)
		{
			if(MG.input.keys.keys[39].d) this.ddx=1;
			if(MG.input.keys.keys[40].d) this.ddy=1;
			if(MG.input.keys.keys[37].d) this.ddx=-1;
			if(MG.input.keys.keys[38].d) this.ddy=-1;
			if(MG.input.keys.keys[32].d) this.wants_to_jump=true;
			else this.wants_to_jump=false;
		}
		else
		{
			if(MG.input.keys.keys[68].d) this.ddx=1;
			if(MG.input.keys.keys[87].d) this.ddy=1;
			if(MG.input.keys.keys[65].d) this.ddx=-1;
			if(MG.input.keys.keys[83].d) this.ddy=-1;
			if(MG.input.keys.keys[16].d) this.wants_to_jump=true;
			else this.wants_to_jump=false;
		}
	}
	/*this.counter++;
	if(this.counter<55)
	{
		this.ddx=1;// move right automatically for debugging.
	}else{
		if(this.counter>105)
		{
			this.ddx=-1;// move right automatically for debugging.
		}
		if(this.counter==125)
		{
			console.log("what a moment to debug.");
		}
	}*/
	//
	
	// touch all blocks you are OVER, this might change your state, like a ladder or water..
	this.interactWithTilemap(MG.game.tilemap);
	switch(this.state)
	{
		case "normal":
			this.dy+=0.2; // gravity
			// effect what the player wants even though we are in the air!
			// check if we have hit the ground?
			if(this.onGround)
			{
				this.dx+=this.ddx*0.3; // run forrest run..
				this.dx*=0.95; // airfriction
				this.dy*=0.99;
				if(this.wants_to_jump)
				{
					this.dy-=7;
					if(Math.abs(this.dx)>0.1)
					{
						this.dy-=1; // little bonus for if you walk at all.
					}
					if(Math.abs(this.dx)>0.2)
					{
						this.dy-=1; // little bonus for if you walk rather fast.
					}
				}
			}else{
				this.dx+=this.ddx*0.2;
				//this.dy+=this.ddy*0.05; // jump higher if you go up.. bit strange.
				this.dx*=0.95; // airfriction
				this.dy*=0.99;
			}
			if(this.inWater)
			{
				this.dy-=0.13;//, hardly any gravity.
				this.dy+=this.ddy*0.2; // make him swim up if he wants
				this.dx*=0.93;
				this.dy*=0.93; // but it's hard to get any speed going.
			}
		break;
		default:
			console.log("hero in state: "+this.state);
	}
	// we might want to write something for this in the default object.
	// this is proving the difficult part, when the object is not exactly the size of a tile.
	
	this.onGround=false;// check if when we move, the onGround gets set by an event..
	this.inWater=false;// check if we are in water, by touching the right tile..
	this.moveObject(MG.game.tilemap); // sets the dx, dy for as much as possible because of the tilegrid!
};
Hero.prototype.event=function(e)
{
	
	switch(e.type)
	{
		case "spawn":
			console.log("Hero spawned at: "+this.x+","+this.y);
		break;
		case "hitTile": // we just touched a solid tile!
			if(e.impact=="down")
			{
				this.onGround=true;
			}
		break;
		case "overTile": // we grabbed something from a tile.
			switch(e.activator.overEvent)
			{
				case "coin":
					// we could add points here.
					console.log("add points to hero");
				break;
				case "water":
					//this.inWater=true; // is done in tileEvents also..
				break;
				default:
					console.log("unknown activator.overEvent: "+e.activator.overEvent+" on Hero");
			}
		break;
		case "despawn":
		break;
		default:
			console.log("no hanlder for even of type "+e.type+" on Hero");
		}
	};

	MG.extend(MG,"game");
	MG.extend(MG.game,"objects");
	MG.game.objects.Hero=Hero;

})();
