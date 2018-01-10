/*!
* Sfx.js
* handles creation of game sounds
*/

'use strict';

(function (){

function Sfx()
{
	this.sfx={};
//	this.sfx.aim={l:0,d:30,r:'{"o":[{"t":0,"f":"634.418","v":0.1,"c":-1},{"t":2,"f":"0.1","v":"425","c":0},{"t":1,"f":"0.5","m":"v","v":"0.7","c":0}],"l":0.9,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.bad={l:0,d:10,r:'{"o":[{"f":458.58,"v":0.026597,"t":2,"c":-1},{"f":0.1,"v":313.277943,"t":0,"c":0},{"f":1.62,"v":-425.858,"t":2,"c":1},{"f":7.0655,"v":-20.924,"t":0,"c":0},{"f":6.8685,"v":-272.9985,"t":0,"c":0},{"f":36.246,"v":0.0705,"t":2,"c":4},{"f":13.326,"v":-343.2485,"t":1,"c":0},{"f":17.006,"v":78.1765,"t":3,"c":0}],"l":0.8,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.bad={l:0,d:10,r:'{"o":[{"t":1,"f":"440","v":0.1,"c":-1},{"t":0,"f":"0.100","v":-228.5,"c":0},{"t":3,"f":"1.798","m":"v","v":"0.731","c":0},{"t":1,"f":"8.992","m":"v","v":"0.295","c":1},{"t":3,"f":"25.402","m":"v","v":"-0.553","c":0}],"l":0.8,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.spawn={l:0,d:10,r:'{"o":[{"t":2,"f":800,"v":0.0002,"c":-1},{"t":2,"f":0.2,"v":"200","c":0},{"t":3,"f":0.3,"v":"600","c":0},{"t":1,"f":12,"m":"v","v":"0.3","c":2},{"t":0,"f":0.1,"v":"760","c":0}],"l":1.7,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.gainball_base='{"o":[{"t":0,"f":440,"v":0.04,"c":-1},{"t":0,"f":16,"v":"25","c":0,"ve":[{"t":0,"v":0},{"t":0.1,"v":3.1},{"t":0.2,"v":0.9},{"t":0.3,"v":0.1},{"t":1,"v":0.9}]}],"l":0.3,"e":[{"t":0,"v":0.4},{"t":0.6,"v":0.1},{"t":1,"v":0}],"k":"beep","v":1}';
	this.sfx.ballblock={l:0,d:200,r:'{"o":[{"f":200,"v":1,"t":0,"c":-1},{"f":5.2,"v":4,"t":3,"c":0},{"f":0.2,"v":0.1,"t":1,"c":1}],"l":0.1,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.wallball={l:0,d:100,r:'{"o":[{"t":2,"f":"20","v":0.03,"c":-1},{"t":3,"f":"40.200","v":"-50","c":0},{"t":3,"f":"80.352","v":"50","c":0}],"l":0.1,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.winlevel={l:0,d:100,r:'{"o":[{"f":4460.8,"v":0.04,"t":3,"c":-1},{"f":6292,"v":0.2,"t":1,"c":-1},{"f":1.1,"v":80,"t":0,"c":0},{"f":10,"v":-294.9,"t":3,"c":0},{"f":14,"v":0.8,"t":1,"c":1}],"l":0.65,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.looseball={l:0,d:10,r:'{"o":[{"t":0,"f":300,"v":0.001,"c":-1},{"t":3,"f":2,"v":"-500","c":0},{"t":3,"f":8.6,"v":"-300","c":0}],"l":0.6,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.click={l:0,d:10,r:'{"o":[{"t":0,"f":1760,"v":0.04,"c":-1},{"t":2,"f":12.8,"v":-71.5,"c":0},{"t":3,"f":20.8,"v":-86,"c":0},{"t":0,"f":13.6,"v":47.9,"c":0,"ve":[{"t":0,"v":0.7},{"t":0.3,"v":0.6},{"t":0.5,"v":0.1},{"t":0.6,"v":0.3},{"t":0.8,"v":0.2},{"t":1,"v":0.3}]},{"t":1,"f":291.2,"m":"v","v":0.516,"c":2},{"t":2,"f":240,"v":3.8,"c":0}],"l":0.1,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.shoot={l:0,d:10,r:'{"o":[{"t":2,"f":"559.651","v":0.0001,"c":-1},{"t":3,"f":"0.100","v":604.7,"c":0},{"t":2,"f":"0.784","v":423,"c":0},{"t":3,"f":"0.194","m":"v","v":"0.366","c":0},{"t":0,"f":"8.160","v":-878.5,"c":0}],"l":0.1,"e":[{"t":0,"v":0.4},{"t":0.9,"v":0.4},{"t":1,"v":0.2}],"k":"beep","v":1}'};
	this.sfx.reload={l:0,d:10,r:'{"o":[{"f":5000,"v":0.00001,"t":3,"c":-1},{"f":13.6,"v":1,"t":2,"c":0},{"f":409,"v":-1,"t":1,"c":1},{"f":1000,"v":700.6,"t":3,"c":0},{"f":5,"v":-511,"t":2,"c":0},{"f":25,"v":-1523,"t":1,"c":4},{"f":26.3,"v":-1958,"t":3,"c":0},{"f":80,"v":-1585,"t":0,"c":0}],"l":0.7,"e":[{"t":0,"v":0.5},{"t":0.2,"v":0},{"t":0.21,"v":1},{"t":0.3,"v":0.1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.explo={l:0,d:10,r:'{"o":[{"f":154.4,"v":0.002,"t":2,"c":-1},{"f":62,"v":300,"t":3,"c":0},{"f":3,"v":-328,"t":1,"c":0},{"f":3.6,"v":256,"t":2,"c":0},{"f":5,"v":-625,"t":0,"c":1},{"f":10,"v":-70,"t":1,"c":0},{"f":8.2,"v":-154,"t":3,"c":2},{"f":6.6,"v":-230,"t":1,"c":0}],"l":0.7,"e":[{"t":0,"v":1},{"t":0.3,"v":0.1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.drop={l:0,d:10,r:'{"o":[{"f":1000,"v":0.0005,"t":0,"c":-1},{"f":2.6,"v":-300,"t":3,"c":0}],"l":0.2,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.heatseeker={l:0,d:30,r:'{"o":[{"t":0,"f":"160.493","v":0.2672999999999999,"c":-1},{"t":1,"f":"0.100","v":54.4,"c":0,"ve":[{"t":0,"v":0.8},{"t":0.3,"v":0.8},{"t":0.6,"v":0.1},{"t":0.8,"v":0.6},{"t":0.9,"v":0},{"t":1,"v":0.2}]},{"t":2,"f":"2.324","m":"v","v":"-0.627","c":1}],"l":0.5,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.bulletwall={l:0,d:10,r:'{"o":[{"t":3,"f":18000,"v":0.005,"c":-1},{"t":1,"f":23,"m":"v","v":0.1,"c":0},{"t":3,"f":190,"v":"300","c":1}],"l":0.1,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.shipwall={l:0,d:10,r:'{"o":[{"t":3,"f":18000,"v":0.005,"c":-1},{"t":1,"f":23,"m":"v","v":0.1,"c":0},{"t":3,"f":190,"v":"300","c":1}],"l":0.1,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};
	this.sfx.ballship={l:0,d:10,r:'{"o":[{"f":200,"v":0.03,"t":2,"c":-1},{"f":10,"v":-17,"t":1,"c":2},{"f":2.5,"v":-15,"t":0,"c":0},{"f":37.5,"v":7.5,"t":0,"c":0}],"l":0.1,"e":[{"t":0,"v":1},{"t":1,"v":0}],"k":"beep","v":1}'};

		/* if you want to use varyFrequency to create different pitches of the same sound, this is how you do it..
		this.sfx.gainball=[];
		var temp=this.sfx.gainball.gainball_base;
		var steps=[2,3,2,2,3]; // tuning..
		for(i=0;i<32;i++)
		{
			this.sfx.gainball.gainball.push({r:temp,l:0,d:10});
			temp=varyFrequencyFactor(temp,Math.pow(2,steps[i%steps.length]/12));
			//pitchUp(temp);
		}	
		*/
		
	}
Sfx.prototype.add=function(name,recipe,repeat)
{
	var o={};
	o.r=recipe;
	if(typeof(repeat)=="undefined") repeat=10;
	o.d=repeat;
	o.l=0;
	this.sfx[name]=o;
}
Sfx.prototype.getNames=function()
{
	var all,names=[];
	for(all in this.sfx)
	{
		names.push(all);
	}
	return names;
}
Sfx.prototype.play=function(name)
{
	var s=this.sfx[name];
	if(typeof(s)=="undefined")
	{
		throw new Error(name +" is not a sound.");
	}
	var now=(new Date()).getTime();
	var dt=now-s.l;
	var i;
	//for(i in sounds) if(sounds[i]==s) console.log("play "+i);
	if(dt>s.d)
	{
		s.l=now;
		var r=JSON.parse(s.r);
		MG.trons.beepotron.play(r,1,0,0); // recipe, volume, pitch, pan
	}
};


Sfx.prototype.varyFrequencyFactor=function (recipe,f)
{
	var i;
	recipe=JSON.parse(recipe);
	for(i=0;i<recipe.o.length;i++)
	{
		var o=recipe.o[i];
		o.f*=f;
		if(Math.abs(o.f)>1)
			o.f=Math.round(o.f*10)/10;
		else
			o.f=Math.round(o.f*1000)/1000;
	}
	return JSON.stringify(recipe);
};
Sfx.prototype.pitchUp=function(recipe)
{
	return this.varyFrequencyFactor(recipe,Math.pow(2,1/12));
};
Sfx.prototype.pitchDown=function(recipe)
{
	return this.varyFrequencyFactor(recipe,1/Math.pow(2,1/12));
};

MG.sfx=new Sfx();
//console.log("sound effects"+MG.sfx);

})();

