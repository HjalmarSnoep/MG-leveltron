/*!
* keyboard.js
* plugin for container
*/
(function (){
		
'use strict';

	//console.log("init Keyboard");
	function Keys()
	{
		// set up key interaction.
		this.keys=[];
		this.callback=null;
		for(var i=0;i<256;i++)this.keys[i]={d:false,ld:0}; // down and last down
		document.addEventListener("keydown",this.handleKeys.bind(this));
		document.addEventListener("keyup",this.handleKeys.bind(this));
	}

Keys.prototype.setCallback = function(c)
{
		this.callback=c;
}
Keys.prototype.handleKeys = function(e)
{
	var key = e.which ? e.which : e.keyCode;
	console.log("key"+key);
	if(this.callback!=null)
	{
		this.callback({key:key,type:e.type});
	}
	var now=(new Date()).getTime();
	// uncomment the next line if you want to find keycodes.
	//console.log(e.type+" "+key);
	switch(e.type)
	{
		case "keydown":
			if(this.keys[key].d==false)
			{
				// add the ability to dash!
				this.keys[key].repeat=now-this.keys[key].ld;
				//console.log("repeat="+game.keys[key].repeat);
				this.keys[key].ld=now;
				this.keys[key].d=true;
			}
		break;
		case "keyup":
			if(this.keys[key].d==true)
			{
				this.keys[key].d=false;
			}
		break;

	}
	if(e.preventDefault) e.preventDefault(); // this means right click doesn't work.
};
	MG.extend(MG,"input");
	MG.input.keys=new Keys();




})();


