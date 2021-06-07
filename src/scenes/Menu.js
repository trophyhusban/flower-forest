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
        this.load.spritesheet("flowerCrumb", "./assets/gamepieces/flower.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 6});
        this.load.spritesheet("flowerCrumb2", "./assets/gamepieces/flower2.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 8});
        this.load.spritesheet("flowerCrumb3", "./assets/gamepieces/flower3.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5});
        this.load.image("oneSprite", "./assets/gamepieces/player1.png");
        this.load.audio("titlemusic", "./assets/sound/TitleScreenMusic.wav");
    }
    create() {

        this.initializeAnimations();
        
        // smooth ;-)
        this.cameras.main.fadeIn(1000);

        // this variable contains all the text in the game o.o i load it in the title screen bc i can 
        textJSON = this.cache.json.get("text JSON");

        // play a sound
        this.select = this.sound.add("select");
        this.select.setVolume(1.5);

        this.initializeSounds();
        

        this.add.sprite(0, 0, "menu ui").setOrigin(0, 0);

        this.menuText = this.add.sprite(0, 0, "menu text").setOrigin(0, 0);

        this.menuNames = this.add.sprite(0, 0, "menu names").setOrigin(0, 0);

        this.menuText.alpha = 0;
        this.menuNames.alpha = 0;

        this.tweens.add({
            targets: [this.menuText],
            alpha: {from: 0, to: 1},
            duration: 1500,
            delay: 1500
        });

        this.tweens.add({
            targets: [this.menuNames],
            alpha: {from: 0, to: 1},
            duration: 1500,
            delay: 3000
        });

        
        
        this.input.keyboard.on("keydown-SPACE", () => {
            this.select.play();
            this.titlemusic.setLoop(false);
            this.sound.get("titlemusic").stop();
            this.cameras.main.fadeOut(500).on("camerafadeoutcomplete", () => {
                this.scene.start("playScene");
            });
        });
        
        currentLevel = 1;
    }

    initializeAnimations() {

        //configure flower animations
        this.anims.create({
            key: 'plantCrumb',
            frames: this.anims.generateFrameNumbers("flowerCrumb", 
                {start: 0, end: 6, first: 0}),
            frameRate: 6
        });
        this.anims.create({
            key: 'killCrumb',
            frames: this.anims.generateFrameNumbers("flowerCrumb", 
                {start: 6, end: 0, first: 6}),
            frameRate: 6
        });
        this.anims.create({
            key: 'plantCrumb2',
            frames: this.anims.generateFrameNumbers("flowerCrumb2", 
                {start: 0, end: 8, first: 0}),
            frameRate: 8
        });
        this.anims.create({
            key: 'killCrumb2',
            frames: this.anims.generateFrameNumbers("flowerCrumb2", 
                {start: 8, end: 0, first: 8}),
            frameRate: 8
        });
        this.anims.create({
            key: 'plantCrumb3',
            frames: this.anims.generateFrameNumbers("flowerCrumb3", 
                {start: 0, end: 4, first: 0}),
            frameRate: 6
        });
        this.anims.create({
            key: 'killCrumb3',
            frames: this.anims.generateFrameNumbers("flowerCrumb3", 
                {start: 4, end: 0, first: 4}),
            frameRate: 6
        });

        this.anims.create({
            key: 'yoyoCrumb',
            frames: this.anims.generateFrameNumbers("flowerCrumb", 
                {start: 0, end: 6, first: 0}),
            frameRate: 6,
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: 'yoyoCrumb2',
            frames: this.anims.generateFrameNumbers("flowerCrumb2", 
                {start: 0, end: 8, first: 0}),
            frameRate: 6,
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: 'yoyoCrumb3',
            frames: this.anims.generateFrameNumbers("flowerCrumb3", 
                {start: 0, end: 4, first: 0}),
            frameRate: 6,
            repeat: -1,
            yoyo: true
        });
    }

    initializeSounds() {
        this.titlemusic = this.sound.add("titlemusic");
        this.titlemusic.setVolume(1);
        this.titlemusic.play();
        this.titlemusic.setLoop(true);
    }
}