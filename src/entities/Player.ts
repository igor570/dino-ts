export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "dino-idle");
    //Boilerplate to give player physics and scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }

  init() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.setBodySize(44, 92)
      .setGravityY(5000)
      .setCollideWorldBounds(true)
      .setOrigin(0, 1);

    //registering the players updating function to any scenes updating function, where player is used.
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    const { space } = this.cursors;
    const isSpaceDown = Phaser.Input.Keyboard.JustDown(space); //prevent holding space down
    const isOnFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor(); //prevents spamming space

    //Only jump if the player is on the floor and jump only once!
    if (isSpaceDown && isOnFloor) this.setVelocityY(-1600);
  }
}
