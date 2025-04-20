// winAnimation.js

export function playWinAnimation(app) {
  const frames = [];

  for (let i = 0; i <= 25; i++) {
    const frame = `WinsweepBox${i.toString().padStart(2, "0")}.png`;
    frames.push(PIXI.Texture.from(frame));
  }

  const anim = new PIXI.AnimatedSprite(frames);
  anim.anchor.set(0.5);
  anim.x = app.screen.width / 2;
  anim.y = app.screen.height / 2;
  anim.loop = false;
  anim.animationSpeed = 0.3;
  anim.onComplete = () => app.stage.removeChild(anim);
  app.stage.addChild(anim);
  anim.play();
}
