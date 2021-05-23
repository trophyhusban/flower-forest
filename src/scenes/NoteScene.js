class NoteScene extends Phaser.Scene {
    constructor() {
        super("noteScene");
    }

    create() {
        this.note = this.add.sprite(
            config.width/2,
            config.height/2,
            noteGlobal
        );

        this.tweens.add({
            targets: [this.note],
            alpha: {from: 0, to: 1},
            duration: 500
        });

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