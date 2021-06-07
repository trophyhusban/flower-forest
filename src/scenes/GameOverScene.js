// literaly this entire scene is just to display the game over sprite

class GameOverScene extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.spritesheet("gameOver", "./assets/gamepieces/level two/endscenelevel2.png",
            {frameWidth: 640, frameHeight: 640, startFrame: 0, endFrame: 9});


        this.load.audio("level one music", "./assets/sound/BackgroundMusic.wav");
        this.load.audio("endcredit2", "./assets/sound/EndCredit2.wav");
        this.load.audio("endcredit2quiet", "./assets/sound/EndCredit2Quiet.wav");
    }

    create() {

        this.initializeAnimations();
        this.initializeSound();

        this.fadeInComplete = false;
        this.cameras.main.fadeIn(1000).on("camerafadeincomplete", () => {
            this.fadeInComplete = true;
        });

        this.add.sprite(0, 0, "gameOver", 0).setOrigin(0, 0).play("gameOver");

        // so that you can only trigger the scene change once
        this.once = true;

        this.input.keyboard.on("keydown", () => {
            if (this.once = true) {
                this.once = false;
                this.cameras.main.fadeOut(1000).on("camerafadeoutcomplete", () => {
            
                    this.scene.start("playScene");
                });
            }
        });
    }

    nextScene() {
        this.scene.play("playScene")
    }

    initializeAnimations() {
        this.anims.create({
            key: "gameOver",
            frames: this.anims.generateFrameNumbers("gameOver", 
            {start: 0, end: 9, first: 0}),
            frameRate: 6,
            repeat: -1
        });
    }

    initializeSound() {

        music = this.sound.add("endcredit2");
        music.play();
        music.setVolume(masterMusicVolume);

        music.on("complete", () => { 
            music = this.sound.add("endcredit2quiet");
            music.play();
            music.setVolume(masterMusicVolume);
            music.setLoop(true);

        });
            
        

    }
}