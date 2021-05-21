class NoteScene extends Phaser.Scene {
    constructor() {
        super("noteScene");
    }

    create() {
        console.log(noteGlobal);
        this.note = this.add.sprite(
            config.width/2,
            config.height/2,
            noteGlobal
        );

        console.log(this.note);

        this.tweens.add({
            targets: [this.note],
            alpha: {from: 0, to: 1},
            duration: 500
        });

        this.input.keyboard.on("keydown-SPACE", () => {
            console.log("keydown space in the note scene");
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