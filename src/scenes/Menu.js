// this scene is really simple. we display the title screen art, wait for the player to press space, and then start the game :-)
// alexa made the title screen art it looks rly good T-T

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image("menu ui", "./assets/ui/title_screen.png");
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

        this.add.sprite(0, 0, "menu ui").setOrigin(0, 0);
        // textConfig = {
        //     fontFamily: "express",
        //     fontSize: "48px",
        //     color: "#002416",
        //     align: "center",
        //     padding: 4,
        //     wordWrap: {width: config.width - unit*2},
        //     align: "center"
        // };
        
        this.input.keyboard.on("keydown-SPACE", () => {
            this.select.play();
            this.cameras.main.fadeOut(500).on("camerafadeoutcomplete", () => {
                this.scene.start("playScene");
            });
        });
    }
}