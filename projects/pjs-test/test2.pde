int xMax = window.innerWidth;
int yMax = window.innerHeight;
int bgColor = 250;

void setup() {
	size(xMax, yMax);
	background(bgColor);
	stroke(0);
	rectMode(CENTER);
	noCursor();
	frameRate(10);
}

void draw() {
	resizeWindow();
	//drawTriangles();
	drawRectangles();
	fadeOut();
}

void drawRectangles() {
	rectMode(CENTER);
 	int distX = getRandomDistance(250);
 	int distY = getRandomDistance(250);
 	fill(random(255), random(255), random(255), distX);
 	rect(mouseX, mouseY, distX, distY);
}

 void drawTriangles() {
 	int distX = int(mouseX+random(50));
 	int distY = int(mouseY+random(50));
 	int signX = int(random(-3, 2));
 	int signY = int(random(-3, 2));
 	int randColor = int(random(0, 255));
 	for(int i = 1; i < random(15000); i++) {
	 	stroke(randColor,50,75,70);
	 	line(distX+i*signX, distY+i*signY, mouseX, mouseY);
	 	fill(randColor,50,150,50);
	 	ellipse(distX+i*signX, distY+i*signY, 3, 3);
 	}
 }
 
int getRandomDistance( int maxDist ) {
	if(random(10) < 5)
		return int(random(maxDist));
	else
		return -int(random(maxDist));
}

//Resize the window dimensions if it has been changed.
void resizeWindow() {
	if( xMax != window.innerWidth || yMax != window.innerHeight ) {
		xMax = window.innerWidth;
		yMax = window.innerHeight;
		size(window.innerWidth, window.innerHeight);
	}
}
 
 // adjust tracers
void fadeOut() {
	fill(bgColor, .5);
	rect(width/2, height/2, width, height);
}
