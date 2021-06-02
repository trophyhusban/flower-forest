class FlowerCrumb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture[0], frame);
        this.planted = false;
        this.gridX = 0;
        this.gridY = 0;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable();
        this.setDepth(101);

        this.plantAnimation = texture[0];
        this.pickAnimation = texture[1];

        for(this.j = 0; this.j <= gridSize; this.j++) {
            if(Math.abs(this.x - (this.j * gridUnit)) < Math.abs(this.x - (this.gridX * gridUnit))) {
                this.gridX = this.j;
            }
        }
        for(this.i = 0; this.i <= gridSize; this.i++) {
            if(Math.abs(this.y - (this.i * gridUnit)) < Math.abs(this.y - (this.gridY * gridUnit))) {
                this.gridY = this.i;
            }
        }

        this.anims.play(this.plantAnimation);
    }

    update() {
        // if(!this.planted) {
        //     this.anims.play(this.plantAnimation);
        //     this.planted = true;
        // }
    }
}