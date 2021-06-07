// literaly this entire scene is just to display a single sprite LOL

class PreCreditsScene extends Phaser.Scene {
    constructor() {
        super("preCreditsScene");
    }

    preload() {
        this.load.spritesheet("take it", "./assets/gamepieces/endscene.png",
            {frameWidth: 640, frameHeight: 640, startFrame: 0, endFrame: 3});

        

        this.load.spritesheet("share it", "./assets/gamepieces/endscene2.png",
            {frameWidth: 640, frameHeight: 640, startFrame: 0, endFrame: 3});

        this.load.audio("level one music", "./assets/sound/BackgroundMusic.wav");
        this.load.audio("endcredit1", "./assets/sound/EndCredit1.wav");
        this.load.audio("endcredit2", "./assets/sound/EndCredit2.wav");
        this.load.audio("endcredit2quiet", "./assets/sound/EndCredit2Quiet.wav");
        this.load.audio("river sound", "./assets/sound/River.wav");
    }

    create() {

        this.initializeAnimations();
        this.initializeSound();

        this.fadeInComplete = false;
        this.cameras.main.fadeIn(1000).on("camerafadeincomplete", () => {
            this.fadeInComplete = true;
        });

        this.add.sprite(0, 0, option, 0).setOrigin(0, 0).play(option);

        // so that you can only trigger the scene change once
        this.once = true;

        this.input.keyboard.on("keydown", () => {
            if (this.once = true) {
                this.once = false;
                this.cameras.main.fadeOut(1000).on("camerafadeoutcomplete", () => {
            
                    this.scene.start("creditsScene");
                });
            }
        });
    }

    nextScene() {
        this.scene.play("creditsScene")
    }

    initializeAnimations() {
        console.log(option);
        this.anims.create({
            key: "take it",
            frames: this.anims.generateFrameNumbers("take it", 
            {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: "share it",
            frames: this.anims.generateFrameNumbers("share it", 
            {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        });
    }

    initializeSound() {
        if (option == "share it") {
            this.sound.get("river sound").stop();
            music = this.sound.add("endcredit1");
            music.play();
            music.setVolume(masterMusicVolume);
            music.setLoop(true);

        }

        else if (option == "take it") {
            this.sound.get("river sound").stop();
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
}