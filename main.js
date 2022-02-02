var song="";
var leftwrist_y=0;
var leftwrist_x=0;
var rightwrist_x=0;
var rightwrist_y=0;
var score_leftwrist=0;
var score_rightwrist=0;


function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotposes);
}

function draw(){
image(video,0,0,600,500);
fill("#fcba03");
stroke("#092101");
if(score_rightwrist>0.2){
circle(rightwrist_x,rightwrist_y,20);
if(rightwrist_y>0&&rightwrist_y<=100){
document.getElementById("speed").innerHTML="speed=0.5px";
song.rate(0.5);
}
else if(rightwrist_y>100&&rightwrist_y<=200){
document.getElementById("speed").innerHTML="speed=1px";
song.rate(1);
}
else if(rightwrist_y>200&&rightwrist_y<=300){
    document.getElementById("speed").innerHTML="speed=1.5px";
    song.rate(1.5);
}
else if(rightwrist_y>300&&rightwrist_y<=400){
    document.getElementById("speed").innerHTML="speed=2px";
    song.rate(2);
}
else if(rightwrist_y>400&&rightwrist_y<=500){
    document.getElementById("speed").innerHTML="speed=2.5px";
    song.rate(2.5);
}}

if(score_leftwrist>0.2){

circle(leftwrist_x,leftwrist_y,20);
number_1=Number(leftwrist_y) ;
remove_decimals=floor(number_1);
volume1=remove_decimals/1000;
volume=volume1*2;
document.getElementById("volume").innerHTML="volume: "+volume;
song.setVolume(volume);
}
}

function preload(){
    song=loadSound("sound.mp3");

}

function play(){
    song.play();
song.setVolume(0.5);
song.rate(1);    

}

function stop(){
    song.stop();

}

function modelLoaded(){
    console.log("Posenet is intialized");
}

function gotposes(results){
if(results.length>0){
console.log(results);

score_rightwrist=results[0].pose.keypoints[10].score;
console.log("score_rightwrist="+score_rightwrist);
score_leftwrist=results[0].pose.keypoints[9].score;
console.log("Score Leftwrist= "+score_leftwrist);
leftwrist_x=results[0].pose.leftWrist.x;
leftwrist_y=results[0].pose.leftWrist.y;
console.log("Leftwrist y="+leftwrist_y);
console.log("Leftwrist x="+leftwrist_x);
rightwrist_x=results[0].pose.rightWrist.x;
rightwrist_y=results[0].pose.rightWrist.y;
console.log("Rightwrist y="+rightwrist_y);
console.log("Rightwrist x" +rightwrist_x);

}
}


