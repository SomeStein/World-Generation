let canvas
let world
let TileSet

function preload() {
  TileSet = loadImage("TileSet.png")
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.drawingContext.imageSmoothingEnabled=false;

  background(51)
  world = new World(-width*2,-height*2,width*5,height*5,TileSet)

}

function draw() {
  //Background
  background(51)

  //PUSH TRANSFORM
  push();
  translate(transformX, transformY);
  scale(currentScale);

  //World 
  world.show()

  //POP TRANSFORM
  pop();
}

//Zooming and Translating 
const zoomSensitivity = 0.1;
const mouseDragDetectionThreshold = 5;
const scaleMin = 0.1;
const scaleMax = 10;
let currentScale = 1;
let transformX = 0;
let transformY = 0;
let mousePressedX = null;
let mousePressedY = null;

//Input Functions
function mousePressed() {
  mousePressedX = mouseX;
  mousePressedY = mouseY;
}
function mouseDragged() {
  if (dist(mousePressedX, mousePressedY, mouseX, mouseY) > mouseDragDetectionThreshold) {
    transformX += (mouseX - pmouseX);
    transformY += (mouseY - pmouseY);
  }
}
function mouseReleased() {
  mousePressedX = null;
  mousePressedY = null;
}
function mouseWheel(event) {
  // Determine the scale factor based on zoom sensitivity
  let scaleFactor = null;
  if (event.delta < 0) {
    scaleFactor = 1 + zoomSensitivity;
  } else {
    scaleFactor = 1 - zoomSensitivity;
  }

  // Apply transformation and scale incrementally if within boundary 
  if ((currentScale < scaleMax || scaleFactor < 1) && (currentScale > scaleMin || scaleFactor > 1)) {
    currentScale = currentScale * scaleFactor

    transformX = mouseX - (mouseX * scaleFactor) + (transformX * scaleFactor);
    transformY = mouseY - (mouseY * scaleFactor) + (transformY * scaleFactor);
  }

  // Disable page scroll
  return false;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
