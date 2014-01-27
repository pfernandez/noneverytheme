/* @pjs preload="
    bodies/18.jpg, bodies/19.jpg, bodies/20.jpg, bodies/21.jpg,
    bodies/22.jpg, bodies/23.jpg, bodies/24.jpg, bodies/25.jpg,
    bodies/26.jpg, bodies/27.jpg, bodies/28.jpg, bodies/29.jpg,
    bodies/30.jpg, bodies/31.jpg, bodies/32.jpg, bodies/33.jpg,
    bodies/34.jpg, bodies/35.jpg, bodies/36.jpg, bodies/37.jpg
";*/


/*
    bodies/10.jpg, bodies/11.jpg, bodies/12.jpg, bodies/13.jpg,
    bodies/14.jpg, bodies/15.jpg, bodies/16.jpg, bodies/17.jpg,
    bodies/38.jpg, bodies/39.jpg";
*/


PImage img;

float imgAdimX;
float imgAdimY;
float imgBdimX;
float imgBdimY;
float aPosX;
float aPosY;
float aDimX;
float aDimY;
float bPosX;
float bPosY;
float bDimX;
float bDimY;
int xMax = window.innerWidth;
int yMax = window.innerHeight;
int bgColor = 250;



void setup() {
	size(xMax, yMax);
	background(bgColor);
	stroke(0);
	rectMode(CENTER);
	frameRate(10);
	
	imageMode(CENTER);
	aPosX = width/2.0;
  	aPosY = height/2.0;
	bPosX = width/2.0;
  	bPosY = height/2.0;
}

void draw() {
    int n = int(random(18, 37));
	img = loadImage("bodies/" + n + ".jpg");
    image(img, aPosX, aPosY, xMax, yMax);
    //println(n);
    // fadeOut();
}



void showImages() {
	image(a, aPosX, aPosY, aDimX, aDimY);
	image(b, bPosX, bPosY, bDimX, bDimY);
}

void setImgPositions() {
	aPosX = mouseX;
	aPosY = height/2;
	bPosX = width-mouseX;
	bPosY = height/2;
}

void setImgDimensions() {
	aDimX = mouseY / height * imgAdimX;
	aDimY = mouseY / height * imgAdimY;
	bDimX = (height-mouseY) / height * imgBdimX;
	bDimY =  (height-mouseY) / height * imgBdimY;
}

void drawRectangles() {
	rectMode(CENTER);
 	int distX = getRandomDistance(250);
 	int distY = getRandomDistance(250);
 	//fill(random(255), random(255), random(255), distX);
 	fill(0, 0, 0, distX);
 	rect(mouseX, mouseY, distX, distY);
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
