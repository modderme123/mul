const c = document.getElementById("c");
c.width = 800;
c.height = 600;
const ctx = c.getContext("2d");

const levels = [
[
    `wwwww`, 
    `U   G`, 
    `wwwww`
],
[
    ` w ww`, 
    `U E G`, 
    `wwwww`
]
];
let level = 0;
let map = levels[0].slice();
let mapWidth = map[0].length;
let mapHeight = map.length;
let colors = {
  " ": "white",
  U: "black",
  G: "green",
  w: "gray",
  E: "yellow"
};
let keys = {};
let pixelSize = 2;
let tileSize = 10;

function isWalkable(y, x) {
  return [" ", keys["KeyE"]?"":"G"].includes(map[y][x]);
}
function setMap(y, x, val) {
  let old = map[y][x];
  map[y] = map[y].substring(0, x) + val + map[y].substring(x + 1, mapWidth);
  return old;
}
function getYou() {
    let letter = keys["KeyE"]?"E":"U"
    let you = { x: 0, y: 0 };
    you.y = map.findIndex(x=>x.includes(letter));
    you.x = map[you.y].indexOf(letter);
    return you;
}
function draw() {
    let old = undefined;
  if (keys["ArrowUp"]) {
      let you = getYou();
    if (you.y > 0 && isWalkable(you.y - 1, you.x)) {
      let ycolor = setMap(you.y, you.x, " ");
      if(keys["KeyE"]) setMap(you.y-1, you.x, ycolor);
      else old = setMap(you.y-1, you.x, ycolor);
      keys["KeyE"] = false;
    }
    keys["ArrowUp"] = false;
  } else if (keys["ArrowDown"]) {
    let you = getYou();
    if (you.y < mapHeight && isWalkable(you.y + 1, you.x)) {
      let ycolor = setMap(you.y, you.x, " ");
      if(keys["KeyE"]) setMap(you.y+1, you.x, ycolor);
      else old = setMap(you.y+1, you.x, ycolor);
      keys["KeyE"] = false;
    }
    keys["ArrowDown"] = false;
  } else if (keys["ArrowRight"]) {
    let you = getYou();
    if (you.x < mapWidth && isWalkable(you.y, you.x + 1)) {
      let ycolor = setMap(you.y, you.x, " ");
      if(keys["KeyE"]) setMap(you.y, you.x+1, ycolor);
      else old = setMap(you.y, you.x+1, ycolor);
      keys["KeyE"] = false;
    }
    keys["ArrowRight"] = false;
  } else if (keys["ArrowLeft"]) {
    let you = getYou();
    if (you.x > 0 && isWalkable(you.y, you.x - 1)) {
      let ycolor = setMap(you.y, you.x, " ");
      if(keys["KeyE"]) setMap(you.y, you.x-1, ycolor);
      else old = setMap(you.y, you.x-1, ycolor);
      keys["KeyE"] = false;
    }
    keys["ArrowLeft"] = false;
  }
  if (old=="G") {
    level++;
    level = level % levels.length
    map = levels[level].slice();
    mapWidth = map[0].length;
    mapHeight = map.length;
  }
  
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.save();
  ctx.scale(pixelSize, pixelSize);
  ctx.translate(
    c.width / pixelSize / 2 - (mapWidth * tileSize) / 2,
    c.height / pixelSize / 2 - (mapHeight * tileSize) / 2
  );

  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      let char = map[y][x];
      ctx.fillStyle = colors[char];
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  ctx.restore();
}
setInterval(draw, 1000 / 10);

window.addEventListener("keydown", (e) => {
  if (!e.repeat) keys[e.code] = true;
});
