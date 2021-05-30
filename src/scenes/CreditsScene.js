// a scene for rolling credits
// played at the end of the game

class CreditsScene extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image("credits bg", "./assets/ui/credits_background.png");
    }

    create() {

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // the speed that everything in the scene scrolls at
        this.scrollSpeed = 2;

        // so that the tween at the end only happens once
        this.tweenOnce = false;
        
        // i arranged this text in illustrator first, which is where i got the number of newlines from
        this.namesText = "Alex Basinksi\n\n\n\n\nAlexa Wilbert\n\n\n\n\nArdent Eliot :-) Reinhard\n\n\n\n\n\nStar Hagen-Esquerra";
        this.rolesText = "\nMain Programer\nGame Designer\nDesign of Level 1, 2, 3\n\n\nSound Designer\nArtist\nDesign of Level 1, 3\n\n\n";
        this.rolesText += "UI/UX Designer\nPuzzle Designer\nWriter\nDesign of Level 1, 3\n\n\nArtist\nCharacter Designer\nPuzzle Designer\nDesign of Level 1, 3";

        // the y value that the text starts at
        // below the screen by 64 pixels
        this.textStartY = config.height + 64*2;

        // fade in
        this.cameras.main.fadeIn(1500);

        // scrolling background of trees and grass
        this.bg = this.add.tileSprite(
            0,
            0,
            640,
            640,
            "credits bg"
        ).setOrigin(0, 0);
        
        // set the font size and alignment
        textConfig.fontSize = "27px";
        textConfig.padding = 4;
        textConfig.lineSpacing = 16;
        
        // this one is aligned left
        textConfig.align = "left";
        this.namesText = this.add.text(
            64,                         // on the right of the leftmost tree
            this.textStartY,                        // below the screen at the start
            this.namesText,             // the names
            textConfig                  // the config which i just edited
        ).setOrigin(0, 0);              // origin at the top left

        // this one is aligned right
        textConfig.align = "right";
        this.rolesText = this.add.text(
            config.width - 64,          // on the left of the rightmost tree
            this.textStartY,                        // below the screen at the start
            this.rolesText,             // the roles
            textConfig                  // the config which i just edited
        ).setOrigin(1, 0);              // origin at the top right

        // this is the padding between each image of each cast memeber, their nametag, and the next cast member
        this.castPadding = 16;
        
        // used to align individual cast members to certain parts of the screen
        // i manually set them to alternate between L and R
        // the numbers corrospond to the center of the sprite/text
        this.castAlignL = 64*3.5;
        this.castAlignR = 64*6.5;

        // an array to upadate the y of the whole cast
        this.castArray = [];

        textConfig.align = "center";

        // the sprite for pucky
        this.puckSprite = this.add.sprite(
            this.castAlignL,
            this.rolesText.y + this.rolesText.height + 64,  // i draw him based on the y value and height of the previous thing
            "puckTalking",
        ).setOrigin(.5, 0);
        this.puckSprite.scale = 2;
        this.puckSprite.play("puckTalking");
        this.castArray.push(this.puckSprite);

        this.puckText = this.add.text(
            this.castAlignL,
            this.puckSprite.y + this.puckSprite.height*2 + this.castPadding,
            "Puck",
            textConfig
        ).setOrigin(.5, 0);
        this.castArray.push(this.puckText);

        this.titaniaSprite = this.add.sprite(
            this.castAlignR,
            this.puckText.y + this.puckText.height + this.castPadding,  
            "titaniaTalking",
        ).setOrigin(.5, 0);
        this.titaniaSprite.scale = 2;
        this.titaniaSprite.play("titaniaTalking");
        this.castArray.push(this.titaniaSprite);

        this.titaniaText = this.add.text(
            this.castAlignR,
            this.titaniaSprite.y + this.titaniaSprite.height*2 + this.castPadding,
            "Titania",
            textConfig
        ).setOrigin(.5, 0);
        this.castArray.push(this.titaniaText);

        this.flowerfaeSprite = this.add.sprite(
            this.castAlignL,
            this.titaniaText.y + this.titaniaText.height + this.castPadding,  
            "flowerfaeTalking",
        ).setOrigin(.5, 0);
        this.flowerfaeSprite.scale = 2;
        this.flowerfaeSprite.play("flowerfaeTalking");
        this.castArray.push(this.flowerfaeSprite);

        this.flowerfaeText = this.add.text(
            this.castAlignL,
            this.flowerfaeSprite.y + this.flowerfaeSprite.height*2 + this.castPadding,
            "the Flower\nFae",
            textConfig
        ).setOrigin(.5, 0);
        this.castArray.push(this.flowerfaeText);

        this.youSprite = this.add.sprite(
            this.castAlignR,
            this.flowerfaeText.y + this.flowerfaeText.height + this.castPadding,  
            "oneWalk_Down",
        ).setOrigin(.5, 0);
        this.youSprite.scale = 2;
        this.youSprite.play("oneWalk_Down");
        this.castArray.push(this.youSprite);

        this.youText = this.add.text(
            this.castAlignR,
            this.youSprite.y + this.youSprite.height*2 + this.castPadding,
            "You",
            textConfig
        ).setOrigin(.5, 0);
        this.castArray.push(this.youText);

        this.otherSprite = this.add.sprite(
            this.castAlignL,
            this.youText.y + this.youText.height + this.castPadding,  
            "otherWalk_Down",
        ).setOrigin(.5, 0);
        this.otherSprite.scale = 2;
        this.otherSprite.play("otherWalk_Down");
        this.castArray.push(this.otherSprite);

        this.otherText = this.add.text(
            this.castAlignL,
            this.otherSprite.y + this.otherSprite.height*2 + this.castPadding,
            "The Other\nYou",
            textConfig
        ).setOrigin(.5, 0);
        this.castArray.push(this.otherText);

        textConfig.align = "center";
        textConfig.fontSize = "63px";

        // big ol THE END :'-)
        this.theEnd = this.add.text(
            config.width/2,
            this.otherText.y + this.otherText.height + 128,
            "THE END",
            textConfig
        ).setOrigin(.5, .5);

        textConfig.fontSize = "27px";
        this.restartText = this.add.text(
            config.width/2,
            config.height/2 + 64,
            "press space to restart",
            textConfig
        ).setOrigin(.5, .5);
        this.restartText.alpha = 0;
    }

    update() {
        this.bg.tilePositionY += this.scrollSpeed;     // scroll the trees up
        this.namesText.y -= this.scrollSpeed;
        this.rolesText.y -= this.scrollSpeed;
        for (let i = 0; i < this.castArray.length; i ++) {
            this.castArray[i].y -= this.scrollSpeed;
        }
        
        // "the end" text stops scrolling at a certain point
        if (this.theEnd.y > config.height/2 - 64) {
            this.theEnd.y -= this.scrollSpeed;
        } else if (this.tweenOnce == false) {
            this.tweenOnce = true;

            // tween the alpha of the restart text to 1
            this.add.tween({
                targets: this.restartText,
                alpha: 1,
                duration: 1000,
                delay: 500
            }).on("complete", () => {
                this.finishedTweening = true;
            });
        }

        // if the tween is finished, the player can go back to the title screen
        if (this.finishedTweening) {
            console.log("here first");
            if (keySPACE.isDown) {
                console.log('here');
                this.cameras.main.fadeOut(500).on("camerafadeoutcomplete", () => {
                    this.scene.start("menuScene");
                });
            }
        }
    }
}