/*!
* MGContainer.js
* Visit http://www.makinggames.org/ for updates
*
* Copyright (c) 2017 www.snoep.at
*
* THE SOFTWARE IS PROVIDED "AS IS", AS PART OF THE 
* MAKING GAMES WORKSHOP "DE GAME VAN .. " WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';

var MG={};// only global Property, our namespace!
//MG.debug=true; // debug mode set by including bugtron.js in your html!
MG.onload=[];// functions that need to be executed..
MG.options={};
MG.options.retro=false; // setting this to true, will stop automatic antialiasing.
MG.options.music=true;
MG.options.sfx=true;

// extend the default function object to enable inheritance.
Function.prototype.inheritsFrom = function( parentClassOrObject )
{ 
	if(typeof(parentClassOrObject)=="undefined")
	{
		throw new Error(this.name +" is trying to inherit from a undefined Class");
		return;
	}
//	console.log(this.name +" inherits from: "+ parentClassOrObject);
	if ( parentClassOrObject.constructor == Function ) 
	{ 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
	} 
	else 
	{ 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	return this;
} ;

window.addEventListener("load",function()
{ 
	// self invoking function, that waits until the page is loaded.
	// basically your init or main function. ENTRYPOINT!
	// here we create THE page of the container!
	
	var str="";
	// if debug is on, we need to put some extra stuff in..
	if(MG.debug) str=MG.trons.bugtron.insertDebug();
	
    document.body.innerHTML='<div id="container"><div id="container_back"></div></div><!-- library -->'+str+'<div id="lib">Library<div id="close_library" class="close_button">X</div><hr></div>';

	// it's been created, we can now configure the debug stuff (if at all present!)
  	if(MG.debug) MG.trons.bugtron.setupDebug();  
	
	// We create a default stylesheet from the container.
	var style = document.createElement("style");
	var str='';
	str+='html,body{';
	str+=' height: 100%;';
	str+=' margin: 0;';
	str+=' padding: 0;';
	str+='}';
	str+='#lib{';
	str+=' display: none;';
	str+=' z-index: 13;';
	str+=' width: 800px;';
	str+=' position: fixed;';
	str+=' padding: 5px;';
	str+=' top: 45px;';
	str+=' left: 15px;';
	str+=' background-color: rgba(150,100,200,0.3);';
	str+=' color: #fff;';
	str+=' padding: 4px;';
	str+=' height: 600px;';
	str+=' overflow: scroll';
	str+='}';
	str+='#debug{';
	str+=' z-index: 99;';
	str+=' position: fixed;';
	str+=' padding: 5px;';
	str+=' top: 5px;';
	str+=' left: 5px;';
	str+=' background-color: rgba(150,100,200,0.3);';
	str+='}';
	
	// this is for debugging json
	str+='pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }';
	str+='.string { color: #1d5624; }';
	str+='.number { color: #726656; }';
	str+='.boolean { color: #2d406e; }';
	str+='.null { color: magenta; }';
	str+='.key { color: #89272c; }';
	
	
	str+='.close_button';
	str+='{';
	str+=' padding: 3px 5px;';
	str+=' float: right; background-color: #ccc;';
	str+='}';
	str+='.close_button:hover{background-color: #ddd;}';
	str+='#lib > *{';
	str+='border: 1px solid #aaa;';
	str+='}';
	str+='#container_back{';
	str+=' width: 100%; height: 100%;';
	str+=' position: fixed;';
	str+=' top: 0px;';
	str+=' left: 0px;';
	str+='}';
	str+='#container{';
	str+=' position: fixed;';
	str+=' top: 0px;';
	str+=' left: 0px;';
	str+=' width: 100%; height: 100%; background: #252627;';
	str+=' background: -moz-linear-gradient(top, #252627 1%, #27282a 50%, #2d2d2e 100%);';/* FF3.6-15 */
	str+=' background: -webkit-linear-gradient(top, #252627 1%,#27282a 50%,#2d2d2e 100%);'; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	str+=' background: linear-gradient(to bottom, #252627 1%,#27282a 50%,#2d2d2e 100%); '; /* Chrome10-25,Safari5.1-6 */
	str+=' filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#252627", endColorstr="#2d2d2e",GradientType=0 );  '; /* IE6-9 */
	str+=' background-repeat: no-repeat;'; 
	str+=' background-attachment: fixed;'; 
	str+='}';
	style.appendChild(document.createTextNode(str));
	document.head.appendChild(style);
	
	
	
	// initialise libs if you have them and if they need initialisation.
	for(all in MG.startup)
	{
		
	}
	// plugin-inits that have to happen FIRST and in this order..
	// read the images..
	if(MG.lib)
		MG.lib.readDataURLs();
	
	// init the sprites from these images.
	if(MG.sprites)
		MG.sprites.initMaps();
	
	// other plug-ins like the mouse
	// can now be added with the addOnLoad functionality, see mouse.js for more infor.
	
	
	// do the thing the user asked you..
	MG.continueLoad("initial");
	
});
MG.addOnLoad=function(name,cb)
{
	MG.onload.push({name:name,cb:cb});
};

MG.continueLoad=function(comment)
{ 
//	console.log("from "+comment);
	if(MG.onload.length!=0)
	{
		var cb=MG.onload.shift();
		console.log("calling '"+cb.name+"' init function");
		cb.cb();
	}else{
		console.log("Done with daisychaining onloads");
	}
};


// define MG.extend
(function (){
	MG.extend=function(obj,str)
	{
		//console.log("extending "+str);
		if(typeof(obj[str])=="undefined")
		{
			//console.log("created empty object");
			obj[str]={};
		}
	};

})();
