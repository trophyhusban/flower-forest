// for the purposes of this class, an "NPC" is a character that players talk to and a "note" are notes that 
// players encounter and can look at. they are both in a class called "NPC," because at first the class was only
// for characters that players talk to before we added the notes
//
// this class does two things:
// it exists in space, colliding with the player and checking if they are next to them
// and it opens a scene, DialogueScene or NoteScene, if the player presses space next to them

class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y, texture, frame, content, kind) {
        super(scene, x, y, texture[0], frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.body.setImmovable();
        this.content = content;             // stores the image if its a note or array of text if it's an npc
        if (this.kind == "note") {
            this.content = content[0];  
        }
        this.player = player;   
        this.talking = false;               // i will need this for when i put the animations in
        this.setOrigin(0, 0);
        this.x -= this.x%gridUnit;          // aligns it to the grid 
        this.y -= this.y%gridUnit;          // the x and y are taken almost arbitrarily from the tiled file
        this.gridX = this.x/gridUnit + 1;   // so i can properly compare the grid locations to the player's grid variable
        this.gridY = this.y/gridUnit + 1;
        if (kind == "NPC") {
            this.static = texture[0];       // these two are to animate the NPC when it is talking (but it doesn't work yet)
            this.talkingAnimation = texture[1];
        }
        this.kind = kind;
        this.align = "up";                  // this is used to align the text box for NPCs above or below them

        // i need to use this because i can't count if a key is pressed once across more than one object
        this.justPressedKey = false;        
        
        // a sprite that looks like a little speech bubble with an exclamation mark
        if (this.kind == "NPC" || this.king == "choice") {
            this.alert = this.scene.add.sprite(this.x, this.y - 64, "alert").setOrigin(0, 0);
            this.alert.play("alert");
        }
        this.scene.input.keyboard.on("keydown-SPACE", () => {
            this.handleInput();
        });

        this.key = texture[0];
    }

    update() {

        if (this.checkNextToPlayer()) {     // this is used so the player can't plant flowers if they're next to an NPC
            this.player.nextToNPC = true;
        }
        
        this.scene.physics.world.collide(this, this.player);

    }

    handleInput() {
        // if the player is next to an NPC i can't just use player.nextToNPC here bc that applies to any NPC,
        // not specifically this one
        if (this.checkNextToPlayer()) {    

            if (this.kind == "NPC"){

                if (this.alert != undefined) this.alert.destroy();
                
                if (this.player.y > this.y) {
                    this.align = "up";      // align up if the player is below the NPC
                } else {
                    this.align = "down";    // align down if they are above
                }

                // if there is a dialouge box, space next to an NPC advances to the next page
                if (this.scene.currentDialogueBox != undefined) {

                    this.scene.currentDialogueBox.nextPage();

                // if there is not a dialouge box, space makes one
                } else {

                    this.openDialogue(          // launches the dialogue scene with these arguments
                        this.content,           // text
                        this.config,            // config
                        this.align,             // align
                        false                   // if it opens a choice dialogue or a regular one
                    ); 
                }
            } else if (this.kind == "note") {
                this.openNote();                // creates a note object

            } else if (this.kind == "choice") {

                if (this.alert != undefined) this.alert.destroy();
                if (this.scene.currentDialogueBox != undefined) {

                    this.scene.currentDialogueBox.nextPage();

                } else {
                    this.openDialogue(
                        this.content,
                        this.config,
                        this.align,
                        true
                    );
                }
            }
        }
    }

    openDialogue(text, config, align, choice) {

        if (this.scene.currentDialogueBox == undefined) {
            this.scene.currentDialogueBox = new DialogueBox(this.scene, this, text, config, align, choice); 
        }
    }

    openNote() {    

        noteGlobal = this.content;

        // if the key of the note is not in the array in the note manager, add it to the array
        if (this.scene.noteManager.noteArray.includes(this.content) == false) {
            this.scene.noteManager.noteArray.push(this.content);

            this.scene.inventoryNoteArray.push(this.scene.add.sprite(
                0, 
                0,
                this.key
            ).setOrigin(0, 0).setDepth(150));

            // also create a tutorial key on screen for the key that opens the new note <3
            // the new note is made now but because we pause the play scene in 5 lines, it doesn't show up until the player
            // leaves the note scene
            this.createTutorialKeyForNote(this.scene.noteManager.noteArray.length);
        }

        // i store them in a global variable so i can access them in the next scene
        this.scene.scene.pause();
        this.scene.scene.launch("noteScene");
    }

    checkNextToPlayer() {   // this code gets run every frame on every NPC

        // if the y is the same, than we need to check to see if the x is one greater than or less than it
        if (this.gridY == this.player.gridY) { 
            if (this.gridX == this.player.gridX + 1 || this.gridX == this.player.gridX - 1) {
                return true;
            }
        
        // if the x is the same, than we need to check to see if the y is one greater than or less than it
        } else if (this.gridX == this.player.gridX) {
            if (this.gridY == this.player.gridY + 1 || this.gridY == this.player.gridY - 1) {
                return true;
            }
        }
        return false;
    }

    createTutorialKeyForNote(numberKey) {
        this.numberName = numberKey.toString();

        console.log(numberKey);

        // make a new tutorial key for the specific number
        this.tutorialKey = new TutorialKey(
            this.scene,
            this.scene.camCenterX - config.width/2 + 64 * (numberKey - 1) + 32,
            this.scene.camCenterY - config.height/2 + uiUnit*2 - 400,
            this.numberName + " key",
            0,
            "up",
            this.numberName
        ).setDepth(140).setOrigin(.5, 0);

        // make it blink a little 
        this.scene.add.tween({
            targets: [this.tutorialKey],
            alpha: {from: 1, to: .5},
            duration: 250,
            repeat: 4,
            yoyo: true
        });

        // move it into place
        this.scene.add.tween({
            targets: [this.tutorialKey],
            y: this.scene.camCenterY - config.height/2 + uiUnit*2,
            duration: 1500,
            ease: "Quad.easeOut",
        });
    }
    
}