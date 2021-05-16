class DialogueScene extends Phaser.Scene {
    constructor() {
        super("dialogueScene");
    }

    create() {
        this.dialogue = new DialogueBox(
            this,
            textBox.x,
            textBox.y,
            textBox.text,
            textBox.config
        );
        this.input.keyboard.on("keydown-SPACE", () => {
            this.dialogue.nextPage();
        });
    }

    update() {
        if (this.dialogue.currentText != undefined) {
            this.dialogue.nextLetter();
        }
        if (this.dialogue.allTextRead) {
            this.scene.resume("playScene");
            this.scene.stop();
        }
    }
}