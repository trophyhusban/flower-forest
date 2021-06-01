// pause menu! so professional 🥺🥺

class PauseScene extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }

    preload() {

    }
    
    create() {

        // text config object to draw the text with
        menuTextConfig = {
            fontFamily: "express",
            fontSize: "27px",
            color: "#000",
            align: "center",
            padding: 4,
            align: "center",
            lineHeight: "normal"
        };

        // the current option that is selected
        this.currentOption = 0;

        // height between each option of the menu
        this.padding = 64;

        // create the menu object
        this.createMenuArray();

        // draw each of the options
        this.drawMenuObject();

        // escape the scene
        this.input.keyboard.on("keydown-ESC", () => {
            this.exit();
        });

        // the next option down
        this.input.keyboard.on("keydown-DOWN", () => {
            this.optionDown();
        }); 

        // the next option up
        this.input.keyboard.on("keydown-UP", () => {
            this.optionUp();
        }); 

        this.input.keyboard.on("keydown-SPACE", () => {
            this.selectOption();
        })

        // transparent rectangle to lower the contrast on the play scene and shade the boxes nicely
        this.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            currentColor,
            overlayAlpha
        ).setOrigin(0,0);
    }

    createMenuArray() {

        // each option is an object with a name and a function

        // goes back to the play scene
        this.backOption = {
            name: "Back",
            function: () => this.exit()     // i need to write the functions like this or they won't work
        }

        // goes back to the main menu
        this.restartOption = {
            name: "Restart",
            function: () => this.backToMainMenu()
        }

        // TODO: 
        // add another option for changing the volume

        // the menu is an array of the options
        this.menu = [this.backOption, this.restartOption, this.restartOption];
    }

    drawMenuObject() {

        // loop over every option in the menu array
        for (let i = 0; i < this.menu.length; i++) {

            // a sprite that appears under the text of the menu options
            this.menuBox = this.add.sprite(
                uiUnit,
                this.placeMenuOption(i),
                "menu box"
            ).setOrigin(0, .5);
            this.menuBox.tint = currentColor*4;

            // for every option, draw the name of the option
            this.add.text(

                // the middle of the menuBox sprite
                this.menuBox.x + this.menuBox.width/2,
                this.placeMenuOption(i),    
                this.menu[i].name,
                menuTextConfig
            ).setOrigin(.5, .5).setDepth(100);
        }

        // a sprite that is the outline of the menu box sprite that gets drawn right on top of it 
        // to show which option is currently selected 
        this.menuSelect = this.add.sprite(
            this.menuBox.x,
            this.placeMenuOption(this.currentOption),
            "menu select"
        ).setOrigin(0, .5);
    }

    exit() {
        this.scene.resume("playScene");
        this.scene.stop();
    }

    backToMainMenu() {
        this.cameras.main.fadeOut(500).on("camerafadeoutcomplete", () => {
            this.scene.stop("playScene");
            this.scene.start("menuScene");
        });
    }

    optionUp() {
        console.log(this.currentOption);

        // subract one
        this.currentOption--;

        // if it is negative one, it wraps to the length of the array minus one
        if (this.currentOption == -1) {
            this.currentOption = this.menu.length -1;
        }

        // then we update the y of the select sprite
        this.menuSelect.y = this.placeMenuOption(this.currentOption);
    }

    optionDown() {
        
        // add one
        this.currentOption++;

        // if it is more than the legnth of the menu array, it wraps to 0
        if (this.currentOption == this.menu.length) {
            this.currentOption = 0;
        }

        // then we update the y of the select sprite
        this.menuSelect.y = this.placeMenuOption(this.currentOption);
    }

    selectOption() {
        this.menu[this.currentOption].function();
    }

    placeMenuOption(i) {    // this formula places everything in the right place <3

        // start at the middle, subtract one from i so that the second option is the one that's centered, then multiply by padding
        return config.height/2 + (i -1) * this.padding;
    }
}