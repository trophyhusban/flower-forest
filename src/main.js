let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 640,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Menu, Play],
    pixelArt: true,
};

let game = new Phaser.Game(config);

let uiUnit = game.config.height / 20;
let gridSize = 11;
let gridUnit = game.config.width / (gridSize - 1);
let unit = game.config.height / 15;

let keySPACE, keyUP, keyDOWN, keyLEFT, keyRIGHT;
let textConfig;
let textJSON;