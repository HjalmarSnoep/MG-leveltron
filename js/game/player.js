/*  The Player keeps anything we need in the game economy that we might also need outside the level . */

'use strict';

(function (){

function Player()
{
	this.score=0;
	this.coins=0; // anything you want to keep outside the actual game.
	this.inventory=[]; // anything you pick up.
};



MG.game.Player=Player; // players are there, beFORE the game initialises..

})();