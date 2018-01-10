'use strict';

(function (){
		
function Achievements()
{
		this.names=[];
		this.names.push("Abduct human");
		this.names.push("Complete mission");
		this.names.push("Break grass");
		this.names.push("Break stone");
		this.names.push("Break iron");
		this.names.push("Break wood");
		this.names.push("Drop a cow");
		this.names.push("Drop a human");
		this.names.push("Killed by fire");
		this.names.push("Crash fighter");
		this.names.push("Make new fighter");
		
		this.data=[];
		
		var json=MG.Storage.getItem('achievements');
		console.log("ACHIEVEMENTS:"+json);
		if(json==null)
		{
			console.log("no cookie found, creating Achievements.");
			this.achievements_data=[];
			var i=0;
			for(i=0;i<this.names.length;i++)
			{
				this.data[i]={name:this.names[i],done:false};
			}
			MG.Storage.setItem('achievements',JSON.stringify(this.data));
		}else
		{
			this.data=JSON.parse(json);
		}
}

Achievements.prototype.set=function(st)
{
	console.log("get Achievement: "+st);
	var i=0;
	for(i=0;i<this.data.length;i++)
	{
		if(this.data[i].name==st)
		{
			console.log("achievement "+st+":"+this.data[i].done);
			if(this.data[i].done!=true)
			{
				console.log("first time for achievement: "+st);
				// there is an actual achievement event.
				// we should DEFINITELY show this in the game on a popup??
				MG.flow.pages["game_page"].showAchievement(st);
				this.data[i].done=true;
				MG.Storage.setItem('achievements',JSON.stringify(this.data)); // also store in cookie!
			}
		}
	}
	
}
	
Achievements.prototype.clearAll=function()
{	
};

	MG.achievements=new Achievements();

})();