// dialogue box class uwu
// this is definitely the most difficult thing that i (ardent) have done in this project as the UI/UX designer
// it all works! hehehe i am proud of it
// i was gonna add a lot more features to make it more profesisonal looking and polished, like having the text scroll
// in a smarter way like in earthbound but i couldn't figure it out
// to be honest this code is not great! but it is 100% functional
// ideally it would take any kind of text, with each line in the array being able to be any length so the writer (also me) wouldn't
// have to edit the text so it all fits well. the game is small enough that it isn't a problem.

class DialogueBox {

    // TODO:
    // refine/stylize the UI
    //      maybe add flowers uwu
    // make it appear above/below the 
    // impement audio blips
    // let players skip the text coming in by pressing spcae

    constructor(scene, tailX, text, textConfig, align) {

        // the scene
        this.scene = scene;

        // this contains all of the text to draw, in an array
        this.text = text;   

        // what index of ^ we draw text from
        this.currentPage = 0;

        // this is the variable that has text that actually gets drawn
        // the slice method cuts out text from the first index of the string to the last
        // so that u only draw the first n characters of the string 
        this.textDrawnInBox = this.text[this.currentPage].slice(0,0);  

        // we increase this every frame so the text comes in over time
        this.currentSliceIndex = 0;

        // this is positioned so the text box is centered along x
        this.x = uiUnit;

        // the y value matches the x value so it looks right
        this.y = uiUnit;
        
        // if align is up, we don't need to change it
        this.align = align;

        // i use a magic number here bc idk another way to get the height of a sprite that doesn't exist yet
        // so 128 is the height of the text box sprite
        if (this.align == "down") {
            this.y = config.height - 128 - uiUnit;
        }
        
        // i put the tail of the text box at the right place. the tailX comes from the center of the NPC sprite that creates
        // the dialogue box
        this.tailX = tailX;

        // i take the config and put it in uwu
        this.textConfig = textConfig;

        // draw all the pieces of the text box. we only call this once so it doesn't really need to be a function
        // but i like to be orginized ;-)
        this.drawText();

        // this is used in the DialogueScene to end the scene
        this.allTextRead = false;
    }

    drawText() {    // this scene has a lot of sprites so i will talk thru all of them
        
        // this is the actual box part that the text goes on. it is a pretty simple rectangle (for now?)
        this.textBox = this.scene.add.sprite(
            this.x-4,   // this is so it aligns properly w/ the border 
            this.y-4,   // ^
            "text box"
            ).setOrigin(0, 0);

        // this is the "tail" of the text box, meant to mimic speech bubbles in comics
        // technically u don't need this cuz there is only ever one NPC in any screen, but it makes it cuter and clearer
        // this is drawn so that it overlaps textBox in a way that makes it look like one sprite
        // i push the y down by three because that is the width of line around the edges of textBox
        this.textBoxTail = this.scene.add.sprite(
            this.tailX,                                 // the center of the NPC that made the dialoge box
            this.textBox.y+this.textBox.height-3,       // the bottom of the dialoge box (changes later on if align is "down")
            "text box tail"
            ).setOrigin(0, 0);
        
        // this sprite goes in the same place at textBoxTail
        // it is almost identical to it, except that the top three lines of pixels are transparent
        // this is so that when i draw the color overlay rectangles and make clipping masks, the masks don't overlap 
        this.textBoxTailMask = this.scene.add.sprite(
            this.tailX,                                 // these values are the same as for textBoxTail
            this.textBox.y+this.textBox.height-3,       // ^^
            "text box tail mask"
            ).setOrigin(0, 0);
        
        // sometimes flips the tail horizontally so that the side of it that is at an angle is always facing outwards
        if (this.tailX < this.textBox.x + this.textBox.width/2) {
            this.textBoxTail.flipX = true;
            this.textBoxTailMask.flipX = true;
        }

        // sometimes flips the tail vertically and moves it so that if the align is "down," the tail appears at the top of the text box
        // pointing up
        // the "- 6" is to account for 
        // 1. the width of the line around the edges of the textbox sprite and 
        // 2. the 3 pixels down we already moved it earlier
        if (this.align == "down") {
            this.textBoxTail.setOrigin(0, 1);
            this.textBoxTail.y -= this.textBox.height - 6;
            this.textBoxTail.flipY = true;
            this.textBoxTailMask.setOrigin(0, 1);
            this.textBoxTailMask.y -= this.textBox.height - 6;
            this.textBoxTailMask.flipY = true;
        }

        // adds the text that we are drawing to the scene
        this.updateText();
    }

    // this is called in the DialogueScene whenever the player presses space
    // i might add a feature in the future to skip the text that is currently coming in 
    nextPage() {

        // this is the entire point of this function LOL
        this.currentPage ++;

        // if there is another page in this.text to display
        if (this.currentPage < this.text.length) {
            this.currentSliceIndex = 0;     // resets the current slice index so we draw none of the text on the first frame
            this.currentText.destroy();     // destroy the current text so that we can get the new one
            this.updateText();              // add the new page of text to the screen

        // if there is no more pages of text to display
        } else {
            this.currentText.destroy();     // destroy the text object
            this.textBox.destroy();         // destroy the text box sprite
            this.textBoxTail.destroy();     // destroy the tail sprite
            this.textBoxTailMask.destroy(); // destroy the tail mask sprite

            // none of this is necessary because the scene is about to end but i like the drama of using destroy()
            
            // so that when nextLetter() is called, it marks all text as being read
            this.text = "";
        }

    }

    updateText() {
        
        // currentText is the text object that we are actually drawing to the screen
        // textDrawnInBox is the string that currentText draws
        this.currentText = this.scene.add.text(this.x, this.y, this.textDrawnInBox, textConfig);

        // 105 depth so it isn't affected by the color overlay
        this.currentText.setDepth(105);
    }

    nextLetter() {
        
        // adds the next letter to textDrawnInBox
        this.currentSliceIndex++;

        // this.text becomes an empty string if the player advances to the next page while there are no pages left
        if (this.text != "") {
            
            // if the entire string is already drawn, don't change it
            if (this.currentSliceIndex <= this.text[this.currentPage].length) {

                // changes the slice so that it is sliced from the new value
                this.textDrawnInBox = this.text[this.currentPage].slice(0, this.currentSliceIndex);
                
                // edit the text in the currentText so that it is the newly sliced string
                // i use the word "text" a million times so i will walk thru it again
                // currentText is the text object, meaning text to be drawn on the screen
                // currentText.text is the text value of the text object, which is a string that the text object draws
                // textDrawnInBox is the slice of the current page of this.text
                // this.text is the array that contains all of the text that we will draw, one index at a time
                this.currentText.text = this.textDrawnInBox;
            }
        } else {
            // if this.text is an empty string, than we know that there is nothing else to draw, so we mark allTextRead as true
            this.allTextRead = true;
        }
    }


}