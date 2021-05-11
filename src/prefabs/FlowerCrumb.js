class FlowerCrumb extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.planted = false;
        this.gridX = 0;
        this.gridY = 0;
        this.scene = scene;
        scene.add.existing(this);

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
    }

    update() {
        if(!this.planted) {
            this.anims.play("plantCrumb");
            this.planted = true;
        }
    }
}