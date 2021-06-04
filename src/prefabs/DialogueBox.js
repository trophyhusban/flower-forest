// dialogue box class uwu
// this is definitely the most difficult thing that i (ardent) have done in this project as the UI/UX designer
// it all works! hehehe i am proud of it
// i was gonna add a lot more features to make it more profesisonal looking and polished, like having the text scroll
// in a smarter way like in earthbound but i couldn't figure it out
// ideally it would take any kind of text, with each line in the array being able to be any length so the writer (also me) wouldn't
// have to edit the text so it all fits well. the game is small enough that it isn't a problem.
//
// perhaps the entirety of this object could have been in the DialogueScene?

class DialogueBox {

    // TODO:
    // refine/stylize the UI
    //      maybe add flowers uwu
    // make it appear above/below the 
    // impement audio blips
    // let players skip the text coming in by pressing space
    // make the camera zoom in on the person who is talking before the scene starts :ooo

    constructor(scene, NPC, text, textConfig, align, choice) {

        // the scene
        this.scene = scene;

        // the NPC
        this.NPC = NPC;

        this.NPCSprite = this.NPC.talkingAnimation;

        // this contains all of the text to draw, in an array
        this.text = text;   

        // what index of ^ we draw text from
        this.currentPage = 0;

        // if there is a choice or not
        this.choice = choice

        // this is the variable that has text that actually gets drawn
        // the slice method cuts out text from the first index of the string to the last
        // so that u only draw the first n characters of the string 
        this.textDrawnInBox = this.text[this.currentPage].slice(0,0);  

        // we increase this every frame so the text comes in over time
        this.currentSliceIndex = 0;

        // this is positioned so the text box is centered along x
        this.x = this.scene.camCenterX - config.width/2 + uiUnit;

        // the y value matches the x value so it looks right
        this.y = this.NPC.y - 128 - 32;             // this.scene.camCenterY - config.height/2 + uiUnit;
        
        // if align is up, we don't need to change it
        this.align = align;

        // i use a magic number here bc idk another way to get the height of a sprite that doesn't exist yet
        // so 128 is the height of the text box sprite
        if (this.align == "down") {
            this.y = this.NPC.y + 64 + 32;
        }
        
        // i put the tail of the text box at the right place. the tailX comes from the center of the NPC sprite that creates
        // the dialogue box
        this.NPCX = this.NPC.x;

        // the Y value of the NPC sprite
        this.NPCY = this.NPC.y;

        // the sprite to draw for the talking NPC
        this.NPCSprite = this.NPC.talkingAnimation;

        // i take the config and put it in uwu
        this.textConfig = textConfig;

        // draw all the pieces of the text box. we only call this once so it doesn't really need to be a function
        // but i like to be orginized ;-)
        this.drawText();

        // this is used in the DialogueScene to end the scene
        this.allTextRead = false;

        if (this.choice == false) {
            console.log("here");
            // creates the speaking sound depending on the key of the npc 
            if (this.NPC.static == "puck") this.speakingSound = this.scene.talkingPuck;
            if (this.NPC.static == "titania") this.speakingSound = this.scene.talkingTitania;
            if (this.NPC.static == "flowerfae") this.speakingSound = this.scene.talkingFlowerfae;
            
            this.speakingSound.setLoop(true);
            this.speakingSound.volume = masterSFXVolume;
        }
    }

    drawText() {    // this scene has a lot of sprites so i will walk thru all of them

        // this is the actual box part that the text goes on. it is a pretty simple rectangle (for now?)
        this.textBox = this.scene.add.sprite(
            this.x - 4,   // this is so it aligns properly w/ the border 
            this.y - 4,   // ^
            "textbox" + colorIndex.toString()
        ).setOrigin(0, 0).setDepth(150);

        // this is the "tail" of the text box, meant to mimic speech bubbles in comics
        // technically u don't need this cuz there is only ever one NPC in any screen, but it makes it cuter and clearer
        // this is drawn so that it overlaps textBox in a way that makes it look like one sprite
        // i push the y down by three because that is the width of line around the edges of textBox
        this.textBoxTail = this.scene.add.sprite(
            this.NPCX + 32,                             // the center of the NPC that made the dialoge box
            this.textBox.y+this.textBox.height-3,       // the bottom of the dialoge box (changes later on if align is "down")
            "textbox tail" + colorIndex.toString()
            ).setOrigin(0, 0).setDepth(150);

        if (this.choice) {
            this.textBoxTail.x += 640;
        }
            
        // sometimes flips the tail horizontally so that the side of it that is at an angle is always facing outwards
        if (this.NPCX < this.textBox.x + this.textBox.width/2) {
            this.textBoxTail.flipX = true;
            this.textBoxTail.x -= 17;
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
            if (this.choice == false) {
                this.currentText.destroy();     // destroy the text object
                this.textBox.destroy();         // destroy the text box sprite
                this.textBoxTail.destroy();     // destroy the tail sprite
                this.speakingSound.pause();     // pause the talking sound (if it is not paused already)
                this.NPC.stop();

                // none of this is necessary because the scene is about to end but i like the drama of using destroy()

                // so that when nextLetter() is called, it marks all text as being read
                this.text = "";
            } else if (this.choiceObject == undefined) {
                this.choiceObject = new ChoiceManager(this.scene, this);
            }
        }

    }

    updateText() {
        
        // currentText is the text object that we are actually drawing to the screen
        // textDrawnInBox is the string that currentText draws
        this.currentText = this.scene.add.text(this.x, this.y, this.textDrawnInBox, textConfig);

        // 105 depth so it isn't affected by the color overlay
        this.currentText.setDepth(155);
    }

    nextLetter() {
        
        // only does any of this if there is no choice object
        // if there is a choice object, that means that there is no more text to display

        if (this.choiceObject == undefined) {
            // adds the next letter to textDrawnInBox
            this.currentSliceIndex++;

            // this.text becomes an empty string if the player advances to the next page while there are no pages left
            if (this.text != "") {
                
                // if the NPC is a choice npc, (which only appears at the very end) we don't need to play SFX or animate anything
                if (this.choice == false && this.speakingSound.isPlaying == false) {  
                    this.speakingSound.play();
                    this.NPC.play(this.NPCSprite);
                }
                
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
                } else {

                    // same thing as above when we check if choice == false
                    if (this.choice == false && this.speakingSound.isPlaying == true) {
                        this.speakingSound.pause();
                        if (this.choice == false) this.NPC.stop();
                    }
                }
            } else {
                
                // if this.text is an empty string, than we know that there is nothing else to draw, so we mark allTextRead as true
                this.allTextRead = true;
            }
        }
    }


}