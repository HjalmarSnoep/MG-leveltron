/*!
* keyboard.js
* plugin for container
*/
(function (){
		
'use strict';

	//console.log("init Keyboard");
	function GamePads()
	{
		MG.extend(MG,"input");
		MG.input.gamepads=[];
		MG.input.gamepads[0]={buttons:[],axes:[]};
		MG.input.gamepads[1]={buttons:[],axes:[]};
		MG.input.gamepads[2]={buttons:[],axes:[]};
		MG.input.gamepads[3]={buttons:[],axes:[]};
		this.queryPads(); // this will continue to query the pads..
		this.cb=null;
	}
	GamePads.prototype.setCallback=function(cb)
	{
		this.cb=cb;
	}
	GamePads.prototype.removeCallback=function(cb)
	{
		this.cb=null;
	}
	GamePads.prototype.queryPads=function()
	{
		var gamepads = navigator.getGamepads();
		for(var i=0;i<gamepads.length;i++)
		{
			var pad=gamepads[i];
			if(pad!=null && pad.connected==true && pad.timestamp>0)
			{
				for(var b=0;b<gamepads[i].buttons.length;b++)
				{
					if(typeof(MG.input.gamepads[i].buttons[b])==="undefined")
					{
//						console.log("initiate pad"+i+" button"+b);
						if(this.cb!=null)this.cb({type:"init",qualifier:"",pad:i,button:b,axis:-1});
						MG.input.gamepads[i].buttons[b]={d:false,ld:0};
					}
					if(MG.input.gamepads[i].buttons[b].d)
					{
						if(!(pad.buttons[b].pressed|pad.buttons[b].value))
						{
							MG.input.gamepads[i].buttons[b].d=false;
							if(this.cb!=null)this.cb({type:"up",qualifier:"",pad:i,button:b,axis:-1});
//							console.log("buttons"+b+": "+MG.input.gamepads[i].buttons[b].d+"");
						}
					}else{
						//button is up
						if(pad.buttons[b].pressed|pad.buttons[b].value)
						{
							if(this.cb!=null)this.cb({type:"down",qualifier:"",pad:i,button:b,axis:-1});
							MG.input.gamepads[i].buttons[b].d=true;
							MG.input.gamepads[i].buttons[b].ld=pad.timestamp;
//								console.log("buttons"+b+": "+MG.input.gamepads[i].buttons[b].d+"");
						}
					}
				}
				for(var b=0;b<gamepads[i].axes.length;b++)
				{
					if(typeof(MG.input.gamepads[i].axes[b])==="undefined")
					{
						console.log("initiate pad"+i+" axes"+b);
						MG.input.gamepads[i].axes[b]={min:{d:false,ld:0},plus:{d:false,ld:0}};
						if(this.cb!=null)this.cb({type:"init",qualifier:"",pad:i,button:-1,axis:b});
					}
					if(MG.input.gamepads[i].axes[b].min.d)
					{
						if(!(pad.axes[b]<-0.5))
						{
							MG.input.gamepads[i].axes[b].min.d=false;
							if(this.cb!=null)this.cb({type:"up",qualifier:"min",pad:i,button:-1,axis:b});
//							console.log("axes"+b+": "+JSON.stringify(MG.input.gamepads[i].axes[b])+"");
						}
					}else{
						//button is up
						if(pad.axes[b]<-0.5)
						{
							if(this.cb!=null)this.cb({type:"down",qualifier:"min",pad:i,button:-1,axis:b});
							MG.input.gamepads[i].axes[b].min.d=true;
							MG.input.gamepads[i].axes[b].min.ld=pad.timestamp;
//							console.log("axes"+b+": "+JSON.stringify(MG.input.gamepads[i].axes[b])+"");
						}
					}
					if(MG.input.gamepads[i].axes[b].plus.d)
					{
						if(!(pad.axes[b]>0.5))
						{
							if(this.cb!=null)this.cb({type:"up",qualifier:"plus",pad:i,button:-1,axis:b});
							MG.input.gamepads[i].axes[b].plus.d=false;
//							console.log("axes"+b+": "+JSON.stringify(MG.input.gamepads[i].axes[b])+"");
						}
					}else{
						//button is up
						if(pad.axes[b]>0.5)
						{
							if(this.cb!=null)this.cb({type:"down",qualifier:"plus",pad:i,button:-1,axis:b});
							MG.input.gamepads[i].axes[b].plus.d=true;
							MG.input.gamepads[i].axes[b].plus.ld=pad.timestamp;
//							console.log("axes"+b+": "+JSON.stringify(MG.input.gamepads[i].axes[b])+"");
						}
					}
						
				}
			}
/*				for(var b=0;b<gamepads[i].buttons.length;b++)
					{
						if(gamepads[i].buttons[0].pressed)MG.input.gamepads[i].action1=true;
						if(gamepads[i].buttons[1].pressed)MG.input.gamepads[i].action2=true;

					}
					for(var b=0;b<gamepads[i].axes.length;b++)
					{
						pad.up=false;
						pad.down=false;
						pad.left=false;
						pad.right=false;
						var left_right=gamepads[i].axes[0];
						if(left_right<-0.5) 
							MG.input.gamepads[i].left=true;
						if(left_right>0.5) 
							MG.input.gamepads[i].right=true;
						var up_down=gamepads[i].axes[1];
						if(up_down<-0.5) 
							MG.input.gamepads[i].up=true;
						if(up_down>0.5) 
							MG.input.gamepads[i].down=true;
					}
				}*/
			}
			//document.body.innerHTML=str;
			window.requestAnimationFrame(this.queryPads.bind(this));
	};
	MG.extend(MG,"input");
	MG.input.gamepads_controller=new GamePads();

	// easy access and Mapping for lazy people :)

})();


