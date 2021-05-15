class One extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.walkSpd = 200;
        this.walking = false;
        this.plantTouching = false;
        this.plantCooldown = false;
        this.gridX = 0;
        this.gridY = 0;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        for(this.j = 0; this.j <= gridSize * levelWidth; this.j++) {
            if(Math.abs(this.x - (this.j * gridUnit - (gridUnit / 2))) < Math.abs(this.x - (this.gridX * gridUnit - (gridUnit / 2)))) {
                this.gridX = this.j;
            }
        }
        for(this.i = 0; this.i <= gridSize * levelHeight; this.i++) {
            if(Math.abs(this.y - (this.i * gridUnit - (gridUnit / 2))) < Math.abs(this.y - (this.gridY * gridUnit - (gridUnit / 2)))) {
                this.gridY = this.i;
            }
        }
    }
    
    update() {
        this.walk();
        if(this.body.speed == 0) {
            this.walking = false;
        }
        for(this.j = 0; this.j <= gridSize * levelWidth; this.j++) {
            if(Math.abs(this.x - (this.j * gridUnit - (gridUnit / 2))) < Math.abs(this.x - (this.gridX * gridUnit - (gridUnit / 2)))) {
                this.gridX = this.j;
            }
        }
        for(this.i = 0; this.i <= gridSize * levelHeight; this.i++) {
            if(Math.abs(this.y - (this.i * gridUnit - (gridUnit / 2))) < Math.abs(this.y - (this.gridY * gridUnit - (gridUnit / 2)))) {
                this.gridY = this.i;
            }
        }

        if(keySPACE.isDown) {
            this.plant();
        }
    }

    plant() {
        if(!this.plantCooldown) {
            this.scene.physics.world.collide(this, this.scene.flowerTrail, (player, trail) => {
                this.plantTouching = true;
                trail.anims.play("killCrumb");
                this.scene.time.delayedCall(1000, () => {
                    trail.destroy();
                });
            });
            if(!this.plantTouching) {
                console.log("plant");
                if(!this.plantCooldown) {
                    this.plantCooldown = true;
                }
                this.scene.flowerTrail.add(new FlowerCrumb(
                    this.scene,
                    this.gridX * gridUnit - (gridUnit / 2),
                    this.gridY * gridUnit - (gridUnit / 2),
                    "flowerCrumb",
                    0
                ));
                if(this.plantCooldown) {
                        this.scene.time.delayedCall(500, () => {
                        this.plantCooldown = false;
                    });
                }
            }
        }
        
        this.plantTouching = false;
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

        this.body.velocity.normalize().scale(this.walkSpd);
    }
}