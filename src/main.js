let config = {
    type: Phaser.WEB,
    width: 640,
    height: 640,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },
    scene: [Menu, Play, DialogueScene, NoteScene, GameOverScene, PreCreditsScene, CreditsScene, PauseScene],
    pixelArt: true,
};

let game = new Phaser.Game(config);

let uiUnit = game.config.height / 20;
let gridSize = 11;
let gridUnit = game.config.width / (gridSize - 1);
let unit = game.config.height / 15;

let levelWidth, levelHeight, currentLevel;

let keySPACE, keyUP, keyDOWN, keyLEFT, keyRIGHT, keyONE, keyTWO, keyTHREE, keyFOUR, keyFIVE, keyEIGHT, keyNINE, keyZERO;

// the text config object used in most of the game
let textConfig;

// the text config object used in the pause menu and at the choice at the end
let menuTextConfig;

// a json file that contains all of the dialogue in the game
let textJSON;

let textBox = {};
let noteGlobal;
let masterMusicVolume = 1;
let masterSFXVolume = 1;
let music;
let option;

// a global variable to keep track of whether the loading screen has been done or not
let loadedAssets = false;

let fromGameOver = false;

// this is the array of colors that we use in the overlay
// the idea is that every in every room, we randomize the color overlay
// the overlay manifests itself as a mostly transparent rectangle that most objects are drawn below
// thematically, the overlay is magic used by the forest to disorient the player character and make them lost
// because the forest does not like strangers
// to make this work, everything that is below the overlay is drawn with a monochromatic color pallete
// it is green originally which is a cute detail cuz forests are green
let colors = [0xff0060, 0xff6000, 0xffbf00, 0xdfff00, 0x00ff20, 0x00ffdf, 0x0080ff, 0x2000ff];
let colorIndex = Phaser.Math.RND.integerInRange(0, 7);
let currentColor = colors[colorIndex];
let prevColor = currentColor;
let overlayAlpha = .3;