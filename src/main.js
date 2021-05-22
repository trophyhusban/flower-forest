let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true
        }
    },
    scene: [Menu, Play, DialogueScene, NoteScene],
    pixelArt: true,
};

let game = new Phaser.Game(config);

let uiUnit = game.config.height / 20;
let gridSize = 11;
let gridUnit = game.config.width / (gridSize - 1);
let unit = game.config.height / 15;

let levelWidth, levelHeight;

let keySPACE, keyUP, keyDOWN, keyLEFT, keyRIGHT;
let textConfig;
let textJSON;
let textBox = {};
let noteGlobal;
let colors = [0xff0060, 0xff6000, 0xffbf00, 0xdfff00, 0x00ff20, 0x00ffdf, 0x0080ff, 0x2000ff];
let currentColor = Phaser.Math.RND.pick(colors);
let prevColor = currentColor;