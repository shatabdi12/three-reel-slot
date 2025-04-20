import * as PIXI from "pixi.js";

// Declare global variables for the slot machine
let reels: PIXI.Sprite[][] = []; // Array of arrays of sprites (each reel contains sprites)
let spinning = false;
let winCelebration = false;
let app: PIXI.Application; // Declare app globally to access it in other functions

// Load the assets (sprites and win animation)
async function loadAssets(): Promise<void> {
  await PIXI.Assets.init({ basePath: "assets" });

  // Load the spritesheet (ensure it contains your symbols and win sequence)
  const sheet = (await PIXI.Assets.load("assets.json")) as PIXI.Spritesheet;

  // Create the app instance
  app = new PIXI.Application({ width: 800, height: 600 });

  document.body.appendChild(
    app.renderer.view.canvas as unknown as HTMLCanvasElement
  );

  // Create the slot machine's reel containers
  createReels(sheet, app);

  // Add a button to start spinning the reels
  const startButton = new PIXI.Graphics();
  startButton.beginFill(0x66cc66);
  startButton.drawRect(0, 0, 200, 50);
  startButton.endFill();
  startButton.x = 300;
  startButton.y = 500;
  (startButton as PIXI.Graphics).interactive = true;
  startButton.cursor = "pointer";
  startButton.on("pointerdown", onSpinButtonClick);
  app.stage.addChild(startButton);

  // Add text to the button
  const buttonText = new PIXI.Text("Spin", { fontSize: 24, fill: "white" });
  buttonText.x = 350;
  buttonText.y = 515;
  startButton.addChild(buttonText);
}

// Create the reels and add them to the app
function createReels(sheet: PIXI.Spritesheet, app: PIXI.Application): void {
  for (let i = 0; i < 3; i++) {
    const reelContainer = new PIXI.Container();
    reelContainer.x = 200 + i * 180; // Spacing out the reels
    app.stage.addChild(reelContainer);

    // Add the symbols for each reel
    const reel: PIXI.Sprite[] = [];
    for (let j = 0; j < 5; j++) {
      const symbol = new PIXI.Sprite(
        sheet.textures["Symbol" + (j % 5) + ".png"]
      );
      symbol.y = j * 100; // Stack the symbols vertically
      reelContainer.addChild(symbol);
      reel.push(symbol);
    }
    reels.push(reel);
  }
}

// Handle the spin button click
function onSpinButtonClick(): void {
  if (spinning) return; // Prevent multiple clicks while spinning

  spinning = true;
  winCelebration = false;

  // Start spinning the reels
  for (let i = 0; i < reels.length; i++) {
    spinReel(i);
  }
}

// Spin a single reel with random animation
function spinReel(reelIndex: number): void {
  const reel = reels[reelIndex];
  const randomStop = Math.floor(Math.random() * reel.length);
  const speed = 5 + Math.random() * 2;

  // Start animation to spin the reel
  let i = 0;
  const interval = setInterval(() => {
    for (let j = 0; j < reel.length; j++) {
      reel[j].y += 5; // Move the symbol down
      if (reel[j].y >= 500) {
        reel[j].y = -100; // Reset to top once the symbol goes off the screen
      }
    }

    if (i >= speed) {
      clearInterval(interval);
      reelStop(reelIndex, randomStop); // Stop the reel on the random position
    }
    i++;
  }, 50);
}

// Stop a specific reel and check for a win
function reelStop(reelIndex: number, stopPosition: number): void {
  const reel = reels[reelIndex];
  for (let i = 0; i < reel.length; i++) {
    if (i === stopPosition) {
      // Highlight the symbol where the reel stopped
      reel[i].alpha = 1;
    } else {
      reel[i].alpha = 0.5;
    }
  }

  // Check if all reels stopped at the same symbol
  if (checkWin()) {
    if (!winCelebration) {
      playWinAnimation();
    }
  }

  // Set spinning to false once all reels stop
  if (reels.every((reel) => reel[0].alpha === 1)) {
    spinning = false;
  }
}

// Check if all reels have the same symbol at the stop position
function checkWin(): boolean {
  const symbol0 = reels[0][0].texture; // First reel's top symbol
  const symbol1 = reels[1][0].texture; // Second reel's top symbol
  const symbol2 = reels[2][0].texture; // Third reel's top symbol

  // Win condition: all three reels show the same symbol
  return symbol0 === symbol1 && symbol1 === symbol2;
}

// Play the win animation (example using the WinsweepBox animation)
function playWinAnimation(): void {
  winCelebration = true;

  // Load the WinsweepBox[00-25] sequence animation
  // This is where you can add animation code based on your assets and desired effect
  // Example animation: Show a brief "win" animation or sound effect

  // Placeholder: Show a simple win message
  const winText = new PIXI.Text("You Win!", { fontSize: 48, fill: "gold" });
  winText.x = 300;
  winText.y = 250;
  app.stage.addChild(winText);

  // Remove the win message after 2 seconds
  setTimeout(() => {
    app.stage.removeChild(winText);
  }, 2000);
}

// Initialize the app and start loading assets
loadAssets();
