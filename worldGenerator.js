class tileGenerator {
   constructor(key, x, y, w = 16, h = 16) {
      this.key = key
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.tileClasses = {

      }
   }
}
class World {
   constructor(x, y, w, h, tileSet) {
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.tileSet = tileSet
      this.tiles = []

      //generation
      let res = 7
      this.map = createGraphics(this.w, this.h)
      let grassImages =
         [this.tileSet.get(0 * 16, 0 * 16, 16, 16),
         this.tileSet.get(1 * 16, 0 * 16, 16, 16),
         this.tileSet.get(2 * 16, 0 * 16, 16, 16),
         this.tileSet.get(3 * 16, 0 * 16, 16, 16)]

      let waterImages =
         [this.tileSet.get(0 * 16, 24 * 16, 16, 16),
         this.tileSet.get(1 * 16, 24 * 16, 16, 16),
         this.tileSet.get(2 * 16, 24 * 16, 16, 16),
         this.tileSet.get(3 * 16, 24 * 16, 16, 16)]

      let flowerImages =
         [this.tileSet.get(1 * 16, 43 * 16, 16, 16),
         this.tileSet.get(2 * 16, 43 * 16, 16, 16)]

      let treeImages =
         [this.tileSet.get(4 * 16, 0 * 16, 16, 16),
         this.tileSet.get(5 * 16, 0 * 16, 16, 16),
         this.tileSet.get(6 * 16, 0 * 16, 16, 16),
         // this.tileSet.get(5 * 16, 43 * 16, 16, 16),
         // this.tileSet.get(6 * 16, 43 * 16, 16, 16),
         this.tileSet.get(6 * 16, 1 * 16, 16, 16),
         this.tileSet.get(6 * 16, 3 * 16, 16, 16)]

      let hillImages =
         [this.tileSet.get(6 * 16, 1 * 16, 16, 16),
         this.tileSet.get(6 * 16, 3 * 16, 16, 16),]

      let mountainImages =
         [this.tileSet.get(3 * 16, 1 * 16, 16, 16),
         this.tileSet.get(4 * 16, 1 * 16, 16, 16),
         this.tileSet.get(5 * 16, 1 * 16, 16, 16),
         this.tileSet.get(6 * 16, 28 * 16, 16, 16),
         this.tileSet.get(6 * 16, 29 * 16, 16, 16)]




      // Pass 0
      for (let i = 0; i < this.w / 16; i++) {
         this.tiles[i] = []
         for (let j = 0; j < this.h / 16; j++) {
            let noiseValue = noise(i / res, j / res) + 0.05
            let v = createVector(i * 16, j * 16)
            noiseValue -= constrain((p5.Vector.dist(v, createVector(this.w / 2, this.h / 2))) / 4000, 0.1, 0.6)
            noiseValue / 2
            if (noiseValue < 0.2) {
               noiseValue = 0.2
            }
            else if (noiseValue < 0.25) {
               noiseValue = 0.25
            }
            else if (noiseValue < 0.55) {
               noiseValue = 0.55
            }
            else if (noiseValue < 0.6) {
               noiseValue = 0.63
            }
            else { noiseValue = 1 }
            this.tiles[i][j] = noiseValue

            this.map.noStroke();
            this.map.fill(color(noiseValue * 255));
            this.map.rect(i * 16, j * 16, 16, 16);
         }
      }

      //Pass 1
      for (let i = 0; i < this.w / 16; i++) {
         for (let j = 0; j < this.h / 16; j++) {
            let val = this.tiles[i][j]
            let img
            if (val == 0.2) {
               img = random(waterImages)
            }
            //else if(checkNeigbors(tiles,i,j,))
            else {
               img = random(grassImages)
            }
            this.map.image(img, i * 16, j * 16)
         }
      }

      //Pass 2
      for (let i = 0; i < this.w / 16; i++) {
         for (let j = 0; j < this.h / 16; j++) {
            let val = this.tiles[i][j]
            let img
            if (val == 1) {
               img = random(mountainImages)
               this.map.image(img, i * 16+1, j * 16+1,14,14)
            }
            else if (val > 0.55) {
               if (random() < 0.5) {
                  img = random(treeImages)
                  this.map.image(img, i * 16+1, j * 16+1,14,14)
               }
            }
            else if (val > 0.25) {
               if (random() < 0.1) {
                  img = random(treeImages)
                  this.map.image(img, i * 16+1, j * 16+1,14,14)
               }
               else if (random() < 0.3) {
                  img = random(flowerImages)
                  this.map.image(img, i * 16+1, j * 16+1,14,14)
               }
            }
         }
      }
    }

   show() {
      image(this.map, this.x, this.y)
   }
}

class Tile {
   constructor(id, img, key, x, y, w = 16, h = 16) {
      this.id = id;
      this.img = img;
      this.key = key;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
   }

   show() {
      image(this.img, this.x, this.y)
   }
}