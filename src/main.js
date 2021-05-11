let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 750,
    scene: [Play],
};

let game = new Phaser.Game(config);

<<<<<<< HEAD
let uiUnit = game.config.height / 15;
let gridUnit = game.config.width / 51;
=======
let unit = game.config.height / 15;
>>>>>>> 2ea3484f2fb192befba76341668001863325b50e

let keySPACE;
let textConfig;