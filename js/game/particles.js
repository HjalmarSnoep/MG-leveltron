/*!
* Particles.js
* Particles are game Objects are like static object except that the do NOT react to any other objects AND move around.
* They typically have a limited life span.

* plugin for MGContainer
*/

'use strict';

(function (){
		
function Particles()
{
	this.particles=[];
}

Particles.prototype.create=function(kind,x,y,d)
{
	// d = type dependent data
	var o={kind:kind,x:x,y:y,r:0,dr:0,dx:0,dy:0,f:0,l:15,remove:false}; // normal lifetime
	switch(o.kind)
	{
		case "landing":
			o.dx=0;
			o.dy=0;
			o.l=15;
		break;		
		case "pixel":
			o.dx+=(Math.random()-0.5)*5;
			o.dy+=(Math.random()-0.5)*5;
			o.c=d;
		break;		
		case "checking":
			o.dx=0;
			o.dy=0;
			o.c=d;
			o.l=120;
		break;		
		default: 
			console.log("no idea how to create the particle of type: "+o.kind);
	}
	if(o.remove==false)
		this.particles.push(o);
}
Particles.prototype.createExplosion=function(kind,x,y,d)
{
	var i;
	for(i=0;i<d.nr;i++)
	{
		var r=Math.floor(Math.random()*d.cols.length);
		console.log("create particle explosion at: "+x+","+y);
		this.create(kind,x,y,d.cols[r]);
	}
}

Particles.prototype.draw=function(ctx)
{
	var i=0;
	for(i=this.particles.length-1;i>=0;i--)
	{
		var o=this.particles[i];
		o.x+=o.dx;
		o.y+=o.dy;
		switch(o.kind)
		{
			case "checking":
			case "pixel":
				ctx.fillStyle=o.c;
				ctx.fillRect(Math.floor(o.x)-1,Math.floor(o.y)-1,3,3);
			break;
			case "landing":
				ctx.strokeStyle="rgba(255,255,255,0.2)";
				ctx.beginPath()
				ctx.arc(o.x,o.y,o.l+5,0,Math.PI*2);
				ctx.stroke();
			break;				
		}
		o.l--;
		if(o.l<=0) this.particles.splice(i,1); // die particle!
	}
}

MG.extend(MG,"game");
MG.game.particles=new Particles();

})();