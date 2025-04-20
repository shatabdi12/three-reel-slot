// reelActions.js
import { playWinAnimation } from "./winAnimation.js";

export function handleSpin(reels, app) {
  reels.forEach((reel) => reel.spin());

  setTimeout(() => reels[0].stop(), 1000);
  setTimeout(() => reels[1].stop(), 1500);
  setTimeout(() => {
    reels[2].stop();

    const [s1, s2, s3] = reels.map((r) => r.getSymbol());
    if (s1 === s2 && s2 === s3) {
      playWinAnimation(app);
    }
  }, 2000);
}
