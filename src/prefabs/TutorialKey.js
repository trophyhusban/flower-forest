class TutorialKey extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, orientation, key) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        if (orientation == "up") {
            this.angle = 0;
        } else if (orientation == "left") {
            this.angle = 270;
        } else if (orientation == "down") {
            this.angle = 180
        } else if (orientation == "right") {
            this.angle = 90;
        }
        this.key = key;
        this.fadeOut = false;
        this.tweenOnce = false;
        this.finishedTweening = false;

    }
    update() {
        
        if(this.key == "up" && keyUP.isDown) {
            this.tweenFunction();
        }

        if(this.key == "left" && keyLEFT.isDown) {
            this.tweenFunction();
        }

        if(this.key == "down" && keyDOWN.isDown) {
            this.tweenFunction();
        }

        if(this.key == "right" && keyRIGHT.isDown) {
            this.tweenFunction();
        }

        if(this.key == "space" && keySPACE.isDown) {
            this.tweenFunction();
        }
        
        if (this.finishedTweening) {
            this.alpha == 0;
        }
    }

    tweenFunction() {
        if (this.tweenOnce == false) {
            console.log(this.key);
            this.tweenOnce = true;
            this.scene.add.tween({
                targets: [this],
                alpha: {from: 1, to: 0},
                duration: 500
            }).on("complete", () => {
                this.finishedTweening = true;
            });
        }
    }
}