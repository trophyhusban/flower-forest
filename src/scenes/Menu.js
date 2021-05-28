// this scene is really simple. we display the title screen art, wait for the player to press space, and then start the game :-)
// alexa made the title screen art it looks rly good T-T

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image("menu ui", "./assets/ui/title_screen.png");
        this.load.image("menu text", "./assets/ui/title_screen_text.png");
        this.load.image("menu names", "./assets/ui/title_screen_names.png");
        this.load.spritesheet("flowerCrumb", "./assets/gamepieces/flower.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 6});
        this.load.json("text JSON", "./assets/text/text.json");
        this.load.audio("select", "./assets/sound/Select.wav");
    }
    create() {

        // smooth ;-)
        this.cameras.main.fadeIn(1000);

        // this variable contains all the text in the game o.o i load it in the title screen bc i can 
        textJSON = this.cache.json.get("text JSON");

        // play a sound
        this.select = this.sound.add("select");
        this.select.setVolume(1.5);

        this.add.sprite(0, 0, "menu ui").setOrigin(0, 0);

        this.menuText = this.add.sprite(config.width*-1, 0, "menu text").setOrigin(0, 0);

        this.menuNames = this.add.sprite(0, config.height*-1, "menu names").setOrigin(0, 0);

        this.tweens.add({
            targets: [this.menuText],
            x: {from: config.width*-1, to: 0},
            duration: 2000,
            ease: "Sine.Out",
            delay: 1500
        });

        this.tweens.add({
            targets: [this.menuNames],
            y: {from: config.height*-1, to: 0},
            duration: 2000,
            ease: "Sine.Out",
            delay: 1500
        });

        
        
        this.input.keyboard.on("keydown-SPACE", () => {
            this.select.play();
            this.cameras.main.fadeOut(500).on("camerafadeoutcomplete", () => {
                this.scene.start("playScene");
            });
        });
    }
}