class DialogueBox {

    // TODO:
    // figure out a design for the box
    //      how it looks
    //      where it is in space relative to the player/the NPC speaking
    //      any animations/tweens
    //      how to format the text in CSS + font choice
    //      maybe a tail?
    // refine/stylize the UI
    //      maybe move the flowers on top onto the text box itself 
    // make it always look good (may have to go above/below NPC or at the top or bottom of the screen for example)
    // implement it in the context of the game
    // impement audio blips when alexis finishes them

    constructor(scene, tailX, text, textConfig, align) {
        this.scene = scene;
        this.text = text;
        this.textDrawnInBox = this.text[0].slice(0,0);
        this.currentSliceIndex = 0;
        // this.x = this.scene.camCenterX - config.width/2 + x;
        // this.y = this.scene.camCenterY - config.height/2 + y;
        this.x = uiUnit;
        this.y = uiUnit;
        this.align = align;
        if (this.align == "down") {
            this.y = config.height - 128 - uiUnit;
        }
        this.tailX = tailX;
        this.textConfig = textConfig;
        this.currentPage = 0;
        this.drawingNewText = false;
        this.drawText();
        this.allTextRead = false;
        console.log("tailX: " + this.tailX);
    }

    drawText() {
        // this.x = this.scene.camCenterX - config.width/2 + this.x;
        // this.y = this.scene.camCenterY - config.height/2 + this.y;
        this.textBox = this.scene.add.sprite(
            this.x-4, 
            this.y-4, 
            "text box"
            ).setOrigin(0, 0);

        this.textBoxTail = this.scene.add.sprite(
            this.tailX, 
            this.textBox.y+this.textBox.height-3,
            "text box tail mask"
            ).setOrigin(0, 0);
        
        this.textBoxTailMask = this.scene.add.sprite(
            this.tailX, 
            this.textBox.y+this.textBox.height-3,
            "text box tail mask"
            ).setOrigin(0, 0);
        
        if (this.tailX < this.textBox.x + this.textBox.width/2) {
            this.textBoxTail.flipX = true;
            this.textBoxTailMask.flipX = true;
        }

        if (this.align == "down") {
            this.textBoxTail.setOrigin(0, 1);
            this.textBoxTail.y -= this.textBox.height - 6;
            this.textBoxTail.flipY = true;
            this.textBoxTailMask.setOrigin(0, 1);
            this.textBoxTailMask.y -= this.textBox.height - 6;
            this.textBoxTailMask.flipY = true;
        }

        this.updateText();
    }

    nextPage() {
        this.currentPage ++;

        if (this.currentPage < this.text.length) {
            this.currentSliceIndex = 0;
            this.currentText.destroy();
            this.updateText();
        } else {
            console.log("here");
            this.currentText.destroy();
            this.textBox.destroy();
            this.textBoxTail.destroy();
            this.text = "";
        }

    }

    updateText() {
        this.currentText = this.scene.add.text(this.x, this.y, this.textDrawnInBox, textConfig);
        this.currentText.setDepth(105);
    }

    nextLetter() {
        this.currentSliceIndex++;
        if (this.text != "") {
            if (this.currentSliceIndex <= this.text[this.currentPage].length) {
                this.textDrawnInBox = this.text[this.currentPage].slice(0, this.currentSliceIndex);
                this.currentText.text = this.textDrawnInBox;
            }
        } else {
            this.allTextRead = true;
        }
    }


}