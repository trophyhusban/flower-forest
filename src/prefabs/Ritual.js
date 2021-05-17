class Ritual {
    constructor(scene, doorObj, doorTexture, circle1Obj, circle1Texture, circle2Obj, circle2Texture, circle3Obj, circle3Texture) {
        this.scene = scene;
        this.doorClosed = true;

        this.doorObj = doorObj;
        this.doorTexture = doorTexture;

        this.circle1Obj = circle1Obj;
        this.circle1Texture = circle1Texture;

        this.circle2Obj = circle2Obj;
        this.circle2Texture = circle2Texture;
        this.circle2Present = false;

        this.circle3Obj = circle3Obj;
        this.circle3Texture = circle3Texture;
        this.circle3Present = false;

        this.closeDoor();
        this.createCircles();
    }

    update() {
        this.doorClosed = true;
        this.scene.physics.world.collide(this.circle1, this.scene.flowerTrail, (circle, flower) => {
            if(this.door != null) {
                this.door.destroy();
                this.door = null;
            }
            this.doorClosed = false;
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
    }
}