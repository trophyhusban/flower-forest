let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Play],
};

let game = new Phaser.Game(config);

let unit = game.config.height / 15;

let keySPACE;
let textConfig;