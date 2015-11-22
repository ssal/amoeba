
//dom
var canvas;

//var settings;

var MUTATION_COUNT_slider;
var MAX_B_slider;
var RESOLUTION_slider;
var SYNCRONIZE_WITH_TIME_COUNT_slider;
var SPEED_slider;
var AMPLITUDE_slider;

//settings
var GIF = false;


//static
var MIN_MUTATION_COUNT = 1;
var MAX_MUTATION_COUNT = 16;
var DEFAULT_MUTATION_COUNT = 4;

var MIN_MAX_B = 1;
var MAX_MAX_B = 16;
var DEFAULT_MAX_B = 4;

var MIN_RESOLUTION = 1;
var MAX_RESOLUTION = 360;
var DEFAULT_RESOLUTION = 360;

var MIN_SYNCRONIZE_WITH_TIME_COUNT = 0;
var MAX_SYNCRONIZE_WITH_TIME_COUNT = MAX_MUTATION_COUNT;
var DEFAULT_SYNCRONIZE_WITH_TIME_COUNT = 3;

var MIN_SPEED = 0;
var MAX_SPEED = 150;
var DEFAULT_SPEED = 30;

var MIN_AMPLITUDE = 1;
var MAX_AMPLITUDE = 100;
var DEFAULT_AMPLITUDE = 50;


var DEFAULT_FRAMERATE = 30;


//tweakables
var MUTATION_COUNT = DEFAULT_MUTATION_COUNT;

var MAX_B = 4;
var B_ONLY_POWERS_OF_TWO = false; //uses MAX_B as the exponent of 2 (b = 2^MAX_B)

var RESOLUTION = DEFAULT_RESOLUTION;

var SYNCRONIZE_WITH_TIME_COUNT = DEFAULT_SYNCRONIZE_WITH_TIME_COUNT;

var SPEED = DEFAULT_FRAMERATE;

var AMPLITUDE = DEFAULT_AMPLITUDE;

var MUTATION_SINE_A_RANDOMS = [];
var MUTATION_SINE_B_RANDOMS = [];
var MUTATION_SINE_BC_RANDOMS = [];



var SIZE;

//var MAX_A = MUTATION_COUNT*8;



var backgroundColor = "#ECDDC4";
var currentFill;



function setup(){
  
  canvas = createCanvas(windowWidth, windowHeight);
  
  frameRate(DEFAULT_FRAMERATE);


  MUTATION_COUNT_slider = document.getElementById('MUTATION_COUNT_slider');
  MAX_B_slider = document.getElementById('MAX_B_slider');
  RESOLUTION_slider = document.getElementById('RESOLUTION_slider');
  SYNCRONIZE_WITH_TIME_COUNT_slider = document.getElementById('SYNCRONIZE_WITH_TIME_COUNT_slider');
  SPEED_slider = document.getElementById('SPEED_slider');
  AMPLITUDE_slider = document.getElementById('AMPLITUDE_slider');

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
function RESOLUTION_change(){ RESOLUTION = RESOLUTION_slider.value}
function SYNCRONIZE_WITH_TIME_COUNT_change(){ SYNCRONIZE_WITH_TIME_COUNT = SYNCRONIZE_WITH_TIME_COUNT_slider.value }
function SPEED_change(){ SPEED = SPEED_slider.value }
function AMPLITUDE_change(){ AMPLITUDE = AMPLITUDE_slider.value }


function draw(){
  
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

  console.log(AMPLITUDE);
  
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

    MUTATION_SINE_A_RANDOMS.push(random(1)*pow(2, -(i+1)));
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
    if(i < SYNCRONIZE_WITH_TIME_COUNT) y *= AMPLITUDE*MUTATION_SINE_A_RANDOMS[i]*sin(MUTATION_SINE_B_RANDOMS[i]*x + radians(frameCount*SPEED/DEFAULT_FRAMERATE) + MUTATION_SINE_BC_RANDOMS[i]);
    else y *= AMPLITUDE*MUTATION_SINE_A_RANDOMS[i]*sin(MUTATION_SINE_B_RANDOMS[i]*x + MUTATION_SINE_BC_RANDOMS[i]);
    
  }
  
  return y + SIZE;
  
}