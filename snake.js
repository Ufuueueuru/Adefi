var bub; //x,y,size,color,xvol,yvol
var wid;
var hit;
var x = 0;
var y = 0;
var siz = 10;
var lose = 0;
var rand = 0;
var pause = 0;
var keys = [];
var wait = 0;

function p5Color(r, g, b) {
	this.red = r;
	this.green = g;
	this.blue = b;
}

function keyPressed() {
	keys[keyCode] = true;
};

function keyReleased() {
	keys[keyCode] = false;
};

function setup() {
	wid = windowWidth / 2;
	hit = windowHeight / 2;
	bub = [
		[-10, random(0, windowHeight), random(1, 30), new p5Color(random(0, 255), random(0, 255), random(0, 255)), random(0.1, 2), random(-2, 2)]
	];
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0, 0, 0);
	if(lose === 0) {
		if(pause === 0) {
			textAlign(CENTER, CENTER);
			y = pmouseY;
			x = pmouseX;
			fill(255, 255, 255);
			noStroke();
			ellipse(x, y, siz, siz);
			for(var i = bub.length - 1; i >= 0; i--) {
				fill(bub[i][3].red, bub[i][3].green, bub[i][3].blue);
				ellipse(bub[i][0], bub[i][1], bub[i][2], bub[i][2]);
				bub[i][0] += bub[i][4];
				bub[i][1] += bub[i][5];
				rand = round(random(1, 4));
				if(random(0, 70) > 65 && bub.length < (windowWidth + windowHeight) / 48) {
					if(rand === 1) {
						bub.push([-siz * 3 / 2, random(0, windowHeight), random(log(siz) / 5, siz * 3), new p5Color(random(0, 255), random(0, 255), random(0, 255)), random(0.1, 2), random(-2, 2)]);
					}
					if(rand === 2) {
						bub.push([random(0, windowWidth), -siz * 3 / 2, random(log(siz) / 5, siz * 3), new p5Color(random(0, 255), random(0, 255), random(0, 255)), random(-2, 2), random(0.1, 2)]);
					}
					if(rand === 3) {
						bub.push([windowWidth + siz * 3 / 2, random(0, windowHeight), random(log(siz) / 5, siz * 3), new p5Color(random(0, 255), random(0, 255), random(0, 255)), random(-0.1, -2), random(-2, 2)]);
					}
					if(rand === 4) {
						bub.push([random(0, windowWidth), windowHeight + siz * 3 / 2, random(log(siz) / 5, siz * 3), new p5Color(random(0, 255), random(0, 255), random(0, 255)), random(-2, 2), random(-0.1, -2)]);
					}
				}
				if(dist(x, y, bub[i][0], bub[i][1]) <= siz / 2 + bub[i][2] / 2) {
					if(siz < bub[i][2]) {
						lose = 1;
					}
					if(siz >= bub[i][2]) {
						siz += bub[i][2] / 10;
						bub.splice(i, 1);
					}
				}
				if(bub[i][0] < -1 - siz * 3 / 2 || bub[i][0] > windowWidth + 1 + siz * 3 / 2 || bub[i][1] < -1 - siz * 3 / 2 || bub[i][1] > windowHeight + 1 + siz * 3 / 2) {
					bub.splice(i, 1);
				}
			}
			if(keys[32] && wait === 0) {
				pause = 1;
				wait = 1;
			}
			if(keys[32] === false) {
				wait = 0;
			}
		} else {
			for(var i = bub.length-1; i >= 0; i--) {
				fill(bub[i][3].red, bub[i][3].green, bub[i][3].blue);
				ellipse(bub[i][0], bub[i][1], bub[i][2], bub[i][2]);
			}
			fill(255);
			ellipse(x, y, siz, siz);
			textSize(50);
			fill(255, 255, 255);
			text("pause", wid, hit);
			if(keys[32] && wait === 0) {
				pause = 0;
				wait = 1;
			}
			if(keys[32] === false) {
				wait = 0;
			}
		}
	} else {
		fill(255, 255, 255);
		textSize(50);
		text("You Lose!", wid, hit);
		textSize(20);
		text(floor(siz) + " Points\n(click to try again)", wid, hit + 50);
		if(mouseIsPressed) {
			bub = [
				[-10, random(0, windowHeight), random(1, 30), new p5Color(random(0, 255), random(0, 255), random(0, 255)), random(0.1, 2), random(-2, 2)]
			];
			x = mouseX;
			y = mouseY;
			siz = 10;
			lose = 0;
			rand = 0;
			pause = 0;
			keys = [];
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth-2, windowHeight-2);
	wid = windowWidth / 2;
	hit = windowHeight / 2;
}
