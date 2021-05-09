class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    init() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload() {

    }
    create() {
        textConfig = {
            fontFamily: "Verdana",
            fontSize: "24px",
            color: "#000",
            backgroundColor: "#fff",
            align: "center",
            padding: 5,
        };

        this.dialogue = new DialogueBox(
            this,
            64,
            64,
            ["this is the first page of the text", "this is the second page"],
            textConfig
        );
        this.dialogue.drawText();

        this.input.keyboard.on("keydown-SPACE", () => {
            this.dialogue.nextPage();
        });
    }
}