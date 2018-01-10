/*!
* Buttons.js
* handles drawing of Buttons
* for now also Hardwired setting of Buttons in this.maps
*/

'use strict';


(function (){

function Buttons()
{
	// create a stylesheet just for buttons..
	var style=this.style=document.createElement("style");
	style.id="buttons_stylesheet";
	var str='';

	str+='.button_inside{\n';
	
	str+='background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, rgba(255,255,255,0.05)), color-stop(1, rgba(0,0,0,0.1)));\n';
	str+='background:-moz-linear-gradient(top, rgba(255,255,255,0.05) 5%, rgba(0,0,0,0.1) 100%);\n';
	str+='background:-webkit-linear-gradient(top, rgba(255,255,255,0.05) 5%, rgba(0,0,0,0.1) 100%);\n';
	str+='background:-o-linear-gradient(top, rgba(255,255,255,0.05) 5%, rgba(0,0,0,0.1) 100%);\n';
	str+='background:-ms-linear-gradient(top, rgba(255,255,255,0.05) 5%, rgba(0,0,0,0.1) 100%);\n';
	str+='background:linear-gradient(to bottom, rgba(255,255,255,0.05) 5%, rgba(0,0,0,0.1) 100%);\n';
	str+="filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='rgba(255,255,255,0.05)', endColorstr='rgba(0,0,0,0.1)',GradientType=0);\n";
	
	str+='}\n'; 


	str+='.button{\n';
	str+='text-align: center;\n';
	str+='user-select: none;\n';
	str+='cursor: pointer;\n';
	str+='font-size: 25px;\n';
	str+=' border-radius: 3px;\n'; 
	str+='color: #000;\n'; 
	
	str+='-moz-box-shadow:inset 0px 1px 0px 0px rgba(255,255,255,0.5);\n';
	str+='-webkit-box-shadow:inset 0px 1px 0px 0px rgba(255,255,255,0.5);\n';
	str+='box-shadow:inset 0px 1px 0px 0px rgba(255,255,255,0.5);\n';
	str+='border:1px solid rgba(0,0,0,0.5);\n';
	str+='display:inline-block;\n';
	str+='text-decoration:none;\n';
	str+='text-shadow:0px 1px 3px rgba(0,0,0,0.5);\n';
	str+='}\n';
	

	// here we set the slideIn all at once..
	str+=`
		/*
		==============================================
		slideIn
		==============================================
		*/


		.slideIn{
			animation-name: slideIn;
			-webkit-animation-name: slideIn;	

			animation-duration: 1s;	
			-webkit-animation-duration: 1s;

			animation-timing-function: ease;	
			-webkit-animation-timing-function: ease;	

			visibility: visible !important;						
		}

		@keyframes slideIn {
			0% {
				transform: translateY(300%);
			}
			50%{
				transform: translateY(8%);
			}
			65%{
				transform: translateY(-4%);
			}
			80%{
				transform: translateY(4%);
			}
			95%{
				transform: translateY(-2%);
			}			
			100% {
				transform: translateY(0%);
			}		
		}

		@-webkit-keyframes slideIn {
			0% {
				-webkit-transform: translateY(300%);
			}
			50%{
				-webkit-transform: translateY(8%);
			}
			65%{
				-webkit-transform: translateY(-4%);
			}
			80%{
				-webkit-transform: translateY(4%);
			}
			95%{
				-webkit-transform: translateY(-2%);
			}			
			100% {
				-webkit-transform: translateY(0%);
			}	
	}`;
	
	
	str+='.button:hover{\n';
	str+='background-color: #000;\n'; 
	str+='color: #fff;\n'; 
	str+='}\n';

	str+='.button:active{\n';
	str+='margin-top: 1px;\n'; 
	str+='}\n';
	
	style.appendChild(document.createTextNode(str));
	document.head.appendChild(style);
	
	
}
// previous signature: id,text,back,col,bind,callback)
Buttons.prototype.create=function(id,text,back,col,bind,callback,back2,col2)
{
	if(typeof(back2)=="undefined") back2=col;
	if(typeof(col2)=="undefined") col2=back;
	if(typeof(callback)=="undefined") throw new Error("Button callback not defined");
	var new_button=document.createElement("div");
	var button_inside=document.createElement("div");
	button_inside.className="button_inside";
	
	new_button.style.display="inline-block";
	var button_type_id="button_"+back+"_"+col;
	button_type_id=button_type_id.split("#").join("");
	button_type_id=button_type_id.split(")").join("");
	button_type_id=button_type_id.split("(").join("");
	button_type_id=button_type_id.split(",").join("_");
	button_type_id=button_type_id.split(".").join("_");
	new_button.className="button "+button_type_id+" slideIn";
	// add this rule to the button_styles!
	
	var str=this.style.innerHTML;
	if(str.indexOf(button_type_id)==-1)
	{
		// add this style!
		str+='.'+button_type_id+"\n";
		str+='{\n';
		str+='background-color: '+back+';\n'; 
		str+='color: '+col+';\n'; 
		str+='}\n';
		str+='.'+button_type_id+":hover\n";
		str+='{\n';
		str+='background-color: '+back2+';\n'; 
		str+='color: '+col2+';\n'; 
		str+='}\n';
		this.style.innerHTML=str;
	}
	
	new_button.style.width=250+"px";
	new_button.style.height=50+"px";
	new_button.style.lineHeight="50px";
	button_inside.innerHTML=text;
	new_button.setAttribute("name",id);
	new_button.addEventListener("click",callback.bind(bind));
	new_button.appendChild(button_inside);
	return new_button;
}
MG.buttons=new Buttons();

})();

