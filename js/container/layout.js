/*!
* screen.js
* plugin for MGContainer
*/

'use strict';


(function (){
	
	function Layout()
	{
		// hold al automatic layout functions..
		this.hasResize=false;
		this.backImage=false;
		this.backImageResize=false;

	}
	
	Layout.prototype.setBack=function(img)
	{
		this.backImage=true;
		this.backImageResize=true;
		this.back=document.getElementById("container_back")
		this.back.innerHTML="<img id='back_image' style='position: relative; top:50%; left: 50%;' src='"+img+"'>)";
		// now fire a resize event to fix it
		setTimeout(this.resizeWindowInABit,100);
	};
	Layout.prototype.resizeWindowInABit=function()
	{
		window.dispatchEvent(new Event('resize'));
	}
	Layout.prototype.resizeBackImage=function(f)
	{
		console.log("resizing back!");
		document.getElementById("back_image").style.transform="translateX(-50%) translateY(-50%) scale("+f+","+f+")";
	};	
	Layout.prototype.resizePage=function(page)
	{
		//console.log("centerPage called for "+page.name);
		if(this.hasResize==false) this.setResize();
		//console.log("centerPage: "+page.w+"x"+page.h+" to "+MG.screen.real_w+"x"+MG.screen.real_h);
		if(MG.screen.emulate_screen)
		{
			var fx=MG.screen.real_w/MG.screen.w;
			var fy=MG.screen.real_h/MG.screen.h;
			page.f=(fx<fy)? fx:fy;
			page.w=MG.screen.w;// so this becomes the REAL width of the sector in pixels..
			page.h=MG.screen.h;// so this becomes the REAL width of the sector in pixels..
		}else{
			page.w=MG.screen.real_w;
			page.h=MG.screen.real_h;
			page.f=1; // needed for mousecoords!
		}
		if(typeof(page.dom)!="undefined")
		{
			var e=page.dom;
			e.style.position="absolute";
			e.style.left=(MG.screen.real_w-page.w)/2+"px";
			e.style.top=(MG.screen.real_h-page.h)/2+"px";
			e.style.webkitTransform = "scale("+page.f+","+page.f+")";
			e.style.transform = "scale("+page.f+","+page.f+")";
			e.style.width=page.w+"px";
			e.style.height=page.h+"px";
			if(page.initialised==true) page.resize();// else this is just the first resize event, that is created by browsers everywhere..
		}
	};
	
	Layout.prototype.resize=function()
	{
		var all;
		MG.screen.getScreenSize();
		var back=false;
		for(var all in MG.flow.pages)
		{	
			MG.layout.resizePage(MG.flow.pages[all]);
			if(back==false)
			{
				back=true; // just do it once.
				if(this.backImage && this.backImageResize) this.resizeBackImage(MG.flow.pages[all].f);
			}
		}
	}
	Layout.prototype.setResize=function(page)
	{
		this.hasResize=true;
			
		 if(window.attachEvent) 
		  {
			window.attachEvent('onresize', this.resize.bind(this));
			//console.log("used attachEvent to claim resize");
		  }
		  else if(window.addEventListener) 
		  {
			window.addEventListener('resize',  this.resize.bind(this));
			//console.log("used addEventListener to claim resize");
		  }
		  else 
		  {
			throw new Error("The browser does not support Javascript event binding");
		  } 
	};
		
	MG.layout=new Layout();
})();


