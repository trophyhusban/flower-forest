class DialogueScene extends Phaser.Scene {
    constructor() {
        super("dialogueScene");
    }

    create() {
        this.dialogue = new DialogueBox(
            this,
            textBox.tailX,
            textBox.text,
            textBox.config,
            textBox.align
        );
        this.input.keyboard.on("keydown-SPACE", () => {
            this.dialogue.nextPage();
        });
        this.coloredRectangle1 = this.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            currentColor,
            .2
        ).setOrigin(0, 0).setDepth(100);
        this.coloredRectangle2 = this.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            currentColor,
            .2
        ).setOrigin(0, 0).setDepth(100);

        this.coloredRectangle1.mask = new Phaser.Display.Masks.BitmapMask(this, this.dialogue.textBox);
        this.coloredRectangle2.mask = new Phaser.Display.Masks.BitmapMask(this, this.dialogue.textBoxTailMask);
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