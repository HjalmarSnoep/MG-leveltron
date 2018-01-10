'use strict';

(function (){
		
function Viewport()
{
	this.x=0;
	this.y=40;
	this.w=640;
	this.h=480;
	this.type="Viewport";
}
Viewport.prototype.setDimensions=function(w,h)
{
	console.log("set Viewport Dimensions "+w+","+h);
	this.w=w;
	this.h=h;
};


MG.extend(MG,"game");
MG.game.viewport=new Viewport(); 
MG.game.viewport1=new Viewport(); // the two viewports!
MG.game.viewport2=new Viewport();

})();