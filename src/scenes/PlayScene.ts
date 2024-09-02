import { Canvas, Terrain, Trigger } from "./types";
import { Player } from "../entities/Player";

enum playState {
  ROLLOUT = 0,
  PLAYING = 1,
  END = 2,
}

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

  update() {}

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

      //destroy trigger sprite
      this.startTrigger.destroy();

      //start the grounds rollout
      this.beginRollOut = true;

      const rollOutEvent = this.time.addEvent({
        delay: 1000 / 60, // 60 time a sec
        loop: true,
        callback: () => {
          this.player.setVelocityX(80);
          this.terrain.width += 15;

          if (this.terrain.width >= this.canvas.width) {
            rollOutEvent.remove(); //cleanup
            this.terrain.width = this.canvas.width; //normalizing widths
            this.player.setVelocityX(0);
          }
        },
      });
      this.beginRollOut = true;
    });
  }
}

export default PlayScene;
