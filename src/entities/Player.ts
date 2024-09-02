export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "dino-idle");
    //registering the player to the scene
    scene.add.existing(this);
    //registering the player to have physics
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.setBodySize(44, 92)
      .setGravityY(5000)
      .setCollideWorldBounds(true)
      .setOrigin(0, 1);
  }
}
