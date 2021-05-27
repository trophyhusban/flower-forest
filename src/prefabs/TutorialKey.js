// these are the keys that go onto the screen when u first start playing the game
// i think it would be fun to mess with the tweens here so they come in in a more interesting way
// maybe i will do that but i have more important things to work on first
//
// so what happens with these is that they go on screen and when u press the key, they dissapear and get deleted
// i tween them on screen in the Play scene, and i tween them off screen and delete them here

class TutorialKey extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, orientation, key) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        // this rotates it so it looks good
        // these angles aren't consistent with the way that phaser uses angles because the sprite that i am using for the arrow keys
        // is pointing upwards, whereas an angle of 0 in phaser points to the right
        if (orientation == "up") {
            this.angle = 0;
        } else if (orientation == "left") {
            this.angle = 270;
        } else if (orientation == "down") {
            this.angle = 180
        } else if (orientation == "right") {
            this.angle = 90;
        }

        // this is a string that represents the key that the key represents
        // i COULD have used the key directly but that wasn't working so i changed it
        // it should work like that (the error was something else) but it works like this so i don't want to change it
        // this way, i have to hard code all the keys in but that's not hard cuz there aren't that many keys that we use anyway
        this.key = key;

        // so that i only do the tween once
        this.tweenOnce = false;

        // so that when the tween is over the object gets destroyed
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
            this.destroy();
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