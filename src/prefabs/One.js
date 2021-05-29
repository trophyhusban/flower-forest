class One extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.walkSpd = 200;
        this.walking = false;
        this.direction = "";
        this.dontReset = false;
        this.plantCooldown = false;
        this.gridX = 0;
        this.gridY = 0;
        this.scene = scene;
        this.nextToNPC = false;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        console.log(this);

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

        this.plantFlowerAudio = this.scene.sound.add("plant flower audio");
        this.plantFlowerReverseAudio = this.scene.sound.add("plant flower reverse audio");
        this.plantFlowerAudio.setVolume(.6);
        this.plantFlowerReverseAudio.setVolume(.6);

        //console.log("player x: " + this.x);
        //console.log("player y: " + this.y);
    }
    
    update() {

        this.walk();
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
        this.nextToNPC = false;
    }

    plant() {
        if(!this.plantCooldown && !this.nextToNPC) {
            console.log("plant");
            if(!this.plantCooldown) {
                this.plantCooldown = true;
            }
            this.plantFlowerAudio.play();
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
            this.scene.physics.world.collide(this.scene.flowerTrail, this.scene.flowerTrail, (flower1, flower2) => {
                this.plantFlowerAudio.pause();
                this.plantFlowerReverseAudio.play();
                flower1.anims.play("killCrumb");
                this.scene.time.delayedCall(1000, () => {
                    flower1.destroy();
                });
                flower2.destroy();
            });
        }
        
        this.plantTouching = false;
    }

    walk() {
        if(this.walking) {
            // console.log("calcX: " + ((this.x + (gridUnit / 2)) / gridUnit) + "| gridX: " + this.gridX);
            if(((this.x + (gridUnit / 2)) / gridUnit) <= this.gridX + 0.1 && ((this.x + (gridUnit / 2)) / gridUnit) >= this.gridX - 0.1) {
                this.body.setVelocityX(0);
                this.x = this.gridX * gridUnit - (gridUnit / 2);
                console.log("stopX");
            }
            // console.log("calcY: " + ((this.y + (gridUnit / 2)) / gridUnit) + "| gridY: " + this.gridY);
            if(((this.y + (gridUnit / 2)) / gridUnit) <= this.gridY + 0.1 && ((this.y + (gridUnit / 2)) / gridUnit) >= this.gridY - 0.1) {
                this.body.setVelocityY(0);
                this.y = this.gridY * gridUnit - (gridUnit / 2);
                // console.log("stopY");
            }
            if(this.body.speed == 0) {
                this.walking = false;
                // console.log("stopped");
            }
        }
        
        if(!this.walking) {
            if(this.body.speed == 0) {
                this.x = this.gridX * gridUnit - (gridUnit / 2);
                this.y = this.gridY * gridUnit - (gridUnit / 2);
                if(!this.dontReset) {
                    this.anims.play("one_reset");
                    this.direction = "";
                }
            }

            this.dontReset = false;

            if(keyUP.isDown) {
                this.dontReset = true;
                this.body.setVelocityY(-this.walkSpd);
                this.scene.time.delayedCall(100, () => {this.walking = true;});
            }
            else if(keyDOWN.isDown) {
                this.dontReset = true;
                this.body.setVelocityY(this.walkSpd);
                this.scene.time.delayedCall(100, () => {this.walking = true;});
            }
            else if(keyRIGHT.isDown) {
                this.dontReset = true;
                this.body.setVelocityX(this.walkSpd);
                this.scene.time.delayedCall(100, () => {this.walking = true;});
            }
            else if(keyLEFT.isDown) {
                this.dontReset = true;
                this.body.setVelocityX(-this.walkSpd);
                this.scene.time.delayedCall(100, () => {this.walking = true;});
            }

            //console.log(Phaser.Math.RadToDeg(this.body.angle));
            if(Phaser.Math.RadToDeg(this.body.angle) == 0 && this.body.speed != 0) {
                if(this.direction != "right") {
                    this.direction = "right";
                    this.anims.play("oneWalk_Right");
                }
            } else if(Phaser.Math.RadToDeg(this.body.angle) == -90 && this.body.speed != 0) {
                if(this.direction != "up") {
                    this.direction = "up";
                    this.anims.play("oneWalk_Up");
                }
            } else if(Phaser.Math.RadToDeg(this.body.angle) == 180 && this.body.speed != 0) {
                if(this.direction != "left") {
                    this.direction = "left";
                    this.anims.play("oneWalk_Left");
                }
            } else if(Phaser.Math.RadToDeg(this.body.angle) == 90 && this.body.speed != 0) {
                if(this.direction != "down") {
                    this.direction = "down";
                    this.anims.play("oneWalk_Down");
                }
            } else if(this.body.speed != 0) {
                this.tempAngle = Phaser.Math.RadToDeg(this.body.angle);
                this.body.angle = Phaser.Math.DegToRad(this.tempAngle - (this.tempAngle % 90));
            }
        }

        this.body.velocity.normalize().scale(this.walkSpd);
    }
}