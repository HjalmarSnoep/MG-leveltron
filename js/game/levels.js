/* keep controls and other stuf from the players */

'use strict';

(function (){
	
function Levels()
{
	var level=1;
	this.levels=[];
	
	// the meaning of the tiles.
	var dictionary_normal=[
        {col: '#aaf', solid: false}, // 0, just air!
        {col: '#aff', solid: false}, // 1, just air
        {col: '#300',solid: true},  // 2, just a wall
        {col: 'rgba(121, 220, 242, 0.4)', overEvent: 'water', solid: false}, // 3= water
        {col: '#ff0' ,overEvent: "coin", solid: false}, // 4,coins
        {col: '#f0f',solid: true}, // 5, trampoline 
        {col: '#000',solid: true,touchEvent: "trampoline"}, // 6 trampoline
        {col: '#73C6FA',solid: false,touchEvent: "Change Color"}, //7
        {col: '#FADF73',solid: false,overEvent: 'next_level'}, //8
        {col: '#C93232',solid: false,overEvent: 'death'}, //9
        {col: '#555',solid: true,touchEvent: "locks"}, // unlockable! //10
        {col: '#0FF',solid: false,overEvent: 'unlock'}]; //11

	// we have some environments that we define here..
		
	var environment_normal={
		
		/* gravity */
		gravity: 
		{
			x: 0,
			y: 0.3
		},
    
		/* Friction */
		friction: {
			x: 0.99,
			y: 0.99
		},
		/* Velocity limits */
		vel_limit: {
			x: 2,
			y: 16
		},

		/* Acceleration when the key is pressed */
		movement_speed: {
			jump: 6,
			left: 0.3,
			right: 0.3
		}
	}
	
	//  _   _  _____ _    _   _                    _ 
    // | \ | ||  ___| |  | | | |                  | |
	// |  \| || |__ | |  | | | |     _____   _____| |
	// | . ` ||  __|| |/\| | | |    / _ \ \ / / _ \ |
	// | |\  || |___\  /\  / | |___|  __/\ V /  __/ |
	// \_| \_/\____/ \/  \/  \_____/\___| \_/ \___|_|	
	//
	this.levels[level]={
	id: "level"+level,
	w: 13,
	h: 10,
    /* An array representing the map tiles. Each number corresponds to a key */
    	data: [
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			[2, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2]
			],

		environment: environment_normal,
		dictionary: dictionary_normal,
		/* The coordinates at which tile the player spawns and the col of the player */
		player: {
			x: 2,
			y: 2
		}
	}; 
	
	
	// end of level 1

	
	//  _   _  _____ _    _   _                    _ 
    // | \ | ||  ___| |  | | | |                  | |
	// |  \| || |__ | |  | | | |     _____   _____| |
	// | . ` ||  __|| |/\| | | |    / _ \ \ / / _ \ |
	// | |\  || |___\  /\  / | |___|  __/\ V /  __/ |
	// \_| \_/\____/ \/  \/  \_____/\___| \_/ \___|_|	
	//
	level++;// voorbeeld.
	this.levels[level]={
		id: "level"+level,
		w: 40,
		h: 60,
		data: [
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			[2, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
			[2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 2, 2, 2]
			],
		environment: environment_normal,
		dictionary: dictionary_normal,
	}; 
	
	
}
Levels.prototype.getData=function(nr)
{
	if(nr<1)nr=1;
	if(nr>(this.levels.length-1))nr=this.levels.length-1;
	return JSON.parse(JSON.stringify(this.levels[nr])); // deepclone the object, to avoid contamination.
};

Levels.prototype.getEnvironmentData=function(label)
{
	return JSON.parse(JSON.stringify(this.environment[label])); // deepclone the object, to avoid contamination.
};

MG.extend(MG,"game");
MG.game.levels=new Levels();
})();

