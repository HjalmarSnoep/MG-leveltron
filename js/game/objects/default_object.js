(function (){
		
	function GameObjectDefault()
	{
		this.x=0;
		this.y=0;
		this.dx=0;
		this.dy=0;
		this.w=32; // around for bouncing and clamps..
		this.h=32; // adounr for bouncing and clamps..
		// rect shape is based on x and y being in the middle, w en h, being around that.
		// so the rect shape is this.x-this.w/2, this.y-this.h/2,this.w,this.h
		this.collisions={};// add object types you want to collide with!
		this.event_stack=[]; // keep events for inspection
	}
	// pushes state on the stack so you can read it out if you pause the game in debug mode.
	GameObjectDefault.prototype.showHitShape=function(ctx)
	{
		ctx.strokeStyle="#f00";
		var box=this.getBox();
		ctx.strokeRect(box.x,box.y,box.w,box.h);
	};
	
	// clears the object event stack at the beginning of each cycle!
	GameObjectDefault.prototype.clearEventStack=function()
	{
		this.move_iterations=0;
		if(this.event_stack.length>0)
		{
			for(var i=0;i<this.event_stack.length;i++)
			{
				MG.game.tileEvents.event(this.event_stack[i]);
			}
		}
		this.event_stack=[]; // will be filled with all the events happening to me, this frame..
	};
	
	GameObjectDefault.prototype.unstickObject=function(tilemap)
	{
		// the object is stuck inside the level somewhere.
		// if the block we are on is solid, we are damn well stuck.
		// get the surrounding blocks..
		console.log("unstick from "+this.middle_b.x+","+this.middle_b.y);
		var normal={x:0,y:0}, tiles_found=0;
		var mid_x=(this.middle_b.x+0.5)*tilemap.tileSize.w;
		var mid_y=(this.middle_b.y+0.5)*tilemap.tileSize.h;
		for(var x=-1;x<=1;x++)
		for(var y=-1;y<=1;y++)
		{
			var b=tilemap.getTileAt(mid_x+x*tilemap.tileSize.w,mid_y+y*tilemap.tileSize.h);
			if(b.solid)
			{
				normal.x-=x;
				normal.y-=y;
			}
		}
		this.x+=normal.x*3;
		this.y+=normal.y*3;
		this.dx=normal.x*0.1;
		this.dy=normal.y*0.1;
	};
	/*
		Collision detection is NOW via the 
		The Axis Aligned Bounding Box Method.
	*/
	  // this checks if box1 overlaps/hits box2.
    GameObjectDefault.prototype.aabb=function(box1, box2) 
	{
            //{x: 320, y: 192, w: 32, h: 32} {x: 300, y: 217.5099, w: 40, h: 45}
            if ((box2.x + box2.w) > box1.x &&
                box2.x < (box1.x + box1.w) &&
                box1.y < (box2.y + box2.h) &&
                (box1.h + box1.y) > box2.y)
                return true;
            return false;
    };
	GameObjectDefault.prototype.getBox=function()
	{
		return {x:this.x-this.w/2,y:this.y-this.h/2,w:this.w,h:this.h};
	};
	
	GameObjectDefault.prototype.getRangeForBox=function(tilemap,box)
	{
		// gets the range of tiles that MIGHT intersect with the box.
		// in an array.
		var tsw=tilemap.tileSize.w;
		var tsh=tilemap.tileSize.h;
		var b=tilemap.getTileAt(box.x,box.y); // this can be optimised, but for now, it will have to do.. 
		var start_x=b.x; // check one tile more..
		var start_y=b.y; // check one tile more, the object may not have a tilesize divisible width or height.
		var end_x=start_x+Math.floor(box.w/tsw)+1; 
		var end_y=start_y+Math.floor(box.h/tsw)+1; 
		return {sx:start_x,sy:start_y,ex:end_x,ey:end_y};
	};
	
	GameObjectDefault.prototype.collideWithAllBlocks=function(tilemap,box)
	{
		// creates an array of solid blocks you are currently hitting.
		 var ar = [];
		var range=this.getRangeForBox(tilemap,box); 
		var x,y;
		for(x=range.sx;x<=range.ex;x++)
		for(y=range.sy;y<=range.ey;y++)
		{
			var b=tilemap.getTile(x,y); // WATCH OUT, NOT getTileAT!
			// if the tile is not solid, we don't have to check!
			if(b.solid)
			{
				if(this.aabb({x:b.x*tilemap.tileSize.w,y:b.y*tilemap.tileSize.h,w:tilemap.tileSize.w,h:tilemap.tileSize.h},box)) 
					ar.push(b);
			}
		}
		return ar;
	};
	
	GameObjectDefault.prototype.collideWithAnyBlock=function(tilemap,box)
	{
		// does the box hit any solid tiles boxes.
		// that's really the only thing that matters.
		// true or false is the answer

		// first we get WHICH tiles we have to check, because they might be colliding!
		var range=this.getRangeForBox(tilemap,box); 
		var x,y;
		for(x=range.sx;x<=range.ex;x++)
		for(y=range.sy;y<=range.ey;y++)
		{
			var b=tilemap.getTile(x,y); // WATCH OUT, NOT getTileAT!
			// if the tile is not solid, we don't have to check!
			if(b.solid)
			{
				if(this.aabb({x:b.x*tilemap.tileSize.w,y:b.y*tilemap.tileSize.h,w:tilemap.tileSize.w,h:tilemap.tileSize.h},box)) 
				return true;
			}
		}
		return false;
	};
	
	GameObjectDefault.prototype.moveObject=function(tilemap)
	{
		// try to get as far as possible in speed steps!
		var speed=this.objectSpeed(this);
        var i = 0, distance_to_hit, distance_object_can_travel;

        var dx = this.dx / speed; // 1pixel distance speed
        var dy = this.dy / speed;

        // this.x is middle, rounded_x = linker bovenhoek!
        rounded_x = (this.x-this.w/2); // 
        rounded_y = (this.y-this.h/2); // 

        var collision = false;
		
        // calculate if ANYwhere along the lines there is a collision.
        for (var i = 1; i < (speed + 1); i++) // we even need to do this when speed is less then 1
        {
            if (this.collideWithAnyBlock(tilemap,
                    {	x: rounded_x + i * dx,
						y: rounded_y + i * dy,
						w: this.w,
						h: this.h
					}
										)
				) 
			{
                collision = true;
                break;
            }
        }
        distance_to_hit = i;
        distance_object_can_travel = i - 1; // +/- 0.99999 pixel

        // we have calculated the point of impact!
        if (collision) {
            // take one step back, so we are in the clear again!
            if (distance_to_hit < 1) {
                // we couldn't move less than one pixel
                // we might want to check at this point if the object hasn't gotten stuck and needs unsticking..
                // check is there is STILL a hit if we DON't move....
                console.log("the distance we can move is less than one pixel");
                if (this.collideWithAnyBlock(tilemap,
							{
								x: rounded_x,
								y: rounded_y,
								w: this.w,
								h: this.h
							}
											)
					)
                {
                    // we are stuck..
					this.unstickObject(tilemap)
                    return; // we don't do anything if we cannot move for whatever reason, so the moveObject function can terminate logical..
                }

            }
            // now for the players convenience, we will check any boxes the player hits
            // for being solid and if they ARE, we will adjust the speed.
            // so we check EVERY block AGAIN.

            var position_where_we_are_good = {
                x: rounded_x + distance_object_can_travel * dx,
                y: rounded_y + distance_object_can_travel * dy,
                w: this.w,
                h: this.h
            };

            // we are sliding past the ground, wall or ceiling.
            // so only clip the dx OR dy.
            // ik ga ervan uit, dat de objecten, NIET 1x1 pixels zijn.. Dus schuin hoef ik niet te checken.
            var position_1px_right = JSON.parse(JSON.stringify(position_where_we_are_good));
            var position_1px_left = JSON.parse(JSON.stringify(position_where_we_are_good));
            var position_1px_up = JSON.parse(JSON.stringify(position_where_we_are_good));
            var position_1px_down = JSON.parse(JSON.stringify(position_where_we_are_good));
            position_1px_right.x += 1;
            position_1px_left.x -= 1;
            position_1px_up.y -= 1;
            position_1px_down.y += 1;

            var needed_to_correct = false;
            if (this.dx != 0) {
                // check left AND right positions.
                var check_collision_right = this.collideWithAllBlocks(tilemap,position_1px_right);
                // collide With Any Block returns the first block you collide with that it can find..
                if (check_collision_right.length != 0 && this.dx > 0) {
                    this.dx = Math.floor(distance_object_can_travel * dx * 0.9); // let it approach zero if hit more than once!
                    needed_to_correct = true;
                    for (var c = 0; c < check_collision_right.length; c++) {
						// create a tile event!
						var b=check_collision_right[c];
						if(typeof(b.touchEvent)!="undefined") 
							MG.game.tileEvents.event({type:b.touchEvent,impact:"left",tilemap:tilemap, activator: this, tile: b});
						// create an object event!
						if(typeof(this.collisions.hitTile)!="undefined") 
							this.event({type:"hitTile",impact:"right",tilemap:tilemap, activator: b});

                       // check_collision_right[c].dom.style.backgroundColor = "#00f";
                    }
                }
                var check_collision_left = this.collideWithAllBlocks(tilemap,position_1px_left);
                if (check_collision_left.length != 0 && this.dx < 0) {
                    this.dx = Math.ceil(distance_object_can_travel * dx * 0.9); // let it approach zero if hit more than once!
                    needed_to_correct = true;
                    for (var c = 0; c < check_collision_left.length; c++) {
						// create a tile event!
						var b=check_collision_left[c];
						if(typeof(b.touchEvent)!="undefined") 
							MG.game.tileEvents.event({type:b.touchEvent,impact:"right",tilemap:tilemap, activator: this, tile: b});
                        //check_collision_left[c].dom.style.backgroundColor = "#00f";
						if(typeof(this.collisions.hitTile)!="undefined") 
							this.event({type:"hitTile",impact:"left",tilemap:tilemap, activator: b});
                    }
                }
            }
            if (this.dy != 0) {
                // check left AND right positions.
                var check_collision_up = this.collideWithAllBlocks(tilemap,position_1px_up);
                if (check_collision_up.length != 0 && this.dy < 0) {
                    this.dy = Math.ceil(distance_object_can_travel * dy * 0.9); // let it approach zero if hit more than once!
                    needed_to_correct = true;
                    for (var c = 0; c < check_collision_up.length; c++) {
						// create a tile event!
						var b=check_collision_up[c];
						if(typeof(b.touchEvent)!="undefined") 
							MG.game.tileEvents.event({type:b.touchEvent,impact:"down",tilemap:tilemap, activator: this, tile: b});
						if(typeof(this.collisions.hitTile)!="undefined") 
							this.event({type:"hitTile",impact:"up",tilemap:tilemap, activator: b});
 
                    }
                }
                var check_collision_down = this.collideWithAllBlocks(tilemap,position_1px_down);
                if (check_collision_down.length != 0 && this.dy > 0) {
                    this.dy = Math.floor(distance_object_can_travel * dy * 0.9); // let it approach zero if hit more than once!
                    needed_to_correct = true;
                    for (var c = 0; c < check_collision_down.length; c++) {
						// create a tile event!
						var b=check_collision_down[c];
						if(typeof(b.touchEvent)!="undefined") 
							MG.game.tileEvents.event({type:b.touchEvent,impact:"up",tilemap:tilemap, activator: this, tile: b});
						if(typeof(this.collisions.hitTile)!="undefined") 
							this.event({type:"hitTile",impact:"down",tilemap:tilemap, activator: b});
                    }
                }
            }
            if (needed_to_correct) 
			{
                // we have corrected x or y
				// there is a small chance, we were heading head on for a single block.
				// test if that is the case ?
				var position_new_pos = JSON.parse(JSON.stringify(position_where_we_are_good));
				position_new_pos.x+=this.dx;
				position_new_pos.y+=this.dy;
				var hit_blocks=this.collideWithAllBlocks(tilemap,position_new_pos);
                if (hit_blocks.length != 0 && this.dy > 0) {
                    this.dx = Math.floor(distance_object_can_travel * dx * 0.9); // let it approach zero if hit more than once!
                    this.dy = Math.floor(distance_object_can_travel * dy * 0.9); // let it approach zero if hit more than once!
                    for (var c = 0; c < hit_blocks.length; c++) {
						// create a tile event!
						var b=hit_blocks[c];
						if(typeof(b.touchEvent)!="undefined") 
							MG.game.tileEvents.event({type:b.touchEvent,impact:"corner",tilemap:tilemap, activator: this, tile: b});
						if(typeof(this.collisions.hitTile)!="undefined") 
							this.event({type:"hitTile",impact:"corner",tilemap:tilemap, activator: b});
                    }
                }else
				{
					//console.log("we should recurse now.");
					if(this.move_iterations<5)
					{
						this.move_iterations++;
						this.moveObject(tilemap); // recursively retry.. stress tested this, it will NOT break, see doc.
					}else{
						console.log("something seems off."+this.move_iterations);
					}
					return;
				}
            }
        }
        this.x = Math.round(rounded_x + this.dx + this.w/2);
        this.y = Math.round(rounded_y + this.dy + this.h/2); // this.x is the middle.
	};
	
	GameObjectDefault.prototype.objectSpeed=function()
	{
		return Math.sqrt(this.dx*this.dx+this.dy*this.dy);
	};
	
	/* this is not used in the current engine, but it's such a handy normal reflection routine, I keep it :)
	GameObjectDefault.prototype.reflectObject=function(normal)
	{
		normal.x=-normal.x; // we tend to create out sticking normals..
		normal.y=-normal.y;// we tend to create out sticking normals..

		// normalise speed this!
		var speed=this.objectSpeed(this);
		if(speed==0) return this;
		var incidencethis={x:-this.dx/speed,y:-this.dy/speed}; // genormaliseerde tegengestelde this van de snelheid!
			
		var dot = incidencethis.x*normal.x + incidencethis.y*normal.y;
		// calculate reflection this
		this.dx = 2*normal.x*dot - incidencethis.x;
		this.dy = 2*normal.y*dot - incidencethis.y;
		var new_speed=this.objectSpeed(this);
		this.dx=speed*this.dx/new_speed;
		this.dy=speed*this.dy/new_speed;
	};*/
	
	GameObjectDefault.prototype.interactWithTilemap=function(tilemap)
	{
		// first determine the middle block.
		var b=tilemap.getTileAt(this.x,this.y); 
		if(JSON.stringify(this.middle_b)!=JSON.stringify(b))
		{
//			this.middle_b=b;
			// there is a structural difference between the blocks, this might just be the position, but this means we need to interact with a NEW set of blocks.
			// and generate over events.
			var range=this.getRangeForBox(tilemap,this.getBox()); 
			var x,y;
			for(x=range.sx;x<=range.ex;x++)
			for(y=range.sy;y<=range.ey;y++)
			{
				var b=tilemap.getTile(x,y); 
	//			console.log(JSON.stringify(b));
				if(typeof(b.overEvent)!="undefined") 
				{
					MG.game.tileEvents.event({type:b.overEvent,impact:"over",tilemap:tilemap, activator: this, tile: b});
					if(this.collisions.overTile==true) 
					{
						var e={type:"overTile",impact:"over",tilemap:tilemap, activator: b};
						this.event(e);
					}
				}
			}
		}
	};
	
	MG.extend(MG,"game");
	MG.extend(MG.game,"objects");
	MG.game.objects.DefaultObject=GameObjectDefault;

})();