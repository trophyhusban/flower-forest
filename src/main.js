let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 750,
    scene: [Play],
};

let game = new Phaser.Game(config);

let uiUnit = game.config.height / 15;
let gridUnit = game.config.width / 51;

let keySPACE;
let textConfig;