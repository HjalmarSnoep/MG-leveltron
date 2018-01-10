/*!
* ContextMenu.js
* plugin for MGContainer
* prevents the use of the right mouse button in production, don't use in debug..
*/

'use strict';

(function (){

function ContextMenu()
{
	MG.addOnLoad("ContextMenu",this.init.bind(this)); // this will be executed when the container is ready with loading..
};

ContextMenu.prototype.init=function(el)
{
	var back=document.getElementById("container");
	back.addEventListener("contextmenu",this.clickHandler.bind(this));
	MG.continueLoad("ContextMenu");// we need to tell the container to continue with the addOnLoad Stack.
}
ContextMenu.prototype.clickHandler=function (e)
{
	if(e.preventDefault) e.preventDefault(); // this means right click doesn't work.
}
MG.extend(MG,"input");
MG.input.context_menu=new ContextMenu();


	
	})();
