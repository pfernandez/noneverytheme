

int bgColor = 0;
int fgColor = 150;
float x1;
float x2;
float x3;
float x4;
float y1;
float y2;
float y3;
float y4;

void setup() {
	size(xMax, yMax, WEBGL);
	background(bgColor);
	//fill(fgColor);
	//stroke(fgColor);
	//strokeJoin(ROUND);
	//strokeCap(ROUND);
	//noStroke();
//	smooth();
	//emissive(0, 26, 51);
	//directionalLight(204, 204, 204, .5, 0, -1);
	
//	x1 = width / 2 - 5;
//	y1 = height / 2;
//	x2 = width / 2 + 5;
//	y2 = height / 2;
//	x3 = width / 2 + 10;
//	y3 = height;
//	x4 = width / 2 - 10;
//	y4 = height;
	x1 = -5;
	y1 = -height/2;
	x2 = 5;
	y2 = -height/2;
	x3 = 10;
	y3 = 0;
	x4 = -10;
	y4 = 0; 
}

void draw() {
	resizeWindow();
	tree();
}

void tree() {
	pushMatrix();
	
	translate(width/2,height);
	rotate(PI/8);
	quad(x1, y1, x2, y2, x3, y3, x4, y4);
	popMatrix();
}

//Resize the window dimensions if they has been changed.
int xMax = window.innerWidth;
int yMax = window.innerHeight;
void resizeWindow() {
	if( xMax != window.innerWidth || yMax != window.innerHeight ) {
		xMax = window.innerWidth;
		yMax = window.innerHeight;
		size(xMax, yMax);
	}
}
