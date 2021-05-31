// this scene is always used on top of the Play scene. it is created by NPCs in the Play scene
// it uses global variables to get the information about what text to display, where to put it, etc
// it displays this text with the DialogueBox class
// when there is no text, the box is destroyed and the Play scene is resumed

class DialogueScene extends Phaser.Scene {
    constructor() {
        super("dialogueScene");
    }

    create() {
        this.dialogue = new DialogueBox(    // makes a new DialogeBox
            this,
            textBox.tailX,
            textBox.text,
            textBox.config,
            textBox.align,
            textBox.NPCSprite,
            textBox.NPCY
        );
        this.input.keyboard.on("keydown-SPACE", () => {
            this.dialogue.nextPage();       // this advances the text 
        });

        // these three rectangles are used the same as in the Play scene 
        // two of them are for the dialogue box and one of them is for the NPC talking sprite
        // i make two for the dialogue boxinstead of one because i use a bitmap mask to make them not draw twice over 
        // the play scene undeneath this scene
        // i explain more later on

        this.coloredRectangle1 = this.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            currentColor,
            overlayAlpha
        ).setOrigin(0, 0).setDepth(100);
        this.coloredRectangle2 = this.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            currentColor,
            overlayAlpha
        ).setOrigin(0, 0).setDepth(100);
        this.coloredRectangle3 = this.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            currentColor,
            overlayAlpha
        ).setOrigin(0, 0).setDepth(100);
        

        // because the dialogue box is made up of two sprites, i need to draw two rectangles and make two masks
        // i also make a mask for the NPC animation that i draw
        // but because you can't use a bitmap mask with 
        // more on each of the different sprites in the DialogueBox class itself
        this.coloredRectangle1.mask = new Phaser.Display.Masks.BitmapMask(this, this.dialogue.NPCAnimation);
        this.coloredRectangle2.mask = new Phaser.Display.Masks.BitmapMask(this, this.dialogue.textBoxTailMask);
        this.coloredRectangle3.mask = new Phaser.Display.Masks.BitmapMask(this, this.dialogue.textBox);
        console.log(currentColor);
        console.log(overlayAlpha);
    }

    update() {      // we call nextLetter() every frame to have the letters appear over time
        if (this.dialogue.currentText != undefined) {
            this.dialogue.nextLetter();
        }
        if (this.dialogue.allTextRead) {    // if there is no more dialouge, we resume the play scene
            this.scene.resume("playScene");
            this.scene.stop();
        }
    }
}