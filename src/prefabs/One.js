class One extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.walkSpd = 200;
        this.walking = false;
        this.gridX = 0;
        this.gridY = 0;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

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
        this.walk();
        if(this.body.speed == 0) { //recalculate grid position, then snap to it when not walking
            this.walking = false;
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
            this.gridX = Phaser.Math.Clamp(this.gridX, 0, gridSize - 1);
            this.gridY = Phaser.Math.Clamp(this.gridY, 0, gridSize - 1);
            if(this.x != this.gridX * gridUnit) {
                this.x = this.gridX * gridUnit;
            }
            if(this.y != this.gridY * gridUnit) {
                this.y = this.gridY * gridUnit;
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.plant();
        }
    }

    plant() {
        console.log("plant");
        this.scene.flowerTrail.add(new FlowerCrumb(
            this.scene,
            this.gridX * gridUnit,
            this.gridY * gridUnit,
            "flowerCrumb",
            0
        ));
    }

    walk() {
        this.body.setVelocity(0);
            
        if(keyUP.isDown) {
            this.body.setVelocityY(-this.walkSpd);
            this.walking = true;
        }
        if(keyDOWN.isDown) {
            this.body.setVelocityY(this.walkSpd);
            this.walking = true;
        }
        if(keyRIGHT.isDown) {
            this.body.setVelocityX(this.walkSpd);
            this.walking = true;
        }
        if(keyLEFT.isDown) {
            this.body.setVelocityX(-this.walkSpd);
            this.walking = true;
        }

        this.body.velocity.normalize().scale(this.body.speed);
    }
}