class Ritual {
    constructor(scene, doorObj, doorTexture, doorDirection, circleArray, lineArray) {
        this.scene = scene;
        this.doorClosed = true;
        this.ritualFailed = true;
        this.ritualFinished = false;
        this.outOfOrder = false;
        this.index = 0;
        this.lastCorrectIndex = [];
        this.colliding = false;
        this.done = false;

        this.doorObj = doorObj;
        this.doorTexture = doorTexture;
        this.doorDirection = doorDirection;
        this.walking = false;
        this.walkTime = 2000;
        this.door = this.scene.add.sprite(this.doorObj.x, this.doorObj.y, this.doorTexture, 0);
        this.scene.add.existing(this.door);
        this.scene.physics.add.existing(this.door);
        this.door.body.setImmovable();
        if(doorTexture == "ritualDoor") {
            this.door.setDepth(101);
        }

        this.circleObjArray = circleArray;
        this.circleArray = [];
        this.circleArray.length = this.circleObjArray.length;

        if(lineArray) {
            console.log("drawing lines");
            this.lineArray = lineArray;
            this.drawLines();
        }

        this.walkSFX = scene.sound.add("ritualFootsteps");

        this.createCircles();
    }

    update() {

        // sets the tree walking sound volume to be equal to the master
        this.walkSFX.volume = masterSFXVolume;

        //reset variables for every-frame checks
        this.doorClosed = true;
        this.ritualFailed = true;
        this.outOfOrder = false;

        if(this.lastCorrectIndex.length == 0 ) {this.lastCorrectIndex.push(0);}
        if(this.index + 1 >= this.circleArray.length) { //if no other circles remain, stop looking for them
            this.scene.physics.world.collide(this.circleArray[this.index], this.scene.flowerTrail, (circle, flower) => {
                this.openDoor(); //if the final circle is filled, open the door
                this.ritualFailed = false;
                this.ritualFinished = true;
            });
            if(this.ritualFailed && this.ritualFinished) {
                this.ritualFinished = false;
                this.index = this.lastCorrectIndex.pop();
                //console.log(this.index);
            }
        } else { //if other circles remain, check to see if they have been filled in the incorrect order before iterating
            for(this.j = this.index + 1; this.j < this.circleArray.length; this.j++) {
                this.scene.physics.world.collide(this.circleArray[this.j], this.scene.flowerTrail, (circle, flower) => {
                    //if a circle is filled out of order, prevent check on current circle
                    this.outOfOrder = true;
                    if(this.index != this.lastCorrectIndex[this.lastCorrectIndex.length - 1]) {
                        this.index = this.lastCorrectIndex[this.lastCorrectIndex.length - 1];
                        //console.log(this.index);
                    }
                });
                if(this.outOfOrder) {
                    break;
                }
            }
            //if no circles are filled out of order, check current circle
            if(!this.outOfOrder) {
                this.scene.physics.world.collide(this.circleArray[this.index], this.scene.flowerTrail, (circle, flower) => {
                    this.ritualFailed = false; //if this circle is filled correctly, continue loop
                    if(this.index < this.circleArray.length - 1) {
                        this.lastCorrectIndex.push(this.index);
                        this.index++;
                        //console.log(this.index);
                    }
                });
            }
        }

        if(this.ritualFinished) { //check to see if any flowers are removed from a completed ritual
            for(this.i = 0; this.i < this.circleArray.length; this.i++) {
                this.colliding = false;
                this.scene.physics.world.collide(this.circleArray[this.i], this.scene.flowerTrail, (circle, flower) => {
                    this.colliding = true;
                });
                if(!this.colliding) {
                    this.ritualFinished = false;
                    this.index = this.i;
                    this.done = false;
                    while(!this.done) {
                        if(this.lastCorrectIndex.pop() == this.index) {
                            this.done = true;
                        }
                    }
                    break;
                }
            }
        }

        if(this.doorClosed && this.door == null) {
            this.closeDoor();
        }
        if(this.doorClosed && this.door != null) {
            this.scene.physics.world.collide(this.door, this.scene.player);
            this.scene.physics.world.collide(this.door, this.scene.doppelganger);
        }
    }

    closeDoor() {
        if(this.door == null && !this.walking) {
            this.x = this.doorObj.x;
            this.y = this.doorObj.y;
            if(this.doorDirection == "up") {
                this.y -= 2 * gridUnit;
            } else if(this.doorDirection == "down") {
                this.y += 2 * gridUnit;
            } else if(this.doorDirection == "left") {
                this.x -= 2 * gridUnit;
            } else if(this.doorDirection == "right") {
                this.x += 2 * gridUnit;
            }

            this.door = this.scene.add.sprite(this.x, this.y, this.doorTexture, 0);
            this.scene.add.existing(this.door);
            this.scene.physics.add.existing(this.door);
            this.door.body.setImmovable();
            if(this.doorTexture == "ritualDoor") {
                this.door.setDepth(101);
            }

            this.walking = true;
            this.walkSFX.play();
            this.scene.time.delayedCall(this.walkTime / 2, () =>{this.walkSFX.play();});
            if(this.doorTexture == "ritualTree") {
                this.door.anims.play("treeWalk");
            } else if(this.doorTexture == "ritualDoor") {
                this.door.anims.play("doorWalk");
            }
            if(this.doorDirection == "up") {
                this.tween = this.scene.tweens.add({
                    targets: [this.door],
                    y: {from: this.door.y, to: this.door.y + 2 * gridUnit},
                    duration: this.walkTime,
                });
            } else if(this.doorDirection == "down") {
                this.tween = this.scene.tweens.add({
                    targets: [this.door],
                    y: {from: this.door.y, to: this.door.y - 2 * gridUnit},
                    duration: this.walkTime,
                });
            } else if(this.doorDirection == "left") {
                this.tween = this.scene.tweens.add({
                    targets: [this.door],
                    x: {from: this.door.x, to: this.door.x + 2 * gridUnit},
                    duration: this.walkTime,
                });
            } else if(this.doorDirection == "right") {
                this.tween = this.scene.tweens.add({
                    targets: [this.door],
                    x: {from: this.door.x, to: this.door.x - 2 * gridUnit},
                    duration: this.walkTime,
                });
            }
            this.tween.on("complete", () => {
                this.walking = false;
                if(this.doorTexture == "ritualTree") {
                    this.door.anims.play("treeSit");
                } else if(this.doorTexture == "ritualDoor") {
                    this.door.anims.play("doorSit");
                }
            });
        }
    }

    openDoor() {
        if(this.door != null && !this.walking) {
            this.walking = true;
            if(this.doorTexture == "ritualTree") {
                this.door.anims.play("treeStand");
            } else if(this.doorTexture == "ritualDoor") {
                this.door.anims.play("doorStand");
            }

            this.door.on("animationcomplete", () => {
                if(this.doorTexture == "ritualTree") {
                    this.door.anims.play("treeWalk");
                } else if(this.doorTexture == "ritualDoor") {
                    this.door.anims.play("doorWalk");
                }
                this.walkSFX.play();
                this.scene.time.delayedCall(this.walkTime / 2, () =>{this.walkSFX.play();});
                if(this.doorDirection == "up") {
                    this.tween = this.scene.tweens.add({
                        targets: [this.door],
                        y: {from: this.door.y, to: this.door.y - 2 * gridUnit},
                        duration: this.walkTime,
                    });
                } else if(this.doorDirection == "down") {
                    this.tween = this.scene.tweens.add({
                        targets: [this.door],
                        y: {from: this.door.y, to: this.door.y + 2 * gridUnit},
                        duration: this.walkTime,
                    });
                } else if(this.doorDirection == "left") {
                    this.tween = this.scene.tweens.add({
                        targets: [this.door],
                        x: {from: this.door.x, to: this.door.x - 2 * gridUnit},
                        duration: this.walkTime,
                    });
                } else if(this.doorDirection == "right") {
                    this.tween = this.scene.tweens.add({
                        targets: [this.door],
                        x: {from: this.door.x, to: this.door.x + 2 * gridUnit},
                        duration: this.walkTime,
                    });
                }
                this.tween.on("complete", () => {
                    this.door.destroy();
                    this.door = null;
                    this.walking = false;
                });
            });
        }
        this.doorClosed = false;
    }

    createCircles() {
        for(this.i = 0; this.i < this.circleObjArray.length; this.i++) {
            this.circleArray[this.i] = this.scene.add.sprite(this.circleObjArray[this.i][0].x, this.circleObjArray[this.i][0].y, this.circleObjArray[this.i][1]);
            this.scene.add.existing(this.circleArray[this.i]);
            this.scene.physics.add.existing(this.circleArray[this.i]);
            this.circleArray[this.i].body.setImmovable();
            this.circleArray[this.i].setDepth(101);
        }
    }

    drawLines() {
        for(this.i = 0; this.i < this.lineArray.length; this.i++) {
            this.temp = this.scene.add.sprite(this.lineArray[this.i][0].x, this.lineArray[this.i][0].y, this.lineArray[this.i][1]);
            this.scene.add.existing(this.temp);
            this.temp.setDepth(101);
        }
    }
}