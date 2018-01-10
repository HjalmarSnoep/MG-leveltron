/*!
* flow.js
* plugin for MG
*/

'use strict';


(function (){
	
	function Flow()
	{
		this.pages=[];
		this.currentPage=null;
		this.loading={};
	}
	
	Flow.prototype.addPage = function(name,page) // stores a ref to the page, called by the apges themselves..
	{
		if(typeof(this.pages[name])!="undefined")
		{
			throw new Error("WARINING: page "+name+" allready exists");
			return null;
		}
		page.name=name;
		this.pages[name]=page;
		page.addResource=this.addResource.bind(page);
		//console.log("add Page: "+page.name);
		page.ready=true;
		// this adds some basic stuff to the page, unless it has been set allready!
		if(typeof(page.resources)=="undefined")
		{
			page.resources=[]; // geen afhankelijkheden, overschrijf deze als je die WEL wil.
		}else{
			if(page.resources.length>0)
			{
				console.log("page has dependencies, so...");
				page.ready=false; // so if user sets resources, they get loaded FIRST!
			}
		}
		return page;
	};
	
	Flow.prototype.addResource = function(res) 
	{
		// this is now the PAGE!
		
		console.log("addResource "+res+" to "+this.name);
		if(typeof(this.resources)=="undefined")this.resources=[];
		// we need to check if this resource is not allready there!
		var i,exists=false;
		for(i=0;i<this.resources.length;i++)
		{
			if(this.resources[i].url==res.url) exists=true;
		}
		if(!exists)
		{
			this.resources.push(res);
			this.ready=false;// check if loaded..
		}
	};
	
	Flow.prototype.gotoPage = function(str) 
	{
		// this can only be called if a DOM allready exists
		if(this.currentPage!=str) 
		{
			if(typeof(this.pages[str])=="undefined")
			{
				throw new Error("WARINING: page '"+str+"' doesn't exist");
			}
			// check if all resources loaded!
			this.page=this.pages[str];
			this.dom=null; // at this point there cannot BE any dom, there is no page yet!
			this.loadingPage=str; // keep the page you were loading
			if(this.page.ready)
			{
				this.showPage(this.loadingPage);
			}else
			{
				console.log("page '"+this.loadingPage+"' needs "+this.page.resources.length+" resources");
				this.loadPageResources();
			}
		}
	};
	
	Flow.prototype.showPage=function(name)
	{
		this.currentPage=name;
		//console.log("Flow showing page '"+name+"'");
		for(var all in this.pages)
		{
			if(this.pages[all].dom!=null)
				this.pages[all].dom.style.display="none";
		}
		var new_page=this.pages[this.currentPage];
		// check if the DOM has been created yet..
		if(new_page.dom==null)
		{
			// we create a new sector to fill with Show
			new_page.dom=document.createElement("sector");
			new_page.dom.id="pages_"+name;
			new_page.w=MG.screen.w;
			new_page.h=MG.screen.h;
			new_page.dom.style.backgroundColor="#000";
			new_page.dom.style.width=MG.screen.w+"px";
			new_page.dom.style.height=MG.screen.h+"px";
			document.getElementById("container").appendChild(new_page.dom); // used to be 	document.body
			MG.layout.resizePage(new_page);
		}
		
		new_page.dom.style.display="block";
		if(new_page.show!=null)
		{
			new_page.show(new_page,this.lib);
		}else{
			throw new Error("WARINING: page '"+name+"' doesn't have a show function");
		}
	};

	// loading of screen..
	
	// loading of resources..
	
	Flow.prototype.loadPageResources=function()
	{
		var nr_of_unloaded=0;
		var res;
		for(var i=0;i<this.page.resources.length;i++)
		{
			if(typeof(this.page.resources[i].loaded)=="undefined" || this.page.resources[i].loaded!=true)
			{
				res=this.page.resources[i];
				nr_of_unloaded++;
			}
		}
		if(nr_of_unloaded==0) 
		{
			this.hideLoadingScreen();
			this.showPage(this.loadingPage);
			return;
		}
		// if we get here, we ARE this.loading..
		this.showLoadingScreen(res);
		switch(res.type)
		{
			case "data":
				this.loadScriptFromLink(res);
			break;
			case "music":
				this.loadMusicFromLink(res);
			break;
			default:
				console.log("Unknown resource type: "+res.type);
		}
	};
	/*******/
	Flow.prototype.loadScriptFromLink=function(res)
	{
		// create a script tag and let it load.
		// this will set the ini var!
		var script = document.createElement('script');
		script.onload = function() {
			res.data=ini; // ini is loaded in window..
			res.loaded=true;
			this.loadPageResources();
		}.bind(this);
		script.src = res.url;
		document.getElementsByTagName('head')[0].appendChild(script);
	};
	/*******/
	Flow.prototype.startAll=function(data)
	{
		menu_init=data;
		// check if you are on file, so online don't work..
		if(location.href.substr(0,7)=="file://")
			initPage();
	};
/*******/
Flow.prototype.loadIniAJAX=function(file,callback)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () 
	{
	  var DONE = 4; // readyState 4 means the request is done.
	  var OK = 200; // status 200 is a successful return.
	  if (xhr.readyState === DONE) 
	  {
		if (xhr.status === OK) 
		  console.log(xhr.responseText); // 'This is the returned text.'
		} else 
		{
		  console.log('Error: ' + xhr.status); // An error occurred during the request.
		}
	};
	xhr.open('GET', file);
	xhr.send(null);
}
/*********loading screen ************/
Flow.prototype.createLoadingScreen =function()
{
	this.loading={};
	this.loading.dom=document.createElement("div");
	this.loading.dom.style.display="none";
	this.loading.dom.style.zIndex=99;
	this.loading.dom.style.backgroundColor="rgba(0,0,0,0.7)";
	this.loading.dom.style.position="fixed";
	this.loading.dom.style.top="0px";
	this.loading.dom.style.left="0px";
	this.loading.dom.style.bottom="0px";
	this.loading.dom.style.right="0px";
	this.loading.dom.style.width="100%";
	this.loading.dom.style.height="100%";
	this.loading.dom.style.color="#fff";
	this.loading.dom.style.textAlign="center";
	 var w = window;
	var d = document;
	var e = d.documentElement;
	var g = d.getElementsByTagName('body')[0];
	var screen_h = w.innerHeight|| e.clientHeight|| g.clientHeight;
	
	this.loading.dom.style.lineHeight=screen_h/2+"px";
	this.loading.dom.innerHTML="loading...";
	this.loading.dom.id="loading";
	document.body.appendChild(this.loading.dom); // used to be 	document.body
};

Flow.prototype.showLoadingScreen=function(res)
{
	if(typeof(this.loading.dom)=="undefined")  this.createLoadingScreen();
	this.loading.dom.innerHTML="loading "+res.type+" "+res.url;
	this.loading.dom.style.display="block";
};
Flow.prototype.hideLoadingScreen=function()
{
	this.loading.dom.style.display="none";
};
	/*******loadPageResources 
		sets a resource
	******/
	
	
	
	
	
	
	
	MG.flow=new Flow();
})();

