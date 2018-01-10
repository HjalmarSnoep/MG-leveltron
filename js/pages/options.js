(function (){
	// Options private vars en functions..
	
	function Options()
	{
		this.resources=[
			//{data:{},type:"data",url:"tweak/ini.js"}
		];
		this.showSprite="";
		this.anim="";
		this.fr=0;
		this.measure=0;
		
	}
	/* init creates the elements on a page for the first time on first show!
	   we create ALL elements that we will use on the page, some may be hidden.
	*/
	Options.prototype.init=function()
	{
		var dom=this.dom;
		this.initialised=true;
		this.dom.style.overflow="hidden";
		MG.screen.getScreenSize();
		dom.style.position="relative";
		dom.innerHTML=""; // erase all!
//		MG.layout.setBack("assets/graphics/back.jpg"); // set the background OUTSIDE the game.

		lib={};
		this.canv=MG.lib.createCanvas("Options_back",this.w,this.h);
		dom.appendChild(this.canv);
		
		// create the title
		this.title=document.createElement("h1");
		this.title.innerHTML="Options";
		this.dom.appendChild(this.title);
		
		this.buttons={};
		this.buttons.back=MG.buttons.create("back","BACK","#ff9a2e","#fff",this,this.doOptionsButton,"#fece55","#fff"); //text,back,col,bind,callback)
		this.dom.appendChild(this.buttons.back);

		
		/*
		this.buttons.anotherone=MG.buttons.create("anotherone","anotherone","#1b80c6","#fff",this,this.doOptionsButton,"#17a0df","#fff"); //text,back,col,bind,callback)
		this.dom.appendChild(this.buttons.anotherone);
		*/
		//		MG.trons.musitron.loadMusic("Options","assets/sound/Options.wav");

	};
	/* resize takes the elements created by Init and resizes them.. duh..
	*/
	Options.prototype.resize=function()
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
		
		this.canv.width=this.w;
		this.canv.height=this.h;
		var ctx=this.ctx=this.canv.getContext("2d");
		var grd=ctx.createRadialGradient(this.w/2,this.h/2,100,this.w/2,this.h/2,(this.w+this.h)/2);
		grd.addColorStop(0,"#b4383f");
		grd.addColorStop(0.5,"#962e31");
		grd.addColorStop(1,"#55221c");
		// Fill with gradient
		ctx.fillStyle="#94654f";
		ctx.fillRect(0,0,this.w,this.h);
		ctx.fillStyle="#804b2d";
		ctx.fillRect(7,7,this.w-14,this.h-14);
		ctx.fillStyle=grd;
		ctx.fillRect(14,14,this.w-28,this.h-28);

		// now do the button-layout
		var margin=(this.w-480)/2;
		var y=this.h/2-150;

		
		// position the title
		this.title.style.width="100%";
		this.title.style.textAlign="center";
		this.title.style.position="absolute";
		this.title.style.top=y+"px";
		this.title.style.left=0+"px";
		y+=80;
	
		this.buttons.back.style.width="280px";
		this.buttons.back.style.position="absolute";
		this.buttons.back.style.top=y+"px";
		this.buttons.back.style.left=((this.w-280)/2)+"px";


	};
/* show created the elements on a page and shows IF it is the first time..
		It ALWAYS calls resize to do this pages particular layout..
	*/	
	Options.prototype.show=function()
	{
		var dom=this.dom;
		if(this.initialised!=true) this.init(); // we want the game to be initialised only ONCE!
		//MG.trons.musitron.stopAll();		
		//MG.trons.musitron.play("Options");		
		this.resize(); 
	};
	
	Options.prototype.doOptionsButton=function(ev)
	{
		var button_name=ev.currentTarget.getAttribute("name");;
		switch(button_name)
		{
			case "back":
				MG.flow.gotoPage("menu");
			break;			
			default:
				console.log("button: "+button_name+" not supported yet");
			break;
		}
		
		
	}
	
	MG.flow.addPage("options", new Options()); // it will only NOW by executed

	
})();
