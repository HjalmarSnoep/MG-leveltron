/*!
* MG.lib.js
* handles all loading of all assets and stores them as HTML elements, so a image is ready to use
* sound ready to play. (For sound you need the music of sfx component as well)
* Also used for storing generated assets, like buttons, so you won't have to generate again.
*/

'use strict';

(function (){

var data_urls={};
// the lib should not actually contain anything, when it starts up.

// but for a quick cheat during development something like this can be handy..
var data_urls=
{
};	


function Lib()
{
	this.images={};
	this.style = document.createElement("style");
	this.style.id="lib_stylesheet";
	document.head.appendChild(this.style); // header is there, as we are actually doing stuff.
	this.style.innerHTML="#lib,#debug{font-family: sans-serif;}"
};

/*
*
* MG.lib.open is what you call to show the lib and all it's contents for debug purposes.
*
*/
Lib.prototype.open=function()
{
	var lib=document.getElementById("lib");
	if(lib.style.display!="block")
	{
		lib.style.display="block";
		// also add an eventlistener to the close button!
		document.getElementById("close_library").addEventListener("click",MG.lib.close);
	}else{
		// but you can also just click twice..
		MG.lib.close();
	}
}
/*
*
* MG.lib.open is what you call to hide the lib .
*
*/
Lib.prototype.close=function()
{
	document.getElementById("lib").style.display="none";
}
/*
*
* MG.lib.createCanvas returns a canvas reference for an id..
* creates a canvas in the lib with a specific id 
* OR 
* gets you a reference to this canvas if one was previously created.
*
*/
Lib.prototype.createCanvas=function(name,w,h)
{
	var el=document.getElementById("lib_canvas_"+name);
	if(el==null)
	{
		el=document.createElement("canvas");
		el.id="lib_canvas_"+name;
		lib=document.getElementById("lib");
		lib.appendChild(el);
	}
	el.width=w;
	el.height=h;
	if(MG.options.retro==true)
	{
		el.style.imageRendering="optimizeSpeed";
		el.style.imageRendering="-moz-crisp-edges";
		el.style.imageRendering="-webkit-optimize-contrast";
		el.style.imageRendering="optimize-contrast";
		el.style.imageRendering="pixelated";
		el.style.msInterpolationMode="nearest-neighbor";
	}	
	
	var ctx=el.getContext("2d");
	ctx.clearRect(0,0,w,h); // clear it!
	if(MG.options.retro==true)
	{
		ctx.imageSmoothingEnabled = false;
	}
	return el;
}

Lib.prototype.getCanvas=function(name)
{
	var el=document.getElementById("lib_canvas_"+name);
	if(el!=null)
		return el;
	else
	{
		throw new Error("no canvas by name: "+name+" in lib.");
		return null;
	}
}
/*
*
* MG.lib.addImage adds a data url as img. Online you can also use 'normal' urls.
*
*/
Lib.prototype.addImage=function(name,data)
{
	data_urls[name]=data;
}
Lib.prototype.readDataURLs=function()
{
	var all,du,lib;
	lib=document.getElementById("lib");
	for(all in data_urls)
	{
		du=data_urls[all];
		this.images[all]=document.createElement("img");
		this.images[all].src=du;
		this.images[all].id="img_id_in_lib_"+all;
		lib.appendChild(this.images[all]);
	}
}
MG.lib=new Lib();

})();

