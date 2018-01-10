'use strict';

(function (){
		
function Collisions()
{
	this.list=[];
	this.round_id=0;
}

Collisions.prototype.resolve=function()
{
	this.list=[];
	this.round_id++;
}
Collisions.prototype.check=function(o1,o2)
{
	if(typeof(o1.hitShape)=="undefined") console.log(o1.type+" has no hitShape");
	if(typeof(o2.hitShape)=="undefined") console.log(o2.type+" has no hitShape");
	if(o1.hitShape.s=="round" && o2.hitShape.s=="round")
	{
		return this.round(o1,o2);
	}
	if(o1.hitShape.s=="rect" && o2.hitShape.s=="rect")
	{
		return this.rect(o1,o2);
	}
		
};

Collisions.prototype.rect=function(o1,o2)
{
	o1.hw=o1.w/2;
	o1.hh=o1.h/2;
	o2.hw=o2.w/2;
	o2.hh=o2.h/2;
	o1.left=o1.x-o1.hw;
	o1.right=o1.x+o1.hw;
	o1.top=o1.y-o1.hh;
	o1.bottom=o1.y+o1.hh;
	o2.left=o2.x-o2.hw;
	o2.right=o2.x+o2.hw;
	o2.top=o2.y-o2.hh;
	o2.bottom=o2.y+o2.hh;
	if( !(o2.left > o1.right || 
           o2.right < o1.left || 
           o2.top > o1.bottom ||
           o2.bottom < o1.top))
	{
		var point={x:(o1.x+o2.x)/2,y:(o1.y+o2.y)/2};
		// reciprocal event generation.
		o1.event({type:"collision",who:o2,how:"",x:point.x,y:point.y});
		o2.event({type:"collision",who:o1,how:"",x:point.x,y:point.y});
		this.list.push({o1:o1,o2:o2,p:point});
	}
}
Collisions.prototype.round=function(o1,o2)
{
	var dx=o1.x-o2.x;
	var dy=o1.y-o2.y;
	var len=Math.sqrt(dx*dx+dy*dy);
	if(len<(o1.hitShape.r+o2.hitShape.r))
	{
		var point={x:(o1.x+o2.x)/2,y:(o1.y+o2.y)/2};
		// reciprocal event generation.
		o1.event({type:"collision",who:o2,how:"",x:point.x,y:point.y});
		o2.event({type:"collision",who:o1,how:"",x:point.x,y:point.y});
		this.list.push({o1:o1,o2:o2,p:point});
	}
}

MG.extend(MG,"game");
MG.game.collisions=new Collisions();

})();