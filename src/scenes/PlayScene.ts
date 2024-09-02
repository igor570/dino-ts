import { Canvas, Trigger } from "./types";
import { Player } from "../entities/Player";

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
    this.createTriggers();

    //checking for collisions
    this.physics.add.overlap(this.startTrigger, this.player, () => {
      console.log("Collision detected.");
    });
  }

  createPlayer() {
    this.player = new Player(this, 0, this.canvas.height);
  }

  createTerrain() {
    //x, y, width, height, image name
    this.add
      .tileSprite(this.canvas.width, this.canvas.height, 1000, 26, "ground")
      .setOrigin(0, 1);
  }

  createTriggers() {
    //making an empty sprite for start detection
    this.startTrigger = this.physics.add
      .sprite(0, 10, null)
      .setOrigin(0, 1)
      .setAlpha(0);
  }
}

export default PlayScene;
