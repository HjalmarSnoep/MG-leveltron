/*!
* screen.js
* plugin for MGContainer
*/

'use strict';


(function (){
	
	function Screen()
	{
		this.emulate_screen=false;
		this.getScreenSize();
	}
	
	Screen.prototype.getScreenSize=function(w,h)
	{
		var w = window;
		var d = document;
		var e = d.documentElement;
		var g = d.getElementsByTagName('body')[0];
		this.real_w = w.innerWidth || e.clientWidth || g.clientWidth;
		this.real_h = w.innerHeight|| e.clientHeight|| g.clientHeight;
	}
	Screen.prototype.setSize=function(w,h)
	{
		this.w=w;
		this.h=h;
		this.emulate_screen=true;
		if(w=="100%" && h=="100%")
		{
			this.emulate_screen=false;
			this.w=this.real_w;
			this.h=this.real_h;
			console.log("we might do this as well.");
		}
	};
	Screen.prototype.GoFullScreen = function() 
	{
		if (document.fullscreenEnabled || 	document.webkitFullscreenEnabled || 	document.mozFullScreenEnabled ||	document.msFullscreenEnabled) 
		{
			// go full-screen
			document.addEventListener("fullscreenchange", MG.layout.resize.bind(MG.layout.resize));
			var i=document.getElementById("container");
			if (i.requestFullscreen) {
				i.requestFullscreen();
			} else if (i.webkitRequestFullscreen) {
				i.webkitRequestFullscreen();
			} else if (i.mozRequestFullScreen) {
				i.mozRequestFullScreen();
			} else if (i.msRequestFullscreen) {
				i.msRequestFullscreen();
			}
		}
	};
		
		
	MG.screen=new Screen();
})();


