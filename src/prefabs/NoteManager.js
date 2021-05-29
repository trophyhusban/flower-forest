// opens previously seen notes on screen with the number keys
// if another note is already open, it moves to the next one smoothly
// if a note is open and you press the button again, esc, space, or the arrow keys, it closes the note

class NoteManager {

    constructor(scene) {
        this.scene = scene;

        // whenever a player encounters a new note
        //      1. the key of the note gets added to this list
        //      2. a TutorialKey corrosponding to the total number of notes gets created
        this.noteArray = ["little big UI", "sliced UI", "half left UI", "half right UI"]; 

        // a number 0 through 3. if it's at negative one, there is no note open
        this.currentOpenNote = -1;

        // so i don't start the tween over again
        // every tween sets this false on complete
        this.tweening = false;

        // numbers one thru four use a method to figure out what to do
        this.scene.input.keyboard.on("keydown-ONE", () => {
            this.takeInput(0);
        });
        this.scene.input.keyboard.on("keydown-TWO", () => {
            this.takeInput(1);
        });
        this.scene.input.keyboard.on("keydown-THREE", () => {
            this.takeInput(2);
        });
        this.scene.input.keyboard.on("keydown-FOUR", () => {
            this.takeInput(3);
        });

        // the rest of the keys close the note if there is one open
        // this way i don't have to put an instruction on screen to tell players how to close notes
        this.scene.input.keyboard.on("keydown-ESC", () => {
            if (this.currentOpenNote != -1) this.closeNote();
        });
        this.scene.input.keyboard.on("keydown-SPACE", () => {
            if (this.currentOpenNote != -1) this.closeNote();
        });
        this.scene.input.keyboard.on("keydown-UP", () => {
            if (this.currentOpenNote != -1) this.closeNote();
        });
        this.scene.input.keyboard.on("keydown-DOWN", () => {
            if (this.currentOpenNote != -1) this.closeNote();
        });
        this.scene.input.keyboard.on("keydown-LEFT", () => {
            if (this.currentOpenNote != -1) this.closeNote();
        });
        this.scene.input.keyboard.on("keydown-RIGHT", () => {
            if (this.currentOpenNote != -1) this.closeNote();
        });
    }

    takeInput(i) {  // handles three different cases when the player presses a number key

        // checks to see if there even is a note collected for that number
        if (this.noteArray[i] != undefined) {

            // checks to see if there is a tween happening
            if (this.tweening == false) {

                // tweening is set to true because something will start tweening here no matter what
                this.tweening = true;

                // case one: if there is no note open rn
                if (this.currentOpenNote == -1) {
                    
                    // keeps track of the note that is currently open
                    this.currentOpenNote = i;

                    // creates a new note
                    this.newNote(i);

                // case two: if the key pressed matches the current open note
                } else if (this.currentOpenNote == i) {

                    // closes the note
                    this.closeNote();

                // case three: if there is a note open but the key pressed doesn't match it
                } else {

                    // keeps track of which note is currently open
                    this.currentOpenNote = i;

                                        

                    // moves the previous note offsceen and destroys it
                    this.changeNote();

                    // creates a new note to take the old one's place
                    this.newNote(i);
                }
            }
        }
    }

    // puts a new note on screen
    newNote(i) {
        
        // creates a new note and stores it in a variable
        this.currentOpenNoteSprite = this.scene.add.sprite(
            this.scene.camCenterX,
            this.scene.camCenterY + config.height,
            this.noteArray[i]
        ).setDepth(200);    // depth at 200 to be above the player

        // moves the note up, on screen
        this.scene.tweens.add({
            targets: [this.currentOpenNoteSprite],
            y: this.scene.camCenterY,
            duration: 500
        }).on("complete", () => this.tweening = false);
    }

    closeNote() {

        // tweens the current note down, off screen and destroys it
        this.scene.tweens.add({
            targets: [this.currentOpenNoteSprite],
            y: this.scene.camCenterY + config.height,
            duration: 500
        }).on("complete", () => {
            this.tweening = false;

            // because there is no more note on screen, i set currentOpenNote back to -1
            this.currentOpenNote = -1;
            this.currentOpenNoteSprite.destroy();
        });
    }

    changeNote() {

        // stores the note that was open in a new variable 
        this.prevOpenNoteSprite = this.currentOpenNoteSprite;

        // tweens the previous note up, off screen, and destroys it
        this.scene.tweens.add({
            targets: [this.prevOpenNoteSprite],
            y: this.scene.camCenterY - config.height,
            duration: 500
        }).on("complete", () => this.prevOpenNoteSprite.destroy());
    }
}