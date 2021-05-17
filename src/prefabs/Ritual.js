class Ritual {
    constructor(scene, doorX, doorY, circle1X, circle1Y, circle2X, circle2Y, circle3X, circle3Y) {
        this.scene = scene;
        this.doorX = doorX;
        this.doorY = doorY;
        this.circle1X = circle1X;
        this.circle1Y = circle1Y;

        if(circle2X != null) {
            this.circle2X = circle2X;
            this.circle2Half = true;
        } else {
            this.circle2X = null;
            this.circle2Half = false;
        }
        if(circle2Y != null) {
            this.circle2Y = circle2Y;
            if(this.circle2Half) {
                this.circle2Present = true;
            } else {
                this.circle2Present = false;
            }
        } else {
            this.circle2Y = null;
            this.circle2Present = false;
        }

        if(circle3X != null) {
            this.circle3X = circle3X;
            this.circle3Half = true;
        } else {
            this.circle3X = null;
            this.circle3Half = false;
        }
        if(circle3Y != null) {
            this.circle3Y = circle3Y;
            if(this.circle3Half) {
                this.circle3Present = true;
            } else {
                this.circle3Present = false;
            }
        } else {
            this.circle3Y = null;
            this.circle3Present = false;
        }
    }
}