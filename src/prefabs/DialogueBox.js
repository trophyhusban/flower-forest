class DialogueBox {
    constructor(scene, x, y, text, textConfig) {
        this.scene = scene;
        this.text = text;
        this.x = x;
        this.y = y;
        this.textConfig = textConfig;
        this.currentPage = 0;
    }
    drawText() {
        this.currentText = this.scene.add.text(this.x, this.y, this.text[this.currentPage], textConfig);
    }
    nextPage() {
        this.currentPage ++;
        if (this.currentPage != this.text.length) {
            this.currentText.destroy();
            this.drawText();
        } else {
            this.currentText.destroy();
        }
    }
}