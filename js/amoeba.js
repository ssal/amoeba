
//dom
var canvas;

//var settings;

var MUTATION_COUNT_slider;
var MAX_B_slider;
var RESOLUTION_slider;
var SYNCRONIZE_WITH_TIME_COUNT_slider;
var SPEED_slider;

//settings
var GIF = false;


//static
var MAX_MUTATION_COUNT = 16;
var DEFAULT_MUTATION_COUNT = 16;

var MAX_MAX_B = 16;
var DEFAULT_MAX_B = 4;

var DEFAULT_FRAMERATE = 30;


//tweakables
var MUTATION_COUNT = 4;

var MAX_B = 4;
var B_ONLY_POWERS_OF_TWO = true; //uses MAX_B as the 


var MUTATION_SINE_A_RANDOMS = [];
var MUTATION_SINE_B_RANDOMS = [];
var MUTATION_SINE_BC_RANDOMS = [];

var SYNCRONIZE_WITH_TIME_COUNT = 3;



var SIZE;

var MAX_A = MUTATION_COUNT*8;

var RESOLUTION = 180;

var SPEED = DEFAULT_FRAMERATE;


var backgroundColor = "#ECDDC4";
var currentFill;


function setup(){
  
  canvas = createCanvas(windowWidth, windowHeight);
  
  frameRate(DEFAULT_FRAMERATE);

    /*
  settings = createDiv("");
  settings.position(25, 25);
  settings.id("settings");
  
  ≈ = createSlider(1, MAX_MUTATION_COUNT, 4);
  MUTATION_COUNT_slider.parent("settings");
  MUTATION_COUNT_slider.class("slider");

  MAX_B_slider = createSlider(1, MAX_MAX_B, DEFAULT_MAX_B);
  MAX_B_slider.parent("settings");
  MAX_B_slider.class("slider");

  RESOLUTION_slider = createSlider(2, 360, 360);
  RESOLUTION_slider.parent("settings");
  RESOLUTION_slider.class("slider");

  SYNCRONIZE_WITH_TIME_COUNT_slider = createSlider(0, MAX_MUTATION_COUNT, 3);
  SYNCRONIZE_WITH_TIME_COUNT_slider.parent("settings");
  SYNCRONIZE_WITH_TIME_COUNT_slider.class("slider");
  */

  MUTATION_COUNT_slider = document.getElementById('MUTATION_COUNT_slider');
  MAX_B_slider = document.getElementById('MAX_B_slider');
  RESOLUTION_slider = document.getElementById('RESOLUTION_slider');
  SYNCRONIZE_WITH_TIME_COUNT_slider = document.getElementById('SYNCRONIZE_WITH_TIME_COUNT_slider');
  SPEED_slider = document.getElementById('SPEED_slider');

  initialize();


  stroke(0);
  strokeJoin(ROUND);
  
  noFill();
  
  background(backgroundColor);
  
  smooth(8);
  
  randomize();

  
}

function initialize(){

  SIZE = ((width + height)/2)/6;
  strokeWeight(SIZE*4/32);

}


function MUTATION_COUNT_change(){ MUTATION_COUNT = MUTATION_COUNT_slider.value }
function MAX_B_change(){ MAX_B = MAX_B_slider.value }
function RESOLUTION_change(){ RESOLUTION = RESOLUTION_slider.value }
function SYNCRONIZE_WITH_TIME_COUNT_change(){ SYNCRONIZE_WITH_TIME_COUNT = SYNCRONIZE_WITH_TIME_COUNT_slider.value }
function SPEED_change(){ SPEED = SPEED_slider.value }

function draw(){
  console.log(frameRate());
  
  push();

  translate(width/2, height/2);
  
  if(frameCount % 60 == 1)
  {
    //randomize();
    currentFill = color(random(255), random(255), random(255))
  }

  
  
  background(backgroundColor);
  

  beginShape();
  
  for(var theta = 0; theta <= TWO_PI; theta += TWO_PI/RESOLUTION){
    
    var r = f(theta);

    fill(currentFill);
    
    vertex(r*cos(theta), r*sin(theta));
    
  }
  
  endShape(CLOSE);
  
  
  if(GIF){
    
    //saveFrame("colored1/####.tif");
  
    //if(radians(frameCount) >= PI) exit();
    
  }

  pop();
  
}


function windowResized(){

  resizeCanvas(windowWidth, windowHeight);

  initialize();

  draw();

}


function randomize(){
  
  MUTATION_SINE_A_RANDOMS = [];
  MUTATION_SINE_B_RANDOMS = [];
  MUTATION_SINE_BC_RANDOMS = [];
   
  for(var i = 0; i < MAX_MUTATION_COUNT; ++i){

    MUTATION_SINE_A_RANDOMS.push(random(1));
    //if(B_ONLY_POWERS_OF_TWO) MUTATION_SINE_B_RANDOMS.push(pow(2,(int)random(MAX_B)));
    //else 
    MUTATION_SINE_B_RANDOMS.push(round(MAX_B*random(1)));
    MUTATION_SINE_BC_RANDOMS.push(random(0));
    
  }
  
  
  //MAX_AMPLITUDE = SIZE;
}


function f(x){
  
  var y = 1;
  
  for(var i = 0; i < MUTATION_COUNT; ++i){
    if(i < SYNCRONIZE_WITH_TIME_COUNT) y *= MAX_A*pow(2, -(i+1))*MUTATION_SINE_A_RANDOMS[i]*sin(MUTATION_SINE_B_RANDOMS[i]*x + radians(frameCount*SPEED/DEFAULT_FRAMERATE) + MUTATION_SINE_BC_RANDOMS[i]);
    else y *= MAX_A*pow(2, -(i+1))*MUTATION_SINE_A_RANDOMS[i]*sin(MUTATION_SINE_B_RANDOMS[i]*x + MUTATION_SINE_BC_RANDOMS[i]);
    
  }
  
  return y + SIZE;
  
}