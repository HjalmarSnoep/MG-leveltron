(function (){
	// menu private vars en functions..
	
	function Menu()
	{
		this.resources=[
			//{data:{},type:"data",url:"tweak/ini.js"}
		];
		this.showSprite="";
		this.anim="";
		this.fr=0;
		this.measure=0;
		

		MG.trons.fontron.addCSSFont("brood","assets/graphics/fonts/brood/obake_free_ver-webfont","woff2|woff");  // both free for personal use..
		MG.trons.fontron.addCSSFont("title","assets/graphics/fonts/title/grandstander-clean-webfont","woff2|woff");  // both free for personal use..
		
		MG.trons.fontron.setCSSFontAsDefault("brood");		
		MG.trons.fontron.setCSSFontAsTitle("title");		

/*		//MG.trons.fontron.addCSSFont("title","assets/graphics/fonts/brood/obake_free_ver","woff2|woff");  // both free for personal use..
		//MG.trons.fontron.addCSSFont("brood","assets/graphics/fonts/title/grandstander-clean-webfont","woff2|woff");  // both free for personal use..
		MG.trons.fontron.addCSSFont("title","assets/graphics/fonts/brood/grandstander-clean-webfont","woff2|woff");  // both free for personal use..
		MG.trons.fontron.addCSSFont("brood","assets/graphics/fonts/title/obake_free_ver","woff2|woff");  // both free for personal use..
		
		
		
		MG.trons.fontron.setCSSFontAsDefault("brood");		
		MG.trons.fontron.setCSSFontAsTitle("title");		
	*/	
	}
	/* init creates the elements on a page for the first time on first show!
	   we create ALL elements that we will use on the page, some may be hidden.
	*/
	Menu.prototype.init=function()
	{
		MG.slotMessenger.setId("leveltron");

		var dom=this.dom;
		this.initialised=true;
		this.dom.style.overflow="hidden";
		MG.screen.getScreenSize();
		dom.style.position="relative";
		dom.innerHTML=""; // erase all!
		
//		MG.layout.setBack("assets/graphics/back.jpg"); // set the background OUTSIDE the game.

		lib={};
		
		
		// this now acts as a loading screen.. so..
		setTimeout(this.waitLoaded.bind(this),200);

		/*
		this.buttons.anotherone=MG.buttons.create("anotherone","anotherone","#1b80c6","#fff",this,this.doMenuButton,"#17a0df","#fff"); //text,back,col,bind,callback)
		this.dom.appendChild(this.buttons.anotherone);
		*/
		//		MG.trons.musitron.loadMusic("menu","assets/sound/menu.wav");

	};
	/* resize takes the elements created by Init and resizes them.. duh..
	*/
	Menu.prototype.resize=function()
	{
		if(this.initialised!=true) return;
		var dom=this.dom;
		
		// redraw the background to the appropriate size.
		
		if(typeof(this.w)=="undefined")
		{
			// this means, it's the very first time and WE are the very first page to display.
			MG.screen.getScreenSize();
			this.w=MG.screen.real_w;
			this.h=MG.screen.real_h;
		}
		

	
	};
/* show created the elements on a page and shows IF it is the first time..
		It ALWAYS calls resize to do this pages particular layout..
	*/	
	Menu.prototype.show=function()
	{
		var dom=this.dom;
		if(this.initialised!=true) this.init(); // we want the game to be initialised only ONCE!
		//MG.trons.musitron.stopAll();		
		//MG.trons.musitron.play("menu");		
		this.resize(); 
	};
	
	
	Menu.prototype.waitLoaded=function(ev)
	{
				MG.editorView.reset();
				MG.flow.gotoPage("editor_page");
				MG.editorView.start();
	}
	
	MG.flow.addPage("menu", new Menu()); // it will only NOW by executed

	
})();
