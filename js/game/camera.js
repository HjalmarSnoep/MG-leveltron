'use strict';

(function (){
		
	function Camera()
	{
		this.x=0;
		this.y=0;
		
		this.max_x=0;
		this.max_y=0;
		this.min_x=-500;
		this.min_y=-500;

		// keep a viewport for this camera, that's handy..
		this.viewport={};
		this.viewport.width=100;
		this.viewport.height=100;
		console.log("created Camera");
	}

	Camera.prototype.init=function(level_w,level_h,viewport_w,viewport_h)
	{
		this.max_x=0; // anything more and we shift outside the room.
		this.max_y=0;
		this.viewport.width=viewport_w;
		this.viewport.height=viewport_h;
		
		this.min_x=-level_w+viewport_w;
		this.min_y=-level_h+viewport_h;
		if(this.min_x>0) this.min_x=0;
		if(this.min_y>0) this.min_y=0;
	};
	Camera.prototype.setPos=function(x,y)
	{
		this.x=x;
		this.y=y;
	};
	Camera.prototype.moveToPoint=function (px,py)
	{
		// we might wait, until we can almost not see this point..
		this.x=this.x*0.97+0.03*px;
		this.y=this.y*0.97+0.03*py;
		// clamp the camera..
		if(this.x<this.max_x) this.x=this.max_x;
		if(this.y<this.max_y) this.y=this.max_y;
		if(this.x<0) this.x=0;
		if(this.y<0) this.y=0;
		
	}
	
	MG.extend(MG,"game");
	MG.game.Camera=Camera;

})();