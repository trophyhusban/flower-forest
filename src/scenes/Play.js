class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    init() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    preload() {
        this.load.image("text box", "./assets/ui/textbox.png");
        this.load.image("text box flowers", "./assets/ui/textbox_flowers.png");
        this.load.image("text box tail", "./assets/ui/textbox_tail.png");
        this.load.image("tempSprite", "./assets/gamepieces/Sprite-0001.png");
    }
    create() {
        textConfig = {
            fontFamily: "Verdana",
            fontSize: "24px",
            color: "#000",
            //backgroundColor: "#fff",
            align: "center",
            padding: 4,
            wordWrap: {width: config.width - unit*2},
            align: "left"
        };

        this.dialogue = new DialogueBox(
            this,
            unit,
            64,
            ["this is the first page of the text, it sort of goes on for a while so thawhile so while so while so while so whil"],
            textConfig
        );
        this.dialogue.drawText();

        this.input.keyboard.on("keydown-SPACE", () => {
            this.dialogue.nextPage();
        });

        this.player = new One(this, 
            50, 
            240, 
            "tempSprite", 
            0);
    }
    update() {
        if (this.dialogue != undefined) {
            this.dialogue.nextLetter();
        }
        this.player.update();
    }
}