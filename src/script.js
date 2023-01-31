let cellSize = 7;

function setup (){
  pixelDensity(1);
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

function init(){
  grid = [];
  prev = [];
  let r = 4;
  for (let i = 0; i < gw; i++){
    grid.push([]);
    prev.push([]);
    for (let j = 0; j < gh; j++){
      grid[i].push(0);
      prev[i].push(0);
      if (abs(i - gw/2) < r && abs(j-gh/2) < r && random() < .5) prev[i][j] = 1;
    }
  }
  console.log(grid);
}

function draw(){
  background(0);

  // pushPop(() => {
  //   stroke("red");
  //   for (let i = 0; i <= gw; i++) line(i*cw, 0, i*cw, h)
  //   for (let j = 0; j <= gh; j++) line(0, j*ch, w, j*ch);
  // })

  scale(cw, ch);
  fill(1);
  noStroke();
  
  let r = 1;
  for (let x = 0; x < gw; x++){
    for (let y = 0; y < gh; y++){
      let c = 0;
      let v = prev[x][y];
      for (let i = -r; i <= r; i++){
        for (let j = -r; j <= r; j++){
          let x2 = x+i;
          let y2 = y+j;
          // if (i*i + j*j > 5) continue;
          if (i == 0 && j == 0) continue;
          if (x2 > -1 && x2 < gw && y2 > -1 && y2 < gh && 
              prev[x2][y2] == 1) c++;
        }
      }
      
      if (v == 0 && c == 3) v = 1;
      if (v == 1 && (c < 1 || c > 4)) v = 0;
      grid[x][y] = v;
      if (v == 1) rect(x, y, 1, 1);
    }
  }
  [grid, prev] = [prev, grid];
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  [w, h]   = [width, height];
  [gw, gh] = [floor(w/cellSize), floor(h/cellSize)];
  [cw, ch] = [w/gw, h/gh];
  init();
}

let pushPop = f => {push();f();pop();}