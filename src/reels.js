// reels.js
import { randomSymbol } from "./symbol.js";

export class Reel {
  constructor(app, x, y) {
    this.sprite = new PIXI.Sprite(PIXI.Texture.from(randomSymbol()));
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    this.stoppedSymbol = null;
    app.stage.addChild(this.sprite);
  }

  spin() {
    this.interval = setInterval(() => {
      this.sprite.texture = PIXI.Texture.from(randomSymbol());
    }, 100);
  }

  stop() {
    clearInterval(this.interval);
    const symbol = randomSymbol();
    this.sprite.texture = PIXI.Texture.from(symbol);
    this.stoppedSymbol = symbol;
  }

  getSymbol() {
    return this.stoppedSymbol;
  }
}
