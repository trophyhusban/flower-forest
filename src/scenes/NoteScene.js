// this scene is like the simple alternative to the dialogue scene
// it adds a note and when u press space it deletes the note and ends the scene 

class NoteScene extends Phaser.Scene {
    constructor() {
        super("noteScene");
    }

    create() {

        // this is the note that u draw
        // it gets the image key from a global variable
        this.note = this.add.sprite(
            config.width/2,
            config.height/2,
            noteGlobal
        );

        // tween it so it looks cute ;-)
        this.tweens.add({
            targets: [this.note],
            alpha: {from: 0, to: 1},
            duration: 500
        });

        // if u press space, tween it out and then end the scene
        this.input.keyboard.on("keydown-SPACE", () => {
            if (this.note.alpha == 1) {
                this.tweens.add({
                    targets: [this.note],
                    alpha: {from: 1, to: 0},
                    duration: 500
                }).on("complete", () => {
                    this.scene.resume("playScene");
                    this.scene.stop();
                });
            }
        });
    }
}