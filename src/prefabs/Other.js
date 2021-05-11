class Other extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.walkSpd = 1;
        this.walking = false;
        this.mirrorMode = false;
        this.chaseMode = false;
        this.scriptedMode = false;
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
        if(this.mirrorMode) {
            this.walk();
            if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.plant();
            }
        }
        else if (this.chaseMode) {}
        else if (this.scriptedMode) {}
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
        if(!this.walking) {
            if(this.x != this.gridX * gridUnit) {
                this.x = this.gridX * gridUnit;
            }
            if(this.y != this.gridY * gridUnit) {
                this.y = this.gridY * gridUnit;
            }

            if(keyUP.isDown) {
                this.gridY--;
                this.walking = true;
            }
            if(keyDOWN.isDown) {
                this.gridY++;
                this.walking = true;
            }
            if(keyRIGHT.isDown) {
                this.gridX--;
                this.walking = true;
            }
            if(keyLEFT.isDown) {
                this.gridX++;
                this.walking = true;
            }
            this.gridX = Phaser.Math.Clamp(this.gridX, 1, gridSize);
            this.gridY = Phaser.Math.Clamp(this.gridY, 0, gridSize - 1);

            if(this.walking) {
                this.scene.tweens.add({
                    targets: [this],
                    x: {from: this.x, to: this.gridX * gridUnit},
                    y: {from: this.y, to: this.gridY * gridUnit},
                    duration: 100,
                });
                this.scene.time.delayedCall(100, () => {this.walking = false;});
            }
        }
    }
}