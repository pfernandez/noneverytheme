

int bgColor = 150;
float x1;
float x2;
float y1;
float y2;

void setup() {
	size(xMax, yMax);
	background(bgColor);
	
	x1 = width / 2;
	x2 = x1;
	y1 = height;
	y2 = height / 2;
}

void draw() {
	resizeWindow();
	basicSteps();
}

void basicSteps() {
		
		//draw the next segment
		line(x1, y1, x2, y2);
		
		//if the last move was vertical
		if(x1 == x2){
				x2 /= 2;
				y1 = y2;
		}
		//if it was horizontal
		else {
				x1 = x2;
				y2 /= 2;
		}
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