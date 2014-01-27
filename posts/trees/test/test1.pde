

int xMax = window.innerWidth;
int yMax = window.innerHeight;
int bgColor = 250;

//var overlayMsg = document.getElementById('over').innerHTML +
//	"<h4>Click anywhere on the canvas to pause and hide this panel.</h4>";
//document.getElementById('over').innerHTML = overlayMsg;

//var posX = 0;
//var posY = 0;
//document.onmousemove = setMouseXY;

void setup() {
	size(xMax, yMax);
	background(bgColor);
	stroke(0);
	rectMode(CENTER);
	noCursor();
	//frameRate(10);
}

void draw() {
	resizeWindow();
	drawTriangles();
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

//// press any key to pause
//boolean pause = false;
//void mouseClicked() {
//  pause = ! pause;
//  if ( pause ) {
//    noLoop();
//    document.getElementById('over').innerHTML = "";
//   }
//  else {
//    loop();
//    document.getElementById('over').innerHTML = overlayMsg;
//  }
//}


////NEEDS WORK. Maybe just try jquery (again.)
////Best would be to do it all in processing.
//function setMouseXY(e) {
//// Thanks to http://www.quirksmode.org/js/events_properties.html
//// for this function to retrieve mouse position with Javascript.
//	if (!e)
//		var e = window.event;
//	if (e.pageX || e.pageY) {
//		posX = e.pageX;
//		posX = e.pageY;
//	}
//	else if (e.clientX || e.clientY) {
//		posX = e.clientX + document.body.scrollLeft
//			+ document.documentElement.scrollLeft;
//		posX = e.clientY + document.body.scrollTop
//			+ document.documentElement.scrollTop;
//	}
//}

