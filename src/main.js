let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Play],
};

let game = new Phaser.Game(config);

let uiUnit = game.config.height / 15;