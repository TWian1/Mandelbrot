document.getElementById("canvas");
document.getElementById("zoom");
const ctx = canvas.getContext("2d");
var iterationsc = 600; // iterations
let zoom1 = 1; // initial zoom
function generate(zoom){
  let xoff = -(3/4); //x offset
  let yoff = 0;  // y offset
  let size = 1900; // size (also change html canvas size)
  let lists = [[]];
  let l = 4/size;
  for (let a = 0; a < size; a++){
    for (let b = 0; b<size;b++){
      let c = ((a*l)+(-2));
      let d = ((b*l)+(-2))
      let itlen = inorout(c*(1/zoom)+xoff, d*(1/zoom)-yoff);
      let r = 0;
      let g = 0;
      let b2 = 0;
      if (itlen > 0){
        r = itlen+30 //colors (add or subtract to change colors and multiply or divide to change the gradient) 
        g = itlen 
        b2 = itlen+80
      }
      lists[((b*size)+a)*4] = r
      lists[((b*size)+a)*4+1] = g
      lists[((b*size)+a)*4+2] = b2
      lists[((b*size)+a)*4+3] = 255
    }
  }
  console.log(lists)
  var idata = ctx.createImageData(size, size);

// set our buffer as source
idata.data.set(lists);

// update canvas with new data
ctx.putImageData(idata, 0, 0);
}
generate(zoom1)
zoom.oninput = function() {
  console.log(this.value/20)
  if (typeof this.value != 'undefined'){
    generate((this.value)/50);
  }
}
let couneter = 1;
let c2 = 0;
function update(){
  c2 += 1
  
  requestAnimationFrame(update);
  if (c2 > 15){
    couneter = couneter*1.01
    iterationsc = iterationsc*1.04
    console.log(iterationsc)
    c2 = 0
    generate(couneter);
  }
}







function inorout(x, y){
  var realComponentOfResult = x;
var imaginaryComponentOfResult = y;
for(var i = 0; i < Math.round(iterationsc); i++) {
     var tempRealComponent = realComponentOfResult * realComponentOfResult
                             - imaginaryComponentOfResult * imaginaryComponentOfResult
                             + x;

     var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
                             + y;

     realComponentOfResult = tempRealComponent;
     imaginaryComponentOfResult = tempImaginaryComponent;

if (realComponentOfResult * imaginaryComponentOfResult > 1){
    return i+1;
}
}
return 0;
}
var anchor = document.createElement("a");

//anchor.href = canvas.toDataURL("image/png");
//anchor.download = "IMAGE.PNG";
//anchor.click();

//download the image^^^

//update();
// if you want it to automatically zoom in