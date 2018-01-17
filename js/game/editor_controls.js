(function (){
	// menu private vars en functions..
	
	function EditorControls (  )
	{
		this.style = document.createElement("style");
		this.style.id="editor_controls";
		this.activePaint=0;
		var str='';
		str+='.controls{';
		str+='font-family: sans-serif;';
		str+='width: 100%;';
		str+='}';
		str+='.controls>.tabsdiv{';
		str+='width: 100%;';
		str+='padding: 0px;';
		str+='}';
		str+='.controls>.tabsdiv>.tablabel{';
		str+='margin-right: 2px;';
		str+='padding: 5px 15px 2px 15px;';
		str+='border-radius: 10px 10px 0px 0px;';
		str+='-webkit-border-radius: 10px 10px 0px 0px;';
		str+='display: inline-block;';
		str+='background-color: rgba(255,255,255,0.6);';
		str+='color: rgba(0,0,0,0.6);';
		str+='}';
		str+='.controls>.tabsdiv>.tablabel[active]{';
		str+='background-color: #fff;';
		str+='color: #000;';
		str+='}';
		str+='.controls>.tab{';
		str+='width: calc( 100% -10px);';
		str+='background-color: #fff;';
		str+='padding: 5px;';
		str+='}';
		str+='.controls>.tab>.group{';
		str+='background-color: #fff;';
		str+='border: 1px solid silver;';
		str+='padding: 5px;';
		str+='display: inline-block;';
		str+='}';
		str+='.controls>.tab>.group>input{';
		str+='width: 50px;';
		str+='}';
		str+='.controls>.tab>.group>.inputfile {';
		str+='width: 0.1px;';
		str+='height: 0.1px;';
		str+='opacity: 0;';
		str+='overflow: hidden;';
		str+='position: absolute;';
		str+='z-index: -1;';
		str+='}';
		str+='.inputfile + label {';
		str+='   font: 400 0.8em Arial,sans-serif;';
		str+='    color: buttontext;';
		str+='    border-color: 1px solid buttonface;';
		str+='    background-color: buttonface;';
		str+='   padding: 3px 5px 3px 5px;';
		str+='    display: inline-block;';
		str+='    -webkit-appearance: button;';
		str+='}		';
		str+='.controls>.tab>.group>.button{';
		str+='width: 32px;';
		str+='height: 32px;';
		str+='padding: 2px;';
		str+='}';
		str+='.controls>.tab>.group>.button:active { margin-top:0px; }'; // other than a normal button, which has been set by buttons.js.
		str+='.controls>.tab>.group>.button[active] { background-color: #f00; }'; // other than a normal button, which has been set by buttons.js.
		this.style.innerHTML=str;
		document.head.appendChild(this.style); // header is there, as we are actually doing stuff.	
	}
	EditorControls.prototype.clickButton=function (ev)
	{
		console.log("you clicked: "+ev.currentTarget);
		for(var i=0;i<this.buttons.length;i++)
		{
			this.buttons[i].removeAttribute("active");
		}
		ev.currentTarget.setAttribute("active",true);
		var active=ev.currentTarget.id.substring(3);
		if(active=="-erase") active=-1;
		this.activePaint=active;
	};
	EditorControls.prototype.updateLevelProps=function (ev)
	{
		console.log("you clicked: "+ev.currentTarget);
		for(var i=0;i<this.buttons.length;i++)
		{
			this.buttons[i].removeAttribute("active");
		}
		ev.currentTarget.setAttribute("active",true);
	};	
	EditorControls.prototype.clickTab=function (ev)
	{
		console.log("you clicked: "+ev.currentTarget.innerHTML);
		for(var i=0;i<this.tablabels.length;i++)
		{
			if(ev.currentTarget==this.tablabels[i])
			{
				this.tablabels[i].setAttribute("active",true);
				this.showTab(i);
			}else{
				this.tablabels[i].removeAttribute("active");
			}

		}
				
	};		
	EditorControls.prototype.showTab=function (nr)
	{
		for(var i=0;i<this.tablabels.length;i++)
		{
			if(i==nr)
			{
				this.tabs[i].style.display="block";
			}else{
				this.tabs[i].style.display="none";
			}
		}
	};
	EditorControls.prototype.requestChangeWH=function (ev)
	{
		var w=0,h=0;
		w=parseInt(document.getElementById("level_w").value);
		h=parseInt(document.getElementById("level_h").value);
		console.log("requestChangeWH to "+w+","+h);
		MG.game.tilemap.setSize(w,h);
	};
	
	EditorControls.prototype.requestSave=function (ev)
	{
		var level_id=document.getElementById("level_name").value;
		console.log("saving level to textDocument" +level_id);
		MG.game.tilemap.id=level_id;
		var data=MG.game.tilemap.cleanCopy();
		// now this next bit could be in the IO-tron..
		var txt=JSON.stringify(data); // plain stringify or it will be huge!
		txt=txt.split("],").join("],\n");// make it a bit more readable!
		txt=txt.split("]]").join("\n]]");// make it a bit more readable!
		txt=txt.split("[[").join("[[\n");// make it a bit more readable!
		var blob = new Blob([txt], {type: "text/plain;charset=utf-8"});
		/*var datum=new Date();
		var year=datum.getFullYear();
		var month=datum.getMonth()+1;
		var day=datum.getDate();
		var hours=datum.getHours();
		var min=datum.getMinutes();
		if(hours<10) hours="0"+hours;
		if(min<10) min="0"+min;
		var date=year+"-"+month+"-"+day+"-"+hours+"-"+min;
		*/
		saveAs(blob, "TimeSwapLevel-"+level_id+".txt");
	};
	EditorControls.prototype.requestTry=function (ev)
	{
		var level_id=document.getElementById("level_name").value;
		// send a message to openener.
		var data=MG.game.tilemap.cleanCopy();
		MG.slotMessenger.sendBackToOpener(data)
	};	
	EditorControls.prototype.requestCode=function (ev)
	{
		var level_id=document.getElementById("level_name").value;
		MG.game.tilemap.id=level_id;
		var data=MG.game.tilemap.cleanCopy();
		data.environment="you need to set this manually";
		data.dictionary="you need to set this manually";
		// now this next bit could be in the IO-tron..
		var txt=JSON.stringify(data); // plain stringify or it will be huge!
		txt=txt.split("],").join("],<br>");// make it a bit more readable!
		txt=txt.split("]]").join("<br>]]");// make it a bit more readable!
		txt=txt.split("[[").join("[[<br>");// make it a bit more readable!
		console.log("data: "+txt)
		//var code_window=window.open("","_code");   
		top.consoleRef=window.open('','myconsole',
		  'width=350,height=250'
		   +',menubar=0'
		   +',toolbar=1'
		   +',status=0'
		   +',scrollbars=1'
		   +',resizable=1')
		 top.consoleRef.document.writeln(
		  '<html><head><style>body,html{font-family: monospace;}</style><title>Console</title></head>'
		   +'<body bgcolor=white onLoad="self.focus()">'
		   +txt
		   +'</body></html>'
		 )
		 top.consoleRef.document.close();
	};		
	EditorControls.prototype.requestLoad=function ()
	{
        var input, file, fr;

        input = document.getElementById('load');
        file = input.files[0];
        fr = new FileReader();
		fr.onload=function(txt)
		{
			console.log("read local text file"+fr.result);
			MG.game.tilemap.readFromFile(fr.result);
		}
        fr.readAsText(file);

    }
	EditorControls.prototype.updateLevelProps=function ()
	{
		var html="",w=32,h=32;
		if(typeof(MG.game.tilemap)!="undefined")
		{
			w=MG.game.tilemap.w;
			h=MG.game.tilemap.h;
		}
		html+='<div class="group">';
			html+='level name: ';
			html+='<input id="level_name" value="level 1"></input>';
			html+=' <button id="saveLevel">download</button>';
			html+=' <input id="load" class="inputfile" type="file"></input>';
			html+=' <label for="load">Load</label>';
			html+=' <button id="tryLevel">try in game</button>';
			html+=' <button id="getCode">get Code</button>';
		html+='</div>';
		html+='<br>';
		html+='<div class="group">';
			html+='level size: ';
			html+='<input id="level_w" type="number" value="'+w+'"></input>x';
			html+='<input id="level_h" type="number" value="'+h+'"></input>';
			html+=' <button id="changewh">Change</button>';
		html+='</div>';
		this.tabs[0].innerHTML=html;
		document.getElementById("changewh").addEventListener("click",this.requestChangeWH.bind(this));
		document.getElementById("saveLevel").addEventListener("click",this.requestSave.bind(this));
		document.getElementById("tryLevel").addEventListener("click",this.requestTry.bind(this));
		document.getElementById("getCode").addEventListener("click",this.requestCode.bind(this));
		document.getElementById("load").addEventListener("change",this.requestLoad.bind(this));
	};	
	EditorControls.prototype.updateTiles=function ()
	{
		console.log("updateTiles");
		var tab=this.tabs[1];
		tab.innerHTML=""; // erase all!
		if(typeof(this.iconcanvas)=="undefined")
		{
			this.iconcanvas=document.createElement("canvas"); // temp canvas!
			this.iconcanvas.width=32;
			this.iconcanvas.height=32;
		}
		var ctx=this.iconcanvas.getContext("2d");
		var group=document.createElement("div");
		group.className="group";
		this.buttons=[];
		var buttongroup=document.getElementById("buttongroup");
		var dictionary=[];
		if(typeof(MG.game.tilemap)!="undefined" && typeof(MG.game.tilemap.dictionary)!="undefined")
		{
			dictionary=MG.game.tilemap.dictionary;
		}
		// create an erase button
		/*
		var but=document.createElement("div");
		but.id="but-erase";
		but.className="button";
		but.addEventListener("click",this.clickButton.bind(this));
		this.buttons.push(but);
			group.appendChild(but);*/
		for(var i=0;i<dictionary.length;i++)
		{
			ctx.fillStyle=dictionary[i].col;
			ctx.fillRect(0,0,32,32);
			var but=document.createElement("div");
			but.id="but"+i;
			but.className="button";
			if(i==this.activePaint)
			{
				but.setAttribute("active",true);
			}
			var img=document.createElement("img");
			img.src=this.iconcanvas.toDataURL();
			but.appendChild(img);
			but.addEventListener("click",this.clickButton.bind(this));
			this.buttons.push(but);
			group.appendChild(but);
		}
		tab.appendChild(group);
	}

	EditorControls.prototype.init=function (initObj)
	{
		this.dom=initObj.controls;
		this.dom.className="controls"
		// create the controls panel!
		var html="";
		this.dom.innerHTML=html;
		this.tablabels=["LevelProps","Edit tiles"];
		this.tabs=[];
		
		// create the tabs from the tablabes above!
		var tabsdiv=document.createElement("div");
		tabsdiv.className="tabsdiv";
		this.dom.appendChild(tabsdiv);
		for(var i=0;i<this.tablabels.length;i++)
		{
			// create the tab buttons.
			var tablabel=document.createElement("div");
			tablabel.className="tablabel";
			tablabel.innerHTML=this.tablabels[i];
			tablabel.setAttribute("data",i);
			tablabel.addEventListener("click",this.clickTab.bind(this));
			this.tablabels[i]=tablabel;
			tabsdiv.appendChild(tablabel);
			// create a tabcontent div!
			var tab=document.createElement("div");
			tab.className="tab";
			tab.id="tab"+i;
			this.tabs.push(tab);
			this.dom.appendChild(tab);
		}
		
		// populate LevelProps Tab
		this.updateLevelProps();
		
		// populate Edit Tiles Tab
		this.updateTiles();
		
		this.showTab(0); // show the first tab!
	};
	
	console.log("create EditorControls");
	MG.editorControls=new EditorControls();
})();
