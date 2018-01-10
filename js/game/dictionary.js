'use strict';

(function (){
		
function Dictionary()
{
	this.dictionary=[];
	this.dictionary.push({map:"none",id:"air",material:"air"}); // this will not end up in the object list, it's just the erase tool.
	// so actually object 0 means, we have NO object.
	// this makes for nice tests, like 'if(object_index)' 
		
	var cover_4x1=[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}];
	var cover_1x4=[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3}];
	var cover_2x1=[{x:0,y:0},{x:1,y:0}];
	var cover_1x2=[{x:0,y:0},{x:0,y:1}];
	var cover_1x1=[{x:0,y:0}];

	this.dictionary.push({map:"tiles_earth",anim:"4x1",f:0,cover: cover_4x1,id:"earth_4x1",material:"earth"});
	this.dictionary.push({map:"tiles_earth",anim:"1x4",f:0,cover: cover_1x4,id:"earth_1x4",material:"earth"});
	this.dictionary.push({map:"tiles_earth",anim:"2x1",f:0,cover: cover_2x1,id:"earth_2x1",material:"earth"});
	this.dictionary.push({map:"tiles_earth",anim:"1x2",f:0,cover: cover_1x2,id:"earth_1x2",material:"earth"});
	this.dictionary.push({map:"tiles_earth",anim:"1x1",f:0,cover: cover_1x1,id:"earth_1x1",material:"earth"});
	this.dictionary.push({map:"tiles_earth",anim:"4x1",f:1,cover: cover_4x1,id:"dirt_4x1",material:"dirt"});
	this.dictionary.push({map:"tiles_earth",anim:"1x4",f:1,cover: cover_1x4,id:"dirt_1x4",material:"dirt"});
	this.dictionary.push({map:"tiles_earth",anim:"2x1",f:1,cover: cover_2x1,id:"dirt_2x1",material:"dirt"});
	this.dictionary.push({map:"tiles_earth",anim:"1x2",f:1,cover: cover_1x2,id:"dirt_1x2",material:"dirt"});
	this.dictionary.push({map:"tiles_earth",anim:"1x1",f:1,cover: cover_1x1,id:"dirt_1x1",material:"dirt"});
	
	this.dictionary.push({map:"tiles_iron",anim:"4x1",f:0,cover: cover_4x1,id:"iron_4x1",material:"metal"});
	this.dictionary.push({map:"tiles_iron",anim:"1x4",f:0,cover: cover_1x4,id:"iron_1x4",material:"metal"});
	this.dictionary.push({map:"tiles_iron",anim:"2x1",f:0,cover: cover_2x1,id:"iron_2x1",material:"metal"});
	this.dictionary.push({map:"tiles_iron",anim:"1x2",f:0,cover: cover_1x2,id:"iron_1x2",material:"metal"});
	this.dictionary.push({map:"tiles_iron",anim:"1x1",f:0,cover: cover_1x1,id:"iron_1x1",material:"metal"});
	this.dictionary.push({map:"tiles_brick",anim:"4x1",f:0,cover: cover_4x1,id:"brick_4x1",material:"brick"});
	this.dictionary.push({map:"tiles_brick",anim:"1x4",f:0,cover: cover_1x4,id:"brick_1x4",material:"brick"});
	this.dictionary.push({map:"tiles_brick",anim:"2x1",f:0,cover: cover_2x1,id:"brick_2x1",material:"brick"});
	this.dictionary.push({map:"tiles_brick",anim:"1x2",f:0,cover: cover_1x2,id:"brick_1x2",material:"brick"});
	this.dictionary.push({map:"tiles_brick",anim:"1x1",f:0,cover: cover_1x1,id:"brick_1x1",material:"brick"});
	this.dictionary.push({map:"tiles_stone",anim:"4x1",f:0,cover: cover_4x1,id:"stone_4x1",material:"stone"});
	this.dictionary.push({map:"tiles_stone",anim:"1x4",f:0,cover: cover_1x4,id:"stone_1x4",material:"stone"});
	this.dictionary.push({map:"tiles_stone",anim:"2x1",f:0,cover: cover_2x1,id:"stone_2x1",material:"stone"});
	this.dictionary.push({map:"tiles_stone",anim:"1x2",f:0,cover: cover_1x2,id:"stone_1x2",material:"stone"});
	this.dictionary.push({map:"tiles_stone",anim:"1x1",f:0,cover: cover_1x1,id:"stone_1x1",material:"stone"});
	this.dictionary.push({map:"tiles_wood",anim:"4x1",f:0,cover: cover_4x1,id:"wood_4x1",material:"wood"});
	this.dictionary.push({map:"tiles_wood",anim:"1x4",f:0,cover: cover_1x4,id:"wood_1x4",material:"wood"});
	this.dictionary.push({map:"tiles_wood",anim:"2x1",f:0,cover: cover_2x1,id:"wood_2x1",material:"wood"});
	this.dictionary.push({map:"tiles_wood",anim:"1x2",f:0,cover: cover_1x2,id:"wood_1x2",material:"wood"});
	this.dictionary.push({map:"tiles_wood",anim:"1x1",f:0,cover: cover_1x1,id:"wood_1x1",material:"wood"});
	this.dictionary.push({map:"human",anim:"levelmaker",f:0,cover:cover_1x1,id:"human"}); // indicator for a active object..
	this.dictionary.push({map:"cow",anim:"levelmaker",f:0,cover:cover_1x1,id:"cow"}); // indicator for a active object..

}

Dictionary.prototype.get=function()
{
	return this.dictionary;
}

Dictionary.prototype.getIndexFromId=function(id)
{
	//console.log("Dictionary getIndexFromId: "+id);
	var i;
	for(i=0;i<this.dictionary.length;i++)
	{
		if(this.dictionary[i].id==id) return i;
	}
	return -1;
}

MG.extend(MG,"game");
MG.game.dictionary=new Dictionary();

})();