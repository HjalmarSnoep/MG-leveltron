/*
The Music Object, which is embedded in the game and
communes with the lib!

*/
'use strict';

(function (){

	function Music()
	{
		this.music={};

		this.stop=function (name)
		{
			var mus=document.getElementById("_music_"+name);
			if(mus==null){
				console.log("Can't pause "+name+". music not loaded");
				return ;
			}
			mus.pause();
		}
		this.stopAll=function (name)
		{
			var mus = document.querySelectorAll('[id^=_music]');
			var i=0;
			for(i=0;i<mus.length;i++)
				mus[i].pause();
		}
		this.play=function (name,loop)
		{
			if(MG.options.music==false) return;
			
			var mus=document.getElementById("_music_"+name);
			if(mus==null){
				console.log("Can't play "+name+". music not loaded");
				return ;
			}
			mus.currentTime=0;
			mus.autoPlay=true; // maybe it's still loading..
			mus.play();
			if(typeof(loop)=="undefined") loop=true;
			if(loop)
			{
				mus.addEventListener('ended', function() 
				{
					this.currentTime = 0;
					this.play();
				}, false);
			}
		}
		this.setVolume=function (name,vol)
		{
			var mus=document.getElementById("_music_"+name);
			if(mus==null){
				console.log("Can't play "+name+". music not loaded");
				return ;
			}
			mus.volume=vol;
		}
		this.getDom=function(name)
		{
			return music[name].dom;
		}
		this.loadMusic=function (name,url)
		{
			// create a audioTag in the page lib.
			var lib=document.getElementById("lib");
//			console.log(lib)
			if(document.getElementById("_music_"+name)==null)
			{
				var m=document.createElement("audio");
				m.controls=true;
				m.id="_music_"+name;
				m.volume=0.3;
				var s=document.createElement("source");
				//s.setAttribute("type","audio/mpeg");
				s.setAttribute("src",url);
				m.appendChild(s);
				lib.appendChild(m);
				this.music[name]={dom:m};
			}
			/*
			<audio controls>
			  <source src="horse.ogg" type="audio/ogg">
			  <source src="horse.mp3" type="audio/mpeg">
			Your browser does not support the audio element.
			</audio>
		*/
		}
	}

	MG.extend(MG,"trons");
//	console.log("added MusiTron to trons");
	MG.trons.musitron=new Music();
})();
