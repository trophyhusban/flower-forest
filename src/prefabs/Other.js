class Other extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.walkSpd = 200;
        this.walking = false;
        this.plantCooldown = false;
        this.command = "";
        this.takingInput = true;
        this.direction = "";
        this.dontReset = false;
        this.mirrorMode = false;
        this.scriptedMode = false;
        this.stopCommand = false;
        this.script = [];
        this.currentInstruction = "";
        this.gridX = 0;
        this.gridY = 0;
        this.stopped = false;
        this.violent = false;
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

        this.plantFlowerAudio = this.scene.sound.add("plant flower audio");
        this.plantFlowerReverseAudio = this.scene.sound.add("plant flower reverse audio");
        this.plantFlowerAudio.setVolume(.6);
        this.plantFlowerReverseAudio.setVolume(.6);
        this.plantFlowerAnimations = ["plantCrumb", "plantCrumb2", "plantCrumb3"];
        this.pickFlowerAnimations = ["killCrumb", "killCrumb2", "killCrumb3"];
        this.nextFlower = Phaser.Math.RND.integerInRange(1, this.plantFlowerAnimations.length) - 1;
    }
    
    update() {
        if(!this.stopped) {
            //recalculate the Other's grid position
            this.calculateGridCoords();

            if(this.mirrorMode) { //mirror the player's movements in Mirror Mode
                this.walk();

                if(keySPACE.isDown) {
                    this.plant();
                }
            }
            else if (this.scriptedMode && this.script.length != 0) { //if the Other is following a non-empty script, act accordingly
                if(this.currentInstruction == "") {
                    this.currentInstruction = this.script.shift();
                    console.log("Reading instruction: " + this.currentInstruction);
                }
                this.scriptWalk();
                
                if(this.currentInstruction == "plant") {
                    this.plant();
                    this.currentInstruction = "";
                }

                if(this.currentInstruction == "mirror") {
                    this.mirrorMode = true;
                    this.scriptedMode = false;
                }

            } else if (this.scriptedMode) { //if the script is empty, change to mirror mode
                this.scriptedMode = false;
            }
        } else {
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
                this.anims.play("other_reset");
            }
            this.direction = "";
            this.command = "";
            this.takingInput = true;
        }
    }

    plant() {
        if(!this.plantCooldown && !this.nextToNPC && this.scene.currentDialogueBox == undefined) {
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

    chooseNextFlower() {
        this.nextFlower++;

        if (this.nextFlower == this.plantFlowerAnimations.length) this.nextFlower = 0;
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
                    this.anims.play("other_reset");
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
                        this.command = "left";
                        this.scene.time.delayedCall(100, () => {
                            this.walking = true;
                            this.command = "";
                            this.takingInput = true;
                        });
                    }
                    else if(keyLEFT.isDown) {
                        this.takingInput = false;
                        this.command = "right";
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
                        this.anims.play("otherWalk_Up");
                    }
                } else if(this.command == "down") {
                    this.dontReset = true;
                    this.body.setVelocityY(this.walkSpd);
                    if(this.direction != "down") {
                        this.direction = "down";
                        this.anims.play("otherWalk_Down");
                    }
                } else if(this.command == "right") {
                    this.dontReset = true;
                    this.body.setVelocityX(this.walkSpd);
                    if(this.direction != "right") {
                        this.direction = "right";
                        this.anims.play("otherWalk_Right");
                    }
                } else if(this.command == "left") {
                    this.dontReset = true;
                    this.body.setVelocityX(-this.walkSpd);
                    if(this.direction != "left") {
                        this.direction = "left";
                        this.anims.play("otherWalk_Left");
                    }
                }
            }
        }

        this.body.velocity.normalize().scale(this.walkSpd);
    }

    startScript(script) { //give the Other a script to follow
        this.script = script;
        this.mirrorMode = false;
        this.scriptedMode = true;
    }

    scriptWalk() { //follow the script's current movement command
        if(!this.walking) {
            if(this.body.speed == 0) {
                this.x = this.gridX * gridUnit - (gridUnit / 2);
                this.y = this.gridY * gridUnit - (gridUnit / 2);
                if(!this.dontReset) {
                    this.anims.play("other_reset");
                    this.direction = "";
                }
            }

            this.dontReset = false;

            if(this.currentInstruction == "up") {
                this.takingInput = false;
                this.command = "up";
                this.scene.time.delayedCall(100, () => {
                    this.walking = true;
                    this.command = "";
                    this.takingInput = true;
                });
            }
            else if(this.currentInstruction == "down") {
                this.takingInput = false;
                this.command = "down";
                this.scene.time.delayedCall(100, () => {
                    this.walking = true;
                    this.command = "";
                    this.takingInput = true;
                });
            }
            else if(this.currentInstruction == "left") {
                this.takingInput = false;
                this.command = "left";
                this.scene.time.delayedCall(100, () => {
                    this.walking = true;
                    this.command = "";
                    this.takingInput = true;
                });
            }
            else if(this.currentInstruction == "right") {
                this.takingInput = false;
                this.command = "right";
                this.scene.time.delayedCall(100, () => {
                    this.walking = true;
                    this.command = "";
                    this.takingInput = true;
                });
            } else if(this.currentInstruction == "stop" && !this.stopCommand) {
                this.stopCommand = true;
                this.scene.time.delayedCall(1000, () => {
                    this.stopCommand = false;
                    this.currentInstruction = "";
                });
            }

            if(this.command == "up") {
                this.dontReset = true;
                this.body.setVelocityY(-this.walkSpd);
                if(this.direction != "up") {
                    this.direction = "up";
                    this.anims.play("otherWalk_Up");
                }
            } else if(this.command == "down") {
                this.dontReset = true;
                this.body.setVelocityY(this.walkSpd);
                if(this.direction != "down") {
                    this.direction = "down";
                    this.anims.play("otherWalk_Down");
                }
            } else if(this.command == "right") {
                this.dontReset = true;
                this.body.setVelocityX(this.walkSpd);
                if(this.direction != "right") {
                    this.direction = "right";
                    this.anims.play("otherWalk_Right");
                }
            } else if(this.command == "left") {
                this.dontReset = true;
                this.body.setVelocityX(-this.walkSpd);
                if(this.direction != "left") {
                    this.direction = "left";
                    this.anims.play("otherWalk_Left");
                }
            }
        }

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
                this.currentInstruction = "";
                // console.log("stopped");
            }
        }

        this.body.velocity.normalize().scale(this.walkSpd);
    }

    calculateGridCoords() {
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
}