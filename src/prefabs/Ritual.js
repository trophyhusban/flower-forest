class Ritual {
    constructor(scene, doorObj, doorTexture, circle1Obj, circle1Texture, circle2Obj, circle2Texture, circle3Obj, circle3Texture, circle4Obj, circle4Texture, circle5Obj, circle5Texture) {
        this.scene = scene;
        this.doorClosed = true;
        this.ritualFailed = false;

        this.doorObj = doorObj;
        this.doorTexture = doorTexture;

        this.circle1Obj = circle1Obj;
        this.circle1Texture = circle1Texture;
        this.circle1Active = false;

        this.circle2Obj = circle2Obj;
        this.circle2Texture = circle2Texture;
        this.circle2Active = false;
        this.circle2Present = false;

        this.circle3Obj = circle3Obj;
        this.circle3Texture = circle3Texture;
        this.circle3Active = false;
        this.circle3Present = false;

        this.circle4Obj = circle4Obj;
        this.circle4Texture = circle4Texture;
        this.circle4Active = false;
        this.circle4Present = false;

        this.circle5Obj = circle5Obj;
        this.circle5Texture = circle5Texture;
        this.circle5Active = false;
        this.circle5Present = false;

        this.closeDoor();
        this.createCircles();
    }

    update() {
        //reset variables for every-frame checks
        this.doorClosed = true;
        this.ritualFailed = false;

        //check to see if another circle has been filled before the first one
        if(this.circle2Present && !this.circle1Active) {
            this.circle2Active = false;
            this.scene.physics.world.collide(this.circle2, this.scene.flowerTrail, (circle, flower) => {
                this.circle2Active = true;
                this.ritualFailed = true;
            });
        }
        if(this.circle3Present && !this.circle1Active) {
            this.circle3Active = false;
            this.scene.physics.world.collide(this.circle3, this.scene.flowerTrail, (circle, flower) => {
                this.circle3Active = true;
                this.ritualFailed = true;
            });
        }
        if(this.circle4Present && !this.circle1Active) {
            this.circle4Active = false;
            this.scene.physics.world.collide(this.circle4, this.scene.flowerTrail, (circle, flower) => {
                this.circle4Active = true;
                this.ritualFailed = true;
            });
        }
        if(this.circle5Present && !this.circle1Active) {
            this.circle5Active = false;
            this.scene.physics.world.collide(this.circle5, this.scene.flowerTrail, (circle, flower) => {
                this.circle5Active = true;
                this.ritualFailed = true;
            });
        }
        
        //check to see if the first circle has been filled
        this.circle1Active = false;
        this.scene.physics.world.collide(this.circle1, this.scene.flowerTrail, (circle, flower) => {
            this.circle1Active = true;
            if(!this.circle2Present) { //if no other circles exist, complete ritual
                if(this.door != null) {
                    this.door.destroy();
                    this.door = null;
                }
                this.doorClosed = false;
            } 
            else if(this.ritualFailed) {} //if the ritual failed already, do nothing 
            else { //continue on to check the second circle

                //check to see if another circle has been filled before the second one
                if(this.circle3Present && !this.circle2Active) {
                    this.circle3Active = false;
                    this.scene.physics.world.collide(this.circle3, this.scene.flowerTrail, (circle, flower) => {
                        this.circle3Active = true;
                        this.ritualFailed = true;
                    });
                }
                if(this.circle4Present && !this.circle2Active) {
                    this.circle4Active = false;
                    this.scene.physics.world.collide(this.circle4, this.scene.flowerTrail, (circle, flower) => {
                        this.circle4Active = true;
                        this.ritualFailed = true;
                    });
                }
                if(this.circle5Present && !this.circle2Active) {
                    this.circle5Active = false;
                    this.scene.physics.world.collide(this.circle5, this.scene.flowerTrail, (circle, flower) => {
                        this.circle5Active = true;
                        this.ritualFailed = true;
                    });
                }

                //check to see if the second circle has been filled
                this.circle2Active = false;
                this.scene.physics.world.collide(this.circle2, this.scene.flowerTrail, (circle, flower) => {
                    this.circle2Active = true;
                    if(!this.circle3Present) { //if no other circles exist, complete ritual
                        if(this.door != null) {
                            this.door.destroy();
                            this.door = null;
                        }
                        this.doorClosed = false;
                    } 
                    else if(this.ritualFailed) {} //if the ritual failed already, do nothing
                    else { //continue on to check the third circle

                        //check to see if another circle has been filled before the third one
                        if(this.circle4Present && !this.circle3Active) {
                            this.circle4Active = false;
                            this.scene.physics.world.collide(this.circle4, this.scene.flowerTrail, (circle, flower) => {
                                this.circle4Active = true;
                                this.ritualFailed = true;
                            });
                        }
                        if(this.circle5Present && !this.circle3Active) {
                            this.circle5Active = false;
                            this.scene.physics.world.collide(this.circle5, this.scene.flowerTrail, (circle, flower) => {
                                this.circle5Active = true;
                                this.ritualFailed = true;
                            });
                        }

                        //check to see if the third circle has been filled
                        this.circle3Active = false;
                        this.scene.physics.world.collide(this.circle3, this.scene.flowerTrail, (circle, flower) => {
                            this.circle3Active = true;
                            if(!this.circle4Present) { //if no other circles exist, complete ritual
                                if(this.door != null) {
                                    this.door.destroy();
                                    this.door = null;
                                }
                                this.doorClosed = false;
                            } 
                            else if(this.ritualFailed) {} //if the ritual failed already, do nothing 
                            else { //continue on to check the fourth circle
                
                                //check to see if another circle has been filled before the fourth one
                                if(this.circle5Present && !this.circle4Active) {
                                    this.circle5Active = false;
                                    this.scene.physics.world.collide(this.circle5, this.scene.flowerTrail, (circle, flower) => {
                                        this.circle5Active = true;
                                        this.ritualFailed = true;
                                    });
                                }
                
                                //check to see if the fourth circle has been filled
                                this.circle4Active = false;
                                this.scene.physics.world.collide(this.circle4, this.scene.flowerTrail, (circle, flower) => {
                                    this.circle4Active = true;
                                    if(!this.circle5Present) { //if no other circles exist, complete ritual
                                        if(this.door != null) {
                                            this.door.destroy();
                                            this.door = null;
                                        }
                                        this.doorClosed = false;
                                    } 
                                    else if(this.ritualFailed) {} //if the ritual failed already, do nothing
                                    else { //continue on to check the fifth circle
                                        this.scene.physics.world.collide(this.circle5, this.scene.flowerTrail, (circle, flower) => {
                                            //if all circles are active in correct order, complete ritual
                                            this.circle5Active = true;
                                            if(this.door != null) {
                                                this.door.destroy();
                                                this.door = null;
                                            }
                                            this.doorClosed = false;
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        if(this.doorClosed && this.door == null) {
            this.closeDoor();
        }
        if(this.doorClosed && this.door != null) {
            this.scene.physics.world.collide(this.door, this.scene.player);
        }
    }

    closeDoor() {
        this.door = this.scene.add.sprite(this.doorObj.x, this.doorObj.y, this.doorTexture);
        this.scene.add.existing(this.door);
        this.scene.physics.add.existing(this.door);
        this.door.body.setImmovable();
    }

    createCircles() {
        this.circle1 = this.scene.add.sprite(this.circle1Obj.x, this.circle1Obj.y, this.circle1Texture);
        this.scene.add.existing(this.circle1);
        this.scene.physics.add.existing(this.circle1);
        this.circle1.body.setImmovable();

        if(this.circle2Obj != null) {
            this.circle2Present = true;
            this.circle2 = this.scene.add.sprite(this.circle2Obj.x, this.circle2Obj.y, this.circle2Texture);
            this.scene.add.existing(this.circle2);
            this.scene.physics.add.existing(this.circle2);
            this.circle2.body.setImmovable();
        }

        if(this.circle3Obj != null) {
            this.circle3Present = true;
            this.circle3 = this.scene.add.sprite(this.circle3Obj.x, this.circle3Obj.y, this.circle3Texture);
            this.scene.add.existing(this.circle3);
            this.scene.physics.add.existing(this.circle3);
            this.circle3.body.setImmovable();
        }

        if(this.circle4Obj != null) {
            this.circle4Present = true;
            this.circle4 = this.scene.add.sprite(this.circle4Obj.x, this.circle4Obj.y, this.circle4Texture);
            this.scene.add.existing(this.circle4);
            this.scene.physics.add.existing(this.circle4);
            this.circle4.body.setImmovable();
        }

        if(this.circle5Obj != null) {
            this.circle5Present = true;
            this.circle5 = this.scene.add.sprite(this.circle5Obj.x, this.circle5Obj.y, this.circle5Texture);
            this.scene.add.existing(this.circle5);
            this.scene.physics.add.existing(this.circle5);
            this.circle5.body.setImmovable();
        }
    }
}