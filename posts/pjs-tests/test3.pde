/* @pjs preload="test_a.jpg, test_b.jpg"; */
PImage a;
PImage b;


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
	
	imageMode(CENTER);
	a = loadImage("test_a.jpg");
	b = loadImage("test_b.jpg");
	imgAdimX = a.width;
	imgAdimY = a.height;
	imgBdimX = b.width;
	imgBdimY = b.height;
	aPosX = width/2.0;
  	aPosY = height/2.0;
	bPosX = width/2.0;
  	bPosY = height/2.0;
}

void draw() {
	resizeWindow();
	background(bgColor);
	setImgPositions();
	setImgDimensions();
	showImages();
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

//Resize the window dimensions if it has been changed.
void resizeWindow() {
	if( xMax != window.innerWidth || yMax != window.innerHeight ) {
		xMax = window.innerWidth;
		yMax = window.innerHeight;
		size(window.innerWidth, window.innerHeight);
	}
}

