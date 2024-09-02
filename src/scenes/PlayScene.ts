import { Canvas, Terrain, Trigger } from "./types";
import { Player } from "../entities/Player";

class PlayScene extends Phaser.Scene {
  private player: Player;
  private terrain: Terrain;
  private canvas: Canvas;
  private startTrigger: Trigger;
  private beginRollOut: boolean = false;

  constructor() {
    super("PlayScene");
  }

  create() {
    this.canvas = {
      height: +this.game.config.height,
      width: +this.game.config.width,
    };

    this.createTerrain();
    this.createPlayer();
    this.createCollisionTriggers();
  }

  update() {
    if (this.beginRollOut && this.terrain.width <= this.canvas.width) {
      console.log("increasing terrain width...");
      this.terrain.width += 5;
    }
  }

  //custom methods
  createPlayer() {
    this.player = new Player(this, 0, this.canvas.height);
  }

  createTerrain() {
    //x, y, width, height, image name
    this.terrain = this.add
      .tileSprite(0, this.canvas.height, 88, 26, "ground")
      .setOrigin(0, 1);
  }

  createCollisionTriggers() {
    //making an empty sprite for start detection
    this.startTrigger = this.physics.add
      .sprite(0, 10, null)
      .setOrigin(0, 1)
      .setAlpha(0);

    //checking for collisions
    this.physics.add.overlap(this.startTrigger, this.player, () => {
      if (this.startTrigger.y === 10) {
        this.startTrigger.body.reset(0, this.canvas.height);
        console.log("Hit");
        return;
      }

      this.startTrigger.destroy();
      this.beginRollOut = true;
    });
  }
}

export default PlayScene;
