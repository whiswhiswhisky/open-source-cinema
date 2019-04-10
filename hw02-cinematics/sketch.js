let capture;
// let video;
let button;
let snapshots = [];
let croppedShots = [];
let go = false;
let width=560;
let height = 240;
let state =0;
let photos = [];
let count=0;

function setup() {
  createCanvas(560, 240);
  capture = createCapture(VIDEO,ready);
  video = createCapture(VIDEO);
  video.size(320,240);
  video.hide();
  capture.size(320, 240);
  capture.hide();
  pixelDensity(1);

  button = createButton('Normal');
  buttonA = createButton('Gray');
  buttonB = createButton('Invert');
  buttonC = createButton('Posterize');
  // buttonGo = createButton('GO TO YOUR DREAM');
  
}

function draw() {
  background(80);

  button.mousePressed(normal);
  buttonA.mousePressed(gray);
  buttonB.mousePressed(invert);
  buttonC.mousePressed(posterize);
  // buttonGo.mousePressed(dreaming)

  image(video, width/2, 0, 320, 240);
  if (state ==0){
  
  }
  else if (state ==1){
  filter('GRAY');
  } else if(state == 2){
   filter('INVERT'); 
  } else if (state ==3){
   filter(POSTERIZE,3); 
  }
  
  noFill();
  stroke(255);
  rect(mouseX-31,mouseY-31,62,62);
  
  let w = 40;
  let h = 40;
  let x = 0;
  let y = 0;
  
  for (let i =0;i<croppedShots.length;i++){
    let img = croppedShots[i];
    image(img,x,y,w,h);
  
    x+=w;
    if (x >= 280){
      x=0;
      y+=h;
    }
    
    if(y>height){
      y=0;
      x+=w;
    }
    
  }
  
}

function mousePressed(){
 if (mouseX>280){
   takesnap();
 }
}

function normal(){
  state = 0;
}

function gray(){
  state = 1;
}

function invert(){
 state=2; 
}

function posterize(){
 state=3; 
}

function takesnap(){
  if(go){
    let currentSnap = capture.get();
    snapshots.push(currentSnap);

    let sample = get(mouseX-30,mouseY-30,60,60);
    croppedShots.push(sample);

    photos.push(sample);
    console.log(photos);
    
    let name = count.toString();
    sample.save(name,'png');
    count++;
  }
}

function download(link, id, filename){
  link.href = document.getElementById(id).toDataURL();
  link.download = filename;
}

function ready(){
  go = true;
}

function dreaming(){
    console.log("clicked!")
}