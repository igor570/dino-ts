import { Player, Canvas, Trigger } from "./types";

class PlayScene extends Phaser.Scene {
  private player: Player;
  private canvas: Canvas;
  private startTrigger: Trigger;

  constructor() {
    super("PlayScene");
  }

  create() {
    this.canvas = {
      height: +this.game.config.height,
      width: +this.game.config.width,
    };
    this.startTrigger;

    this.createTerrain();
    this.createPlayer();
    this.registerControls();

    //checking for collisions
    this.physics.add.overlap(this.startTrigger, this.player, () => {
      console.log("Collision detected.");
    });
  }

  createPlayer() {
    this.player = this.physics.add
      .sprite(0, this.canvas.height, "dino-idle")
      .setOrigin(0, 1);

    this.player
      .setGravityY(5000)
      .setCollideWorldBounds(true)
      .setBodySize(44, 92);

    //making an empty sprite for start detection
    this.startTrigger = this.physics.add
      .sprite(0, 10, null)
      .setOrigin(0, 1)
      .setAlpha(0);
  }

  createTerrain() {
    //x, y, width, height, image name
    this.add
      .tileSprite(this.canvas.width, this.canvas.height, 1000, 26, "ground")
      .setOrigin(0, 1);
  }

  registerControls() {
    const spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    spaceBar.on("down", () => {
      this.player.setVelocityY(-1600);
    });
  }
}

export default PlayScene;
