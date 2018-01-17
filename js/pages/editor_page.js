(function (){
	// menu private vars en functions..
	
	function EditorPage()
	{
		this.resources=[
			//{data:{},type:"data",url:"tweak/ini.js"}
		];
	}
	
	function getScrollbarWidth() {
		var outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
		
		document.body.appendChild(outer);

		var widthNoScroll = outer.offsetWidth;
		// force scrollbars
		outer.style.overflow = "scroll";

		// add innerdiv
		var inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);        

		var widthWithScroll = inner.offsetWidth;

		// remove divs
		outer.parentNode.removeChild(outer);

		return widthNoScroll - widthWithScroll;
	}
	
	/* init creates the elements on a page for the first time on first show!
	   we create ALL elements that we will use on the page, some may be hidden.
	*/
	EditorPage.prototype.init=function()
	{
		this.initialised=true; //
		var dom=this.dom;
		
		console.log("init EditorPage");
		this.scrollbars=document.createElement("div");
		dom.appendChild(this.scrollbars); // take it out of the LIB, put it on the page, this does however mean it will not be REcreated.
	
		
		// now determine the size inside without scrollbars
		this.scrollcontent=document.createElement("div");
		this.scrollbars.appendChild(this.scrollcontent); // take it out of the LIB, put it on the page, this does however mean it will not be REcreated.
		this.scrollcontent.style.width="16000px"; // make it big initially..
		this.scrollcontent.style.height="16000px";
		
		
		this.controls_height=150;
		this.scrollbar_size=getScrollbarWidth();
		console.log("this.scrollbar_size"+this.scrollbar_size);
		this.canvas=MG.lib.createCanvas("canvas",this.w-this.scrollbar_size,(this.h-this.controls_height-this.scrollbar_size));
		dom.appendChild(this.canvas); // take it out of the LIB, put it on the page, this does however mean it will not be REcreated.
		
		this.controls=document.createElement("div");
		this.controls.style.backgroundColor="#00f";
		dom.appendChild(this.controls); // take it out of the LIB, put it on the page, this does however mean it will not be REcreated.

		console.log("Editor Dimensions: "+this.w,this.h);
		MG.game.viewport.setDimensions(this.canvas.width,this.canvas.height);
		MG.editorView.init(this); // starts the engine..
		MG.editorControls.init(this);
		//MG.game.start();
		
	};
	/* resize takes the elements created by Init and resizes them.. duh..
	*/
	EditorPage.prototype.resize=function()
	{
		this.canvas.style.position="absolute";
		this.canvas.style.left="0px";
		this.canvas.style.top="0px";
		this.canvas.width=this.w-this.scrollbar_size
		this.canvas.height=(this.h-this.controls_height-this.scrollbar_size);
		MG.game.viewport.setDimensions(this.canvas.width,this.canvas.height);
		
		console.log(this.controls+": "+typeof(this.controls));
		this.controls.style.position="absolute";
		this.controls.style.left="0px";
		this.controls.style.top=(this.h-this.controls_height)+"px";
		
		if(MG.options.retro==true)
		{
			this.canvas.style.imageRendering="optimizeSpeed"; // one of these will catch on a specific browser
			this.canvas.style.imageRendering="-moz-crisp-edges"; // others will be ignored
			this.canvas.style.imageRendering="-webkit-optimize-contrast"; // so it might seem
			this.canvas.style.imageRendering="optimize-contrast"; // I'm setting one property 
			this.canvas.style.imageRendering="pixelated"; // multiple times, but it's all one thing.
			this.canvas.style.msInterpolationMode="nearest-neighbor"; // IE..
			this.controls.style.imageRendering="optimizeSpeed"; // one of these will catch on a specific browser
			this.controls.style.imageRendering="-moz-crisp-edges"; // others will be ignored
			this.controls.style.imageRendering="-webkit-optimize-contrast"; // so it might seem
			this.controls.style.imageRendering="optimize-contrast"; // I'm setting one property 
			this.controls.style.imageRendering="pixelated"; // multiple times, but it's all one thing.
			this.controls.style.msInterpolationMode="nearest-neighbor"; // IE..
		}
		this.controls.width=this.canvas.width;
		this.controls.height=this.canvas.height;
		
		this.scrollbars.style.width=this.w+"px";
		this.scrollbars.style.height=(this.h-this.controls_height)+"px";
		this.scrollbars.style.backgroundColor="#ff0000";
		this.scrollbars.style.position="absolute";
		this.scrollbars.style.left="0px";
		this.scrollbars.style.top="0px";		
		this.scrollbars.style.overflowX="scroll";
		this.scrollbars.style.overflowY="scroll";
	};
	/* show created the elements on a page and shows IF it is the first time..
		It ALWAYS calls resize to do this pages particular layout..
	*/	
	EditorPage.prototype.show=function()
	{
		var dom=this.dom;
		if(this.initialised!=true) this.init(); // we want the game to be initialised only ONCE!
		this.resize(); 
	};
	EditorPage.prototype.showAchievement=function(text)
	{
		console.log("showAchievement: "+text);
		this.achievement.style.display="block";
		this.achievement.innerHTML="Achievement: "+text;
		// set a timeout to hide the achievement.
		window.setTimeout(this.hideAchievement.bind(this),3000);
	}
	EditorPage.prototype.hideAchievement=function(text)
	{
		this.achievement.style.display="none";
	}
	EditorPage.prototype.showPopup=function(which)
	{
		this.popup.style.display="block";
		var html="";
		switch(which)
		{
			case "lost":
				html+="<h1>Game Over<h1>";
			break;
			case "win":
			case "won":
				html+="<h1>MISSION COMPLETE<h1>";
			break;
			default:
				html+="<h1>Something happened! "+which+"<h1>";
			
		}
		this.popup.innerHTML=html;
	};

	MG.flow.addPage("editor_page", new EditorPage()); // it will only NOW by executed
	
})();
