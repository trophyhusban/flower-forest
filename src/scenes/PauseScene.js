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

        // the current option that is selected for the first menu
        this.currentOption = 0;

        // the current option for the volume menu
        this.currentVolumeOption = 0;

        // height between each option of the menu
        this.padding = 64;

        // the width between each option of the volume controls
        // 16 is the space between each option
        // 80 is the width of the sprite
        this.volumePadding = 16+ 128;

        // so i can destroy them when they go to volume controls
        this.menuUI = [];

        // make an array with all the parts of the volume controls so that i can destroy them later
        this.volumeControlsUI = [];

        // create the menu object
        this.createMenuArray();

        // the sound that plays when u change an option or select an opttion
        this.selectSound = this.sound.add("select");

        // keep track of if they are controlling volume or not
        this.editingVolume = false;

        // escape the scene
        this.input.keyboard.on("keydown-ESC", () => {
            this.exit();
        });

        this.input.keyboard.on("keydown-DOWN", () => {
            
            // if you're not editing volume, it moves to the next option down
            if (this.editingVolume == false) this.optionDown();

            // if you are editing volume AND you're on the right selection, it changes the volume of that selection (music or SFX)
            // currentVolumeOption less than two means that it will be on music or sfx, not back
            if (this.editingVolume == true && this.currentVolumeOption < 2) {
                this.volumeControlsArray[this.currentVolumeOption].functionDown();
            }
        }); 

        this.input.keyboard.on("keydown-UP", () => {

            // if you're not editing volume, it moves to the next option down
            if (this.editingVolume == false) this.optionUp();

            // if you are editing volume AND you're on the right selection, it changes the volume of that selection (music or SFX)
            // currentVolumeOption less than two means that it will be on music or sfx, not back
            if (this.editingVolume == true && this.currentVolumeOption < 2) {
                this.volumeControlsArray[this.currentVolumeOption].functionUp();
            }
        }); 

        this.input.keyboard.on("keydown-LEFT", () => {
            if (this.editingVolume) this.optionLeft();
        });

        this.input.keyboard.on("keydown-RIGHT", () => {
            if (this.editingVolume) this.optionRight();
        });

        this.input.keyboard.on("keydown-SPACE", () => {
            // this function acts differently depending on "editingVolume" so i don't need to use that logic here
            this.selectOption();
        });

        // enter or space works, for usability
        this.input.keyboard.on("keydown-ENTER", () => {
            // this function acts differently depending on "editingVolume" so i don't need to use that logic here
            this.selectOption();
        });

        // transparent rectangle to lower the contrast on the play scene and shade the boxes nicely
        this.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            currentColor,
            overlayAlpha
        ).setOrigin(0,0).setDepth(90);
    }

    createMenuArray() {

        this.editingVolume = false;

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

        // creates the controls for the volume
        // notably, this changes the variable "editingVolume" to "true," which changes the behavior of inputs
        this.volumeControls = {
            name: "Volume",
            function: () => this.createVolumeControls()
        }

        // the menu is an array of the options
        this.menu = [this.backOption, this.restartOption, this.volumeControls];

        // draw the menu options
        this.drawMenuObject();
    }

    drawMenuObject() {

        for (let i = 0; i < this.volumeControlsUI.length; i++) {
            this.volumeControlsUI[i].destroy();
        }

        // loop over every option in the menu array
        for (let i = 0; i < this.menu.length; i++) {

            // a sprite that appears under the text of the menu options
            this.menuBox = this.add.sprite(
                config.width/2,
                this.placeMenuOption(i),
                "menu box"
            ).setOrigin(.5, .5);

            this.menuUI.push(this.menuBox);

            // for every option, draw the name of the option
            this.menuText = this.add.text(
                config.width/2,
                this.placeMenuOption(i),    
                this.menu[i].name,
                menuTextConfig
            ).setOrigin(.5, .5).setDepth(100);

            this.menuUI.push(this.menuText);
        }

        // a sprite that is the outline of the menu box sprite that gets drawn right on top of it 
        // to show which option is currently selected 
        this.menuSelect = this.add.sprite(
            this.menuBox.x,
            this.placeMenuOption(this.currentOption),
            "menu select"
        ).setOrigin(.5, .5);

        this.menuUI.push(this.menuSelect);
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

    createVolumeControls() {
        this.editingVolume = true;

        // this is the same idea as with the other options 
        this.musicControls = {
            name: "Music",
            functionUp: () => this.increaseMusicVolume(),
            functionDown: () => this.decreaseMusicVolume()
        }

        this.SFXControls = {
            name: "SFX",
            functionUp: () => this.increaseSFXVolume(),
            functionDown: () => this.decreaseSFXVolume()
        }

        this.volumeControlsBack = {
            name: "Back",
            function: () => this.createMenuArray()
        }

        this.volumeControlsArray = [this.musicControls, this.SFXControls, this.volumeControlsBack];

        this.drawVolumeControls();
    }

    drawVolumeControls() {

        for (let i = 0; i < this.menuUI.length; i++) {
            this.menuUI[i].destroy();
        }

        // iterate over the volumeControlsArray to draw everything
        for (var i = 0; i < this.volumeControlsArray.length; i++) {

            this.volumeBox = this.add.sprite(
                // another function similar to the one for the menu text
                this.placeVolumeOption(i),
                config.height/2,
                "volume box"
            ).setOrigin(.5, .5);
            this.volumeControlsUI.push(this.volumeBox);
            
            this.volumeText = this.add.text(
                this.placeVolumeOption(i),
                config.height/2,
                this.volumeControlsArray[i].name,
                menuTextConfig
            ).setOrigin(.5, .5).setDepth(100);

            this.volumeControlsUI.push(this.volumeText);
        }

        this.volumeSelect = this.add.sprite(
            this.placeVolumeOption(this.currentVolumeOption),
            config.height/2,
            "volume select"
        ).setOrigin(.5, .5);

        this.volumeControlsUI.push(this.volumeSelect);

    }

    increaseMusicVolume() {
        
        // lowers or raises the volume of the music
        masterMusicVolume += .1;
        
        // but not lower than 0 or higher than 2
        if (masterMusicVolume < 0) masterMusicVolume = 0;
        if (masterMusicVolume > 2) masterMusicVolume = 2;

        // then we apply the changed volume to the music object 
        music.volume = masterMusicVolume;
        console.log(masterMusicVolume);
    }

    decreaseMusicVolume() {
        
        // lowers or raises the volume of the music
        masterMusicVolume -= .1;
        
        // but not lower than 0 or higher than 2
        if (masterMusicVolume < 0) masterMusicVolume = 0;
        if (masterMusicVolume > 2) masterMusicVolume = 2;

        // then we apply the changed volume to the music object 
        music.volume = masterMusicVolume;
        console.log(masterMusicVolume);
    }

    increaseSFXVolume() {
        
        // lowers or raises the volue of the SFX
        masterSFXVolume += .1;

        // but not lower than 0 or higher than 2
        if (masterSFXVolume < 0) masterSFXVolume = 0;

        if (masterSFXVolume > 2) masterSFXVolume = 2;

        // because the SFX volumes are updated in Play.js and Ritual.js, we don't need to change it here
        // we DO need to change the volume in this scene tho
        // there is only one SFX
        this.selectSound.volume = masterSFXVolume;
        this.selectSound.play();

        console.log(masterSFXVolume);
    }

    decreaseSFXVolume() {
        
        // lowers or raises the volue of the SFX
        masterSFXVolume -= .1;

        // but not lower than 0 or higher than 2
        if (masterSFXVolume < 0) masterSFXVolume = 0;

        if (masterSFXVolume > 2) masterSFXVolume = 2;

        // because the SFX volumes are updated in Play.js and Ritual.js, we don't need to change it here
        // we DO need to change the volume in this scene tho
        // there is only one SFX
        this.selectSound.volume = masterSFXVolume;
        this.selectSound.play();
        console.log(masterSFXVolume);
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

        // play the select sound
        this.selectSound.play();
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

        // play the select sound
        this.selectSound.play();
    }

    // this and option left are only for the volume stuff
    optionRight() {
        
        // add one
        this.currentVolumeOption++;

        // if it is more than the legnth of the menu array, it wraps to 0
        if (this.currentVolumeOption == this.volumeControlsArray.length) {
            this.currentVolumeOption = 0;
        }

        // then we update the y of the select sprite
        this.volumeSelect.x = this.placeVolumeOption(this.currentVolumeOption);

        // play the select sound
        this.selectSound.play();
    }

    optionLeft() {
        
        // add one
        this.currentVolumeOption--;

        // if it is more than the legnth of the menu array, it wraps to 0
        if (this.currentVolumeOption == -1) {
            this.currentVolumeOption = this.volumeControlsArray.length - 1;
        }

        // then we update the y of the select sprite
        this.volumeSelect.x = this.placeVolumeOption(this.currentVolumeOption);

        // play the select sound
        this.selectSound.play();
    }

    selectOption() {

        if (this.editingVolume == false) {

            this.menu[this.currentOption].function();
            // play the select sound
            this.selectSound.play();

        }else if (this.currentVolumeOption = 2) {
            this.volumeControlsArray[this.currentVolumeOption].function();
        }
        
    }

    placeMenuOption(i) {    // this formula places everything in the right place <3

        // start at the middle, subtract one from i so that the second option is the one that's centered, then multiply by padding
        return config.height/2 + (i -1) * this.padding;
    }

    placeVolumeOption(i) {    // this formula places everything in the right place <3

        // start at the middle, subtract one from i so that the second option is the one that's centered, then multiply by padding
        return config.width/2 + (i -1) * this.volumePadding;
    }
}