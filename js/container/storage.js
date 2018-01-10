/*!
* Storage.js
* plugin for MG
*/

'use strict';


(function (){
	
	function Storage()
	{
		if(location.href.indexOf("file://")==0)
		{
			// we HAVE no storage options, except storing in the window.NAME!
			this.method="window_name";
			window.name=JSON.stringify({});
		}else{
			this.method="localStorage";
		}
		this.method="localStorage";
	}
	
	Storage.prototype.getCookiesFromWindowName = function(name)
	{
		var cookies={};
		try {
			console.log(window.name);
			cookies=JSON.parse(window.name);
		} catch(e) {
			console.log("SOMETHING WENT HORRIBLY WRONG."+e);
			return null;
		}
		return cookies; // it worked..
	};
	Storage.prototype.saveCookiesToWindowName = function(obj)
	{
		window.name=JSON.stringify(obj);
	};	
	Storage.prototype.getItem = function(name)
	{
		switch(this.method)
		{
			case "window_name":
				var cookies=this.getCookiesFromWindowName();
				if(cookies==null) return null;
				if(typeof(cookies[name])=="undefined") return null;
				else return cookies[name];
			break;
			case "localStorage":
				return localStorage.getItem(name);
			break;
				default:
			 console.log("no storage method set");
		}
	};
	Storage.prototype.setItem = function(name,value) 
	{
		switch(this.method)
		{
			case "window_name":
				var cookies=this.getCookiesFromWindowName();
				cookies[name]=value;
				this.saveCookiesToWindowName(cookies);
			break;
			case "localStorage":
				localStorage.setItem(name,value);
			break;
			default:
			 console.log("no storage method set");
		}
	}
	MG.Storage=new Storage();
	
})();

