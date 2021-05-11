class One extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.walkSpd = 1;
        this.walking = false;
        this.gridX = 0;
        this.gridY = 0;
        this.scene = scene;
        scene.add.existing(this);

        for(this.i = 0; this.i <= gridSize; this.i++) {
            for(this.j = 0; this.j <= gridSize; this.j++) {
                if(Math.abs(this.x - (this.j * gridUnit)) < Math.abs(this.x - (this.gridX * gridUnit))) {
                    this.gridX = this.j;
                }
                if(Math.abs(this.y - (this.i * gridUnit)) < Math.abs(this.y - (this.gridY * gridUnit))) {
                    this.gridY = this.i;
                }
            }
        }
    }
    
    update() {
        this.walk();

        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.plant();
        }
    }

    plant() {
        console.log("plant");
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
                this.gridX++;
                this.walking = true;
            }
            if(keyLEFT.isDown) {
                this.gridX--;
                this.walking = true;
            }

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