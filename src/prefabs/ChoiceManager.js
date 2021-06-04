// i'm hard coding everything in this choice manager because it only appears once in the game
// if our game was longer or if we had more time, i could do a lot more with this

class ChoiceManager {

    constructor(scene, dialogueBox) {
        this.scene = scene;
        this.dialogueBox = dialogueBox;

        menuTextConfig = {
            fontFamily: "express",
            fontSize: "27px",
            color: "#000",
            align: "center",
            padding: 4,
            align: "center",
            lineHeight: "normal"
        };

        // the padding between options
        this.hPadding = 32;
        
        // the padding between the dialogue box's text box and the choices
        this.vPadding = 8; 
        this.x = this.dialogueBox.textBox.x + this.dialogueBox.textBox.width/2;
        this.y = this.dialogueBox.textBox.y - this.vPadding;
        this.align = this.dialogueBox.align;

        // if (this.align = "down") {
        //     this.y += this.dialogueBox.textBox.height + this.vPadding*2;
        // }

        // the two options that the player chooses between
        this.options = ["take it", "share it"];

        this.drawUI();

        // which one of this.options is chosen
        this.currentOption = undefined;

        // selects the left option (0)
        this.scene.input.keyboard.on("keydown-LEFT", () => {
            this.handleInput("left");
        });

        // selects the right option (1)
        this.scene.input.keyboard.on("keydown-RIGHT", () => {
            this.handleInput("right");
        });

        // confirms the choice
        this.scene.input.keyboard.on("keydown-SPACE", () => {
            this.handleInput("space");
        });
    }

    drawUI() {
        this.optionOne = this.scene.add.sprite(
            this.dialogueBox.textBox.x + this.dialogueBox.textBox.width*.25,
            this.y,
            "choice box"
        ).setOrigin(.5, 1);

        this.optionTwo = this.scene.add.sprite(
            this.dialogueBox.textBox.x + this.dialogueBox.textBox.width*.75, 
            this.y,
            "choice box"
        ).setOrigin(.5, 1);

        this.optionOneText = this.scene.add.text(
            this.optionOne.x,
            this.optionOne.y - this.optionOne.height/2,
            this.options[0],
            menuTextConfig
        ).setOrigin(.5, .5).setDepth(150);

        this.optionTwoText = this.scene.add.text(
            this.optionTwo.x,
            this.optionTwo.y - this.optionTwo.height/2,
            this.options[1],
            menuTextConfig
        ).setOrigin(.5, .5).setDepth(150);

        this.selectSprite = this.scene.add.sprite(
            this.x + config.width*2,
            this.y,
            "choice select"
        ).setOrigin(.5, 1);
    }

    handleInput(input) {

        if (input == "left") {
            this.currentOption = 0;
            this.scene.select.play();
        } else if (input == "right") {
            this.currentOption = 1;
            this.scene.select.play();
        }

        if (this.currentOption == 0) {
            this.selectSprite.x = this.optionOne.x;
        }
        if (this.currentOption == 1) {
            this.selectSprite.x = this.optionTwo.x;
        }

        if (input == "space" && this.currentOption != undefined) {
            console.log(this.currentOption);
            this.scene.select.play();
            option = this.options[this.currentOption];
            this.scene.cameras.main.fadeOut(1000).on("camerafadeoutcomplete", () => {
                this.scene.scene.start("preCreditsScene");
            });
        }
    }
}