class One extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.walkSpd = 200;
        this.walking = false;
        this.command = "";
        this.takingInput = true;
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
        this.plantFlowerAnimations = ["plantCrumb", "plantCrumb2"];
        this.pickFlowerAnimations = ["killCrumb", "killCrumb2"];
        this.nextFlower = Phaser.Math.RND.integerInRange(1, this.plantFlowerAnimations.length) - 1;
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
            this.chooseNextFlower();
            this.scene.flowerTrail.add(new FlowerCrumb(
                this.scene,
                this.gridX * gridUnit - (gridUnit / 2),
                this.gridY * gridUnit - (gridUnit / 2),
                // the texture argument is an array
                // the first one is the plant animation and the second one is the pick animation
                [this.plantFlowerAnimations[this.nextFlower], this.pickFlowerAnimations[this.nextFlower]],
                0,
            ));
            if(this.plantCooldown) {
                    this.scene.time.delayedCall(500, () => {
                    this.plantCooldown = false;
                });
            }
            this.scene.physics.world.collide(this.scene.flowerTrail, this.scene.flowerTrail, (flower1, flower2) => {
                this.plantFlowerAudio.pause();
                this.plantFlowerReverseAudio.play();
                flower1.anims.play(flower1.pickAnimation);
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
                //console.log("stopX");
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
                    this.command = "";
                    this.takingInput = true;
                }
            }

            this.dontReset = false;

            // if the dialogue box is not undefined, there is a dialogue box, and you should be unable to move
            if (this.scene.currentDialogueBox == undefined) {

                if(this.takingInput) {
                    if(keyUP.isDown) {
                        this.takingInput = false;
                        this.command = "up";
                        this.scene.time.delayedCall(100, () => {
                            this.walking = true;
                            this.command = "";
                            this.takingInput = true;
                        });
                    }
                    else if(keyDOWN.isDown) {
                        this.takingInput = false;
                        this.command = "down";
                        this.scene.time.delayedCall(100, () => {
                            this.walking = true;
                            this.command = "";
                            this.takingInput = true;
                        });
                    }
                    else if(keyRIGHT.isDown) {
                        this.takingInput = false;
                        this.command = "right";
                        this.scene.time.delayedCall(100, () => {
                            this.walking = true;
                            this.command = "";
                            this.takingInput = true;
                        });
                    }
                    else if(keyLEFT.isDown) {
                        this.takingInput = false;
                        this.command = "left";
                        this.scene.time.delayedCall(100, () => {
                            this.walking = true;
                            this.command = "";
                            this.takingInput = true;
                        });
                    }
                    else {
                        this.command = "";
                    }
                }

                if(this.command == "up") {
                    this.dontReset = true;
                    this.body.setVelocityY(-this.walkSpd);
                    if(this.direction != "up") {
                        this.direction = "up";
                        this.anims.play("oneWalk_Up");
                    }
                } else if(this.command == "down") {
                    this.dontReset = true;
                    this.body.setVelocityY(this.walkSpd);
                    if(this.direction != "down") {
                        this.direction = "down";
                        this.anims.play("oneWalk_Down");
                    }
                } else if(this.command == "right") {
                    this.dontReset = true;
                    this.body.setVelocityX(this.walkSpd);
                    if(this.direction != "right") {
                        this.direction = "right";
                        this.anims.play("oneWalk_Right");
                    }
                } else if(this.command == "left") {
                    this.dontReset = true;
                    this.body.setVelocityX(-this.walkSpd);
                    if(this.direction != "left") {
                        this.direction = "left";
                        this.anims.play("oneWalk_Left");
                    }
                }

                //console.log(Phaser.Math.RadToDeg(this.body.angle));
                // if(Phaser.Math.RadToDeg(this.body.angle) == 0 && this.body.speed != 0) {
                // } else if(Phaser.Math.RadToDeg(this.body.angle) == -90 && this.body.speed != 0) {
                // } else if(Phaser.Math.RadToDeg(this.body.angle) == 180 && this.body.speed != 0) {
                // } else if(Phaser.Math.RadToDeg(this.body.angle) == 90 && this.body.speed != 0) {
                // }
            }
        }

        this.body.velocity.normalize().scale(this.walkSpd);
    }

    chooseNextFlower() {
        this.nextFlower++;

        if (this.nextFlower == this.plantFlowerAnimations.length) this.nextFlower = 0;
    }
}