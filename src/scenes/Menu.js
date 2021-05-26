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

        

        textJSON = this.cache.json.get("text JSON");

        this.select = this.sound.add("select");


        this.anims.create({
            key: 'plantCrumb',
            frames: this.anims.generateFrameNumbers("flowerCrumb", 
                {start: 0, end: 6, first: 0}),
            frameRate: 6
        });
        this.add.sprite(0, 0, "menu ui").setOrigin(0, 0);
        textConfig = {
            fontFamily: "express",
            fontSize: "48px",
            color: "#002416",
            align: "center",
            padding: 4,
            wordWrap: {width: config.width - unit*2},
            align: "center"
        };
        this.titleText = this.add.text(
            config.width/2, 
            uiUnit*3, 
            "Flower Forest", 
            textConfig
            ).setOrigin(.5, 0);
        this.titleText.setDepth(105);
       
        textConfig.fontSize = "24px";
        this.playText = this.add.text(
            config.width/2, 
            uiUnit*6, 
            "space to play", 
            textConfig
            ).setOrigin(.5, 0);
        this.playText.alpha = 0;
        this.playText.setDepth(105);

        this.nameText = this.add.text(
            config.width/2, 
            uiUnit*9, 
            "Alex Basinki\nAlexa Wilbert\nArdent Eliot :-) Reinhard\nStar Hagen-Esquerra", 
            textConfig
            ).setOrigin(.5, 0);
        this.nameText.alpha = 0;
        this.nameText.setDepth(105);

        this.tweens.add({
            targets: [this.titleText],
            alpha: {from: 0, to: 1},
            duration: 1000,
            ease: "Sine.In"
        }).on("complete", () => {
            this.tweens.add({
                targets: [this.playText, this.nameText],
                alpha: {from: 0, to: 1},
                duration: 1000,
                ease: "Sine.In"
            }).on("complete", () => {
                this.leftFlower = this.add.sprite(
                    config.width/2 - uiUnit*3, 
                    uiUnit*6,
                    "plantCrumb"
                    ).setOrigin(1, .25);
                this.leftFlower.setScale(2);
                this.leftFlower.flipX = true;
                this.leftFlower.play("plantCrumb");
        
                this.rightFlower = this.add.sprite(
                    config.width/2 + uiUnit*3,
                    uiUnit*6,
                    "plantCrumb"
                    ).setOrigin(0, .25);
                this.rightFlower.setScale(2);
                this.rightFlower.play("plantCrumb");
            });
        });
        
        this.input.keyboard.on("keydown-SPACE", () => {
            this.select.play();
            this.cameras.main.fadeOut(500).on("camerafadeoutcomplete", () => {
                this.scene.start("playScene");
            });
        });
        
        
        while (prevColor != currentColor) {
            currentColor = Phaser.Math.RND.pick(colors);
        }
        prevColor = currentColor;
        
        this.coloredRectangle = this.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            currentColor,
            .3
        ).setOrigin(0, 0).setDepth(100);
    }
}