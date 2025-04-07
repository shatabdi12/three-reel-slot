async function loadAssets() {
  // Initialize PIXI Assets with base path
  await PIXI.Assets.init({ basePath: "assets" });

  // Load the spritesheet (make sure assets.json and related images are in the assets folder)
  const sheet = await PIXI.Assets.load("assets.json");

  // Create a sprite from the loaded texture
  const bonus = new PIXI.Sprite(sheet.textures["Bonus.png"]);
  bonus.x = 100;
  bonus.y = 100;

  // Add sprite to the stage
  app.stage.addChild(bonus);
}

// Create the PIXI application
const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
});

// Append the canvas to the DOM
document.body.appendChild(app.view);

// Load the assets and start the game
loadAssets();
