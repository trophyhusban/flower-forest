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

    constructor(scene, x, y, text, textConfig) {
        this.scene = scene;
        this.text = text;
        this.textDrawnInBox = this.text[0].slice(0,0);
        this.currentSliceIndex = 0;
        this.x = x;
        this.y = y;
        this.textConfig = textConfig;
        this.currentPage = 0;
        this.drawingNewText = false;
    }
    drawText() {
        this.textBox = this.scene.add.sprite(
            this.x-4, 
            this.y-4, 
            "text box"
            ).setOrigin(0, 0);

        this.textBoxFlowers = this.scene.add.sprite(
            this.textBox.x, 
            this.textBox.y, 
            "text box flowers"
            ).setOrigin(0, 1);

        this.textBoxTail = this.scene.add.sprite(
            this.textBox.x + this.textBox.width*.75, 
            this.textBox.y+this.textBox.height-3,
            "text box tail"
            ).setOrigin(.5, 0);

        this.currentText = this.scene.add.text(this.x, this.y, this.textDrawnInBox, textConfig);
    }

    nextPage() {
        if (this.text != "") {
            this.currentPage ++;
            if (this.currentPage != this.text.length) {
                this.currentText.destroy();
                this.drawText();
            } else {
                this.currentText.destroy();
                this.textBox.destroy();
                this.textBoxFlowers.destroy();
                this.textBoxTail.destroy();
                this.text = "";
            }
        }
    }

    nextLetter() {
        this.currentSliceIndex++;
        if (this.text != "") {
            if (this.currentSliceIndex < this.text[this.currentPage].length) {
                this.textDrawnInBox = this.text[this.currentPage].slice(0, this.currentSliceIndex);
                this.currentText.text = this.textDrawnInBox;
            }
        } 
    }
}