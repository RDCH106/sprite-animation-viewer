// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function () {
			
	var mySprite,
		mySpriteImage,
		canvas;

	var	nextState = null;
	var initialized = 0;					

	document.onkeydown = checkKey;

	function checkKey(e) {

    	e = e || window.event;

    	if (e.keyCode == '38') {
        	// up arrow
        	console.log("Up");
    	}
    	else if (e.keyCode == '40') {
        	// down arrow
        	console.log("Sown");
    	}
    	else if (e.keyCode == '37') {
       		// left arrow
       		console.log("Left");
       		nextState = "left";
    	}
    	else if (e.keyCode == '39') {
      	 	// right arrow
      	 	console.log("Right");
      	 	nextState = "right";
    	}
    	else if (e.keyCode == '65') {
      	 	// right arrow
      	 	console.log("A");
      	 	nextState = "a";
    	}
    	else if (e.keyCode == '83') {
      	 	// right arrow
      	 	console.log("s");
      	 	nextState = "s";
    	}	

	}
	
	function init () {

		mySprite.update();
		mySprite.render();

	}

	function gameLoop () {
	
	  if(initialized == 0){
	  	init();
	  	initialized = 1;
	  }

	  window.requestAnimationFrame(gameLoop);

	  if(nextState == null){}
	  else if(nextState == "a"){

	  	mySprite.update();
	  	mySprite.render();

	  }else if(nextState == "s"){

	  	nextState = null;

	  }else if(nextState == "right"){

	  	if (mySprite.getFrameIndex() < mySprite.getNumberOfFrames() - 1) {	
            // Go to the next frame
            mySprite.setFrameIndex (mySprite.getFrameIndex()+1);
        } else {
            mySprite.setFrameIndex(0);
        }

        mySprite.render();
        nextState = null;

	  }else if(nextState == "left"){

	  	if (mySprite.getFrameIndex() > 0) {	
            // Go to the previous frame
            mySprite.setFrameIndex (mySprite.getFrameIndex()-1);
        } else {
            mySprite.setFrameIndex(mySprite.getNumberOfFrames() - 1);
        }

        mySprite.render();
        nextState = null;

	  }
	  
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.getFrameIndex = function () {
			return frameIndex;
		}

		that.setFrameIndex = function (frame) {
			frameIndex = frame;
		}

		that.getNumberOfFrames = function () {
			return numberOfFrames;
		}

		that.setNumberOfFrames = function (frames) {
			numberOfFrames = frames;
		}

		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);
		  
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};
		
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("mySpriteAnimation");
	canvas.width = 100;
	canvas.height = 100;
	
	// Create sprite sheet
	mySpriteImage = new Image();	
	
	// Create sprite
	mySprite = sprite({
		context: canvas.getContext("2d"),
		width: 1000,
		height: 100,
		image: mySpriteImage,
		numberOfFrames: 10,
		ticksPerFrame: 4
	});
	
	// Load sprite sheet
	mySpriteImage.addEventListener("load", gameLoop);
	mySpriteImage.src = "images/coin-sprite-animation.png";

} ());

