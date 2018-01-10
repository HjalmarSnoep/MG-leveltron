/*
The Bugtron Object, to inspect the game and gameobjects at runtime

*/
'use strict';

(function (){

	function Bugtron()
	{
		MG.debug=true;// let the container know to actually CALL the beneath insertDebug and setupDebug functions..
		this.inspectWindow=document.createElement("div");
		this.inspectWindow.style.cssText="display: block; background-color: rgba(255,255,255,0.7); border:1px solid #000; padding: 4px; z-index: 150; width: 350px; top:0px; left: 0px; height: 100%; position: fixed; overflow: scroll;";
	}
	// called by the container if debug = true!
	Bugtron.prototype.insertDebug=function()
	{
		return '<div id="debug"><div onClick="MG.trons.bugtron.pause()">Pause</div><div onClick="MG.trons.bugtron.inspect()">Inspect</div> <div onClick="MG.trons.bugtron.openLib()">Lib</div></div>';
	}
	// called by the container if debug = true!
	Bugtron.prototype.setupDebug=function()
	{
		console.log("setting up debug..");
		// activate the debugmenu out..
//		var d=document.getElementById("debug");
//		d.style.cursor="pointer";
//		d.addEventListener("click",MG.trons.bugtron.openDebug);
	}
	
	Bugtron.prototype.pause=function()
	{
		
		if(MG.game.pause!=true)
		{
			console.log("game paused");
			MG.game.pause=true;
			if(MG.flow.currentPage!="game_page")
			{
				console.log("not on gamepage, prepausing game");
			}else{
				MG.game.engine.event("pause");
			}
		}else{
			MG.game.pause=false;
			if(MG.flow.currentPage!="game_page")
			{
				console.log("not on gamepage, unpaused game!");
			}else
			{
				MG.game.engine.event("playing");
				MG.game.engine.loop(); // restart..
			}
		}
	};
	Bugtron.prototype.inspect=function()
	{
		if(MG.flow.currentPage!="game_page")
		{
			console.log("not on gamepage, cannot inspect");
			return;
		}
		var inspect=document.getElementById("BugTron-inspectlayer");
		if(inspect==null)
		{
			inspect=document.createElement("div");
			// build up an inspect layer, mirroring the gameObjects and particles.
			document.body.appendChild(inspect);
			inspect.style.zIndex=80;
			inspect.id="BugTron-inspectlayer";
			inspect.style.position="relative";
			inspect.style.position="fixed";
			inspect.style.top="0px";
			inspect.style.left="0px";
			inspect.style.right="0px";
			inspect.style.bottom="0px";
			inspect.style.backgroundColor="rgba(0,0,0,0.25)";
			MG.game.pause=true;
			// create a game room which mirrors the style props of game exactly.
			var gamepage=document.getElementById("pages_game_page"); // we could also ask Flow for it, but this seems to be the only time we need this..
			var inspectLayer=document.createElement("sector");
			console.log(gamepage.style.cssText);
			inspectLayer.style.cssText=gamepage.style.cssText;
			inspectLayer.style.backgroundColor='transparent';
			inspectLayer.id="inspectLayer";
			inspect.appendChild(inspectLayer);
			// create the objects as little clicakble boxes..
			var i;
			for(i=0;i<MG.game.engine.objects.length;i++)
			{
				var o=MG.game.engine.objects[i];
				var div=document.createElement("div");
				div.style.border="1px solid rgba(255,255,255,0.5)";
				div.style.backgroundColor="rgba(0,0,0,0.5)";
				div.style.position="absolute";
				div.style.left=(o.x-o.w/2)+"px";
				div.style.top=(o.y-o.h/2)+"px";
				div.style.width=o.w+"px";
				div.style.height=o.h+"px";
				div.style.fontSize ="5px";
				div.style.color="#fff";
				div.innerHTML=o.type+"_"+i;
				div.id=o.type+"_"+i;
				div.setAttribute("ObjectNr",i);
				div.addEventListener("click",this.showObjectDetails.bind(this));
				inspectLayer.appendChild(div);
			}
		}else
		{
			document.body.removeChild(inspect);
		}
	};
	Bugtron.prototype.syntaxHighlight=function(json) 
	{
		if (typeof json != 'string') {
			 json = JSON.stringify(json, undefined, 2);
		}
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
	}
	Bugtron.prototype.hideObjectDetails=function(e)
	{
		this.inspectWindow.style.display="none";
	}
	Bugtron.prototype.showObjectDetails=function(e)
	{
		var nr=e.currentTarget.getAttribute("ObjectNr");
		var o=MG.game.engine.objects[nr];
		this.inspectWindow.id="BugTron-ObjectDetails";
		if(document.getElementById("BugTron-ObjectDetails")==null)
			document.body.appendChild(this.inspectWindow);

		this.inspectWindow.style.display="block";
		this.inspectWindow.innerHTML="'"+o.type+"' (object: "+nr+") <a href=''>Show Feelers</a> <a href=''>Prev</a><a href=''>Next</a><div id='close_inspect' class='close_button'>X</div><hr><pre>"+this.syntaxHighlight(o)+"</pre>";
		// click handler on close button.
		var inspectButton=document.getElementById("close_inspect");
		inspectButton.addEventListener("click",this.hideObjectDetails.bind(this));
		
		// also show the border of current object as highlighted
		// first put all back to normal
		// the highlight the current object..

	}
	Bugtron.prototype.openLib=function()
	{
		console.log("opening the lib for ya..");
		MG.lib.open();
	};	

	// plug it in..
	MG.extend(MG,"trons");
//	console.log("added BugTron to trons");
	MG.trons.bugtron=new Bugtron();
})();