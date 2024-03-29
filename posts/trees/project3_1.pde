// Based on an example written by Casey Reas and Ben Fry
// found at http://processingjs.org/learning/topic/tree/

float theta = 0;
float randAngle = random(TWO_PI / 1000);
float h = 0;

void setup() {
  size(window.innerWidth, window.innerHeight);
  stroke(50,150,50);
  strokeWeight(2);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  smooth();
}

void draw() {
  background(200,235,255);

  // Let's pick an angle 0 to 90 degrees based on the mouse position
  //theta = random(1) * PI / 2.0;

  // Start the tree from the bottom of the screen
  translate(0.58*width,height);

  // Draw a line 60 pixels
 // float h = random(1)*height/2.66;
  line(0,0,0,-h);

  // Move to the end of that line
  translate(0,-h);

  // Start the recursive branching!
  branch(h);

  h += 2;
  theta += randAngle;
  
  if(h > height / 3.0)
    noLoop();
}



void branch(float h) {
  // Each branch will be 2/3rds the size of the previous one
  h *= 0.66f;
  

  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (h > 2) {
      pushMatrix();    // Save the current state of transformation (i.e. where are we now)
      rotate(theta);   // Rotate by theta
      line(0,0,0,-h);  // Draw the branch
      translate(0,-h); // Move to the end of the branch
      branch(h);       // Ok, now call myself to draw two new branches!!
      popMatrix();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

      // Repeat the same thing, only branch off to the "left" this time!
      pushMatrix();
      rotate(-theta);
      line(0,0,0,-h);
      translate(0,-h);
      branch(h);
      popMatrix();
  }
	
}
