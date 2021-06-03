// this scene is always used on top of the Play scene. it is created by NPCs in the Play scene
// it uses global variables to get the information about what text to display, where to put it, etc
// it displays this text with the DialogueBox class
// when there is no text, the box is destroyed and the Play scene is resumed

class DialogueScene extends Phaser.Scene {
    constructor() {
        super("dialogueScene");
    }

    create() {
        
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