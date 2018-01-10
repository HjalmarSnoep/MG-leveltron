/*!
* mouse.js
* plugin for MGContainer
*/

'use strict';

(function (){

function Mouse()
{

	// set up mouse interaction
	this.x=0;
	this.y=0;
	this.down=false;
	this.preventDefault=true;
	MG.addOnLoad("Mouse",this.init.bind(this)); // this will be executed when the container is ready with loading..

};

Mouse.prototype.init=function()
{
	var back=document.getElementById("container"); // this has been created by container, because we put init in the addOnLoad stack!
	back.addEventListener("click",this.clickHandler.bind(this));
	back.addEventListener("drag",this.mouseHandler.bind(this));
	back.addEventListener("pointermove",this.mouseHandler.bind(this));
	MG.continueLoad("Mouse");// we need to tell the container to continue with the addOnLoad Stack.
}
Mouse.prototype.getMousePos=function (e)
{
	if(MG.flow.currentPage==null) return;
	var page=MG.flow.pages[MG.flow.currentPage];
	var offsetLeft=(MG.screen.real_w-(page.w*page.f))/2;
	var offsetTop=(MG.screen.real_h-(page.h*page.f))/2;
	this.x=(e.clientX-offsetLeft)/page.f;//e.currentTarget.offsetLeft;
	this.y=(e.clientY-offsetTop)/page.f;//e.currentTarget.offsetTop;
	
}
Mouse.prototype.clickHandler=function (e)
{
	this.getMousePos(e);
	if(typeof(this.click)!="undefined") 
	{
		this.click();
		if(e.preventDefault && this.preventDefault) e.preventDefault(); 
	}
		
}
Mouse.prototype.dontPreventDefault=function()
{
	this.preventDefault=false;
}
Mouse.prototype.mouseHandler=function (e)
{
	this.getMousePos(e);
	if(e.preventDefault && this.preventDefault) e.preventDefault(); 
}

MG.extend(MG,"input");
MG.input.mouse=new Mouse();


	
	})();
