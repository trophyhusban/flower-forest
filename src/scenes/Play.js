class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    init() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    preload() {
        this.load.image("text box", "./assets/ui/textbox.png");
        this.load.image("text box flowers", "./assets/ui/textbox_flowers.png");
        this.load.image("text box tail", "./assets/ui/textbox_tail.png");
        this.load.image("text box tail mask", "./assets/ui/textbox_tail.png");
        this.load.image("oneSprite", "./assets/gamepieces/player1.png");
        this.load.image("ritualCircleBasic", "./assets/gamepieces/ritualCircleBasic.png");
        this.load.spritesheet("ritualTree", "./assets/gamepieces/treeSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.image("ritualHalf1", "./assets/gamepieces/halfNoteB/halfNoteB1.png");
        this.load.image("ritualHalf2", "./assets/gamepieces/halfNoteB/halfNoteB2.png");
        this.load.image("ritualHalf3", "./assets/gamepieces/halfNoteB/halfNoteB3.png");
        this.load.image("ritualHalf4", "./assets/gamepieces/halfNoteB/halfNoteB4.png");
        this.load.image("ritualLittleBig1", "./assets/gamepieces/little2BigA/little2BigA1.png");
        this.load.image("ritualLittleBig2", "./assets/gamepieces/little2BigA/little2BigA2.png");
        this.load.image("ritualLittleBig3", "./assets/gamepieces/little2BigA/little2BigA3.png");
        this.load.image("ritualLittleBig4", "./assets/gamepieces/little2BigA/little2BigA4.png");
        this.load.image("ritualSliced1", "./assets/gamepieces/slicedC/slicedC1.png");
        this.load.image("ritualSliced2", "./assets/gamepieces/slicedC/slicedC2.png");
        this.load.image("ritualSliced3", "./assets/gamepieces/slicedC/slicedC3.png");
        this.load.image("ritualSliced4", "./assets/gamepieces/slicedC/slicedC4.png");
        this.load.image("little big UI", "./assets/gamepieces/little2BigA/little2BigBig.png");
        this.load.image("little big note", "./assets/gamepieces/noteOne.png");
        this.load.image("sliced note", "./assets/gamepieces/slicedC/noteC.png");
        this.load.image("sliced UI", "./assets/gamepieces/slicedC/slicedUI.png");
        this.load.image("half left UI", "./assets/gamepieces/halfNoteB/halfNoteBLeft.png");
        this.load.image("half left note", "./assets/gamepieces/halfNoteB/noteBLeft.png");
        this.load.image("half right UI", "./assets/gamepieces/halfNoteB/halfNoteBRight.png");
        this.load.image("half right note", "./assets/gamepieces/halfNoteB/noteBRight.png");
        this.load.image("arrow key up", "./assets/ui/arrow_key_up.png");
        this.load.image("space key", "./assets/ui/space_key.png");
        this.load.spritesheet("flowerCrumb", "./assets/gamepieces/flower.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 6});
        this.load.spritesheet("puck", "./assets/gamepieces/puckSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet("titania", "./assets/gamepieces/titannaSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet("flowerfae", "./assets/gamepieces/flowerfaeSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.image("tileSheet", "./assets/tilesets/tilesheet.png");
        this.load.tilemapTiledJSON("level1", "./assets/tilesets/level1.json");
        this.load.audio("footsteps", "./assets/sound/Footsteps.wav");
        this.load.audio("talking", "./assets/sound/CharacterSpeak.wav");
    }
    create() {
        this.initializeAudio();

        this.camera = this.cameras.main;
        this.camera.zoom = 8;
        this.camera.fadeIn(500);

        this.level1Map = this.make.tilemap({key: "level1"});
        this.tileSet = this.level1Map.addTilesetImage("tilesheet", "tileSheet");
        levelWidth = 7;
        levelHeight = 4;
        this.camera.setBounds(0, 0, this.level1Map.displayWidth, this.level1Map.displayHeight);

        this.groundLayer = this.level1Map.createLayer("floor", this.tileSet, 0, 0);
        this.wallLayer = this.level1Map.createLayer("terrain", this.tileSet, 0, 0);
        this.wallLayer.setCollisionByProperty({wall: true});
        this.doorLayer = this.level1Map.createLayer("doors", this.tileSet, 0, 0);

        // //debug hitboxes for wall tiles
        // this.debugGraphics = this.add.graphics().setAlpha(0.75);
        // this.wallLayer.renderDebug(this.debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //   });

        textConfig = {
            fontFamily: "express",
            fontSize: "27px",
            color: "#000",
            align: "center",
            padding: 4,
            wordWrap: {width: config.width - uiUnit*2},
            align: "left"
        };

        //create anomaly doors
        this.warp1 = this.level1Map.findObject("triggers", obj => obj.name ==="warp1");
        this.warp2down = this.level1Map.findObject("triggers", obj => obj.name ==="warp2down");
        this.warp2up = this.level1Map.findObject("triggers", obj => obj.name ==="warp2up");

        //create end of level trigger
        this.endLevel1 = this.level1Map.findObject("triggers", obj => obj.name ==="levelEnd");

        //create first ritual
        this.ritual1DoorObj = this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual1Door");
        this.ritual1Obj = this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual1");
        this.simpleRitual1 = new Ritual(this, this.ritual1DoorObj, "ritualTree", this.ritual1Obj, "ritualCircleBasic");

        //create halfNote ritual
        this.halfNoteRitual = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="halfdoor"), "ritualTree",
            this.level1Map.findObject("rituals", obj => obj.name ==="half4"), "ritualHalf4",
            this.level1Map.findObject("rituals", obj => obj.name ==="half3"), "ritualHalf3",
            this.level1Map.findObject("rituals", obj => obj.name ==="half1"), "ritualHalf1",
            this.level1Map.findObject("rituals", obj => obj.name ==="half2"), "ritualHalf2");
        
        //create little2Big ritual
        this.littleBigRitual = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="little2bigdoor"), "ritualTree",
            this.level1Map.findObject("rituals", obj => obj.name ==="little2big1"), "ritualLittleBig1",
            this.level1Map.findObject("rituals", obj => obj.name ==="little2big3"), "ritualLittleBig3",
            this.level1Map.findObject("rituals", obj => obj.name ==="little2big2"), "ritualLittleBig2",
            this.level1Map.findObject("rituals", obj => obj.name ==="little2big4"), "ritualLittleBig4");
        
        //create sliced ritual
        this.slicedRitual = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="sliceddoor"), "ritualTree",
            this.level1Map.findObject("rituals", obj => obj.name ==="sliced2"), "ritualSliced2",
            this.level1Map.findObject("rituals", obj => obj.name ==="sliced3"), "ritualSliced3",
            this.level1Map.findObject("rituals", obj => obj.name ==="sliced4"), "ritualSliced4",
            this.level1Map.findObject("rituals", obj => obj.name ==="sliced1"), "ritualSliced1");

        //create flower group
        this.flowerTrail = this.add.group({
            runChildUpdate: true
        });

        this.initializeAnimations();

        this.spawnPoint = this.level1Map.findObject("triggers", obj => obj.name === "Spawnpoint");
        this.camCenterX = this.spawnPoint.x;
        this.camCenterY = this.spawnPoint.y;
        this.camera.centerOn(this.camCenterX, this.camCenterY);

        //create player
        this.player = new One(
            this, 
            this.spawnPoint.x, 
            this.spawnPoint.y, 
            "oneSprite").setDepth(105);

        //create doppelganger
        this.doppelganger = new Other(
            this, 
            (Math.floor(gridSize / 2) - 1) * gridUnit, 
            Math.floor(gridSize / 2) * gridUnit, 
            "oneSprite");
        this.doppelganger.setDepth(105);

        this.input.keyboard.on("keydown-M", () => {
            this.doppelganger.mirrorMode = !this.doppelganger.mirrorMode;
        });

        //this.openDialogue(uiUnit, 64, textJSON.puck1, textConfig);

        this.NPCArray = [];

        this.testNote = new NPC(
            this,
            this.player,
            3868,
            2406,
            ["little big note"],
            0,
            "little big UI",
            "note"
        ).setDepth(105);

        this.NPCArray.push(this.testNote);

        this.slicedNote = new NPC(
            this,
            this.player,
            3100,
            204,
            ["sliced note"],
            0,
            "sliced UI",
            "note"
        ).setDepth(105);

        this.NPCArray.push(this.slicedNote);

        this.halfNoteLeft = new NPC(
            this,
            this.player,
            4646,
            1004,
            ["half left note"],
            0,
            "half left UI",
            "note"
        ).setDepth(105);

        this.NPCArray.push(this.halfNoteLeft);

        this.halfNoteRight = new NPC(
            this,
            this.player,
            924,
            360,
            ["half right note"],
            0,
            "half right UI",
            "note"
        ).setDepth(105);

        this.NPCArray.push(this.halfNoteRight);

        this.puckNPC1 = new NPC(
            this,
            this.player,
            2572,
            1695,
            ["puck", "puckTalking"],
            0,
            textJSON.puck1,
            "NPC"
        );

        this.NPCArray.push(this.puckNPC1);

        this.titaniaNPC1 = new NPC(
            this,
            this.player,
            3168,
            482,
            ["titania", "titaniaTalking"],
            0,
            textJSON.titania1,
            "NPC"
        );

        this.NPCArray.push(this.titaniaNPC1);

        this.titaniaNPC1 = new NPC(
            this,
            this.player,
            3168,
            482,
            ["titania", "titaniaTalking"],
            0,
            textJSON.titania1,
            "NPC"
        );

        this.NPCArray.push(this.titaniaNPC1);

        this.flowerfaeNPC1 = new NPC(
            this,
            this.player,
            1110,
            2530,
            ["flowerfae", "flowerfaeTalking"],
            0,
            textJSON.flowerfae1,
            "NPC"
        );

        this.NPCArray.push(this.flowerfaeNPC1);
        
        while (prevColor == currentColor) {
            currentColor = Phaser.Math.RND.pick(colors);
        }
        prevColor = currentColor;

        this.coloredRectangle = this.add.rectangle(
            0,
            0,
            this.level1Map.width*64,
            this.level1Map.height*64,
            currentColor,
            .3
        ).setOrigin(0, 0).setDepth(100);

        this.input.keyboard.on("keydown-C", () => {
            this.changeColor();
        });

        this.createTutorialKeys();

        this.tweens.add({
            targets: [this.camera],
            zoom: 1,
            duration: 2500,
            delay: 2000,
            ease: "Quad.easeInOut"
        }).on("complete", () => {
            this.tutorialKeysTweens();
        });
    }

    update() {
        this.updateFootsteps();

        this.updateObjects();
              

        this.physics.world.collide(this.player, this.wallLayer);
        this.physics.world.collide(this.player, this.ritual1Door);
        this.physics.world.collide(this.doppelganger, this.wallLayer);

        this.simpleRitual1.update();
        this.halfNoteRitual.update();
        this.littleBigRitual.update();
        this.slicedRitual.update();


        this.doorCheck = this.level1Map.getTileAtWorldXY(this.player.x, this.player.y, false, this.camera, "doors");
        if(this.doorCheck != null) {
            if(this.doorCheck.properties.direction == "up") {
                this.camCenterY -= (gridSize * gridUnit);
                this.player.y -= 3 * gridUnit;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("door up");
                this.changeColor();
            }
            else if(this.doorCheck.properties.direction == "down") {
                this.camCenterY += (gridSize * gridUnit);
                this.player.y += 3 * gridUnit;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("door down");
                this.changeColor();
            }
            else if(this.doorCheck.properties.direction == "left") {
                this.camCenterX -= (gridSize * gridUnit);
                this.player.x -= 3 * gridUnit;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("door left");
                this.changeColor();
            }
            else if(this.doorCheck.properties.direction == "right") {
                this.camCenterX += (gridSize * gridUnit);
                this.player.x += 3 * gridUnit;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("door right");
                this.changeColor();
            }
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.warp1.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.warp1.y) {
            this.camCenterX += 4 * (gridSize * gridUnit);
            this.player.x += (4 * (gridSize * gridUnit)) - (2 * gridUnit);
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            console.log("warp1");
            this.changeColor();
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.warp2down.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.warp2down.y) {
            this.camCenterY += 2 * (gridSize * gridUnit);
            this.player.y += (gridSize * gridUnit) + (3 * gridUnit);
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            console.log("warp2down");
            this.changeColor();
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.warp2up.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.warp2up.y) {
            this.camCenterY -= 2 * (gridSize * gridUnit);
            this.player.y -= (gridSize * gridUnit) + (3 * gridUnit);
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            console.log("warp2up");
            this.changeColor();
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.endLevel1.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.endLevel1.y) {
            this.add.text(this.camCenterX - (gridSize * gridUnit) / 4,
                this.camCenterY,
                "Thank you for completing\nthe Level 1 demo.",
                textConfig);
            //this.changeColor();
        }
    }
    
    updateFootsteps() {
        if (this.player.walking && this.footsteps.isPlaying == false) {
            this.footsteps.resume();
        }
        if (this.player.walking == false && this.footsteps.isPlaying) {
            this.footsteps.pause();
        }
    }

    initializeAudio() {
        this.footsteps = this.sound.add("footsteps");
        this.talking = this.sound.add("talking");

        this.footsteps.setLoop(true);
        this.footsteps.play();
        this.footsteps.pause();
        this.footsteps.setVolume(.2);
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
            key: "puckTalking",
            frames: this.anims.generateFrameNumbers("puck",
                {start:0, end:1, first: 0}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "titaniaTalking",
            frames: this.anims.generateFrameNumbers("titania",
                {start:0, end:1, first: 0}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "flowerfaeTalking",
            frames: this.anims.generateFrameNumbers("flowerfae",
                {start:0, end:1, first: 0}),
            frameRate: 8,
            repeat: -1
        });

        //create ritual tree anim
        this.anims.create({
            key: 'treeStand',
            frames: this.anims.generateFrameNumbers("ritualTree",
                {start: 0, end: 2, first: 0}),
            frameRate: 6
        });
        this.anims.create({
            key: 'treeWalk',
            frames: this.anims.generateFrameNumbers("ritualTree",
                {start: 3, end: 4, first: 3}),
            frameRate: 2,
            repeat: -1
        });
    }

    changeColor() {
        while (prevColor == currentColor) {
            currentColor = Phaser.Math.RND.pick(colors);
        }
        prevColor = currentColor;
        this.coloredRectangle.fillColor = currentColor;
    }

    updateObjects() {
        this.player.update();
        this.doppelganger.update();
        this.tutorialKeyUp.update();
        this.tutorialKeyDown.update();
        this.tutorialKeyLeft.update();
        this.tutorialKeyRight.update();
        this.tutorialKeySpace.update();

        for (let i of this.NPCArray) {
            i.update();
        }
    }

    createTutorialKeys() {
        this.tutorialKeyUp = new TutorialKey(
            this,
            this.camCenterX,
            this.camCenterY + config.height/2 - uiUnit*5 + 400,
            "arrow key up",
            0,
            "up",
            "up"
            ).setDepth(106);
        this.tutorialKeyDown = new TutorialKey(
            this,
            this.camCenterX,
            this.camCenterY + config.height/2 - uiUnit*5 + 34 + 400,
            "arrow key up",
            0,
            "down",
            "down"
            ).setDepth(106);
        this.tutorialKeyLeft = new TutorialKey(
            this,
            this.camCenterX - 33,
            this.camCenterY + config.height/2 - uiUnit*5 + 34 + 400,
            "arrow key up",
            0,
            "left",
            "left"
            ).setDepth(106);
        this.tutorialKeyRight = new TutorialKey(
            this,
            this.camCenterX + 33,
            this.camCenterY + config.height/2 - uiUnit*5 + 34 + 400,
            "arrow key up",
            0,
            "right",
            "right"
            ).setDepth(106);

        this.tutorialKeySpace = new TutorialKey(
            this,
            this.camCenterX,
            this.camCenterY + config.height/2 - uiUnit*5 + 34*2 + 400,
            "space key",
            0,
            "up",
            "space"
            ).setDepth(106);

    }

    tutorialKeysTweens() {
        this.add.tween({
            targets: [this.tutorialKeyUp],
            y: this.camCenterY + config.height/2 - uiUnit*5,
            duration: 1500,
            ease: "Quad.easeOut",
            delay: 750
        });

        this.add.tween({
            targets: [this.tutorialKeyDown, this.tutorialKeyRight,this.tutorialKeyLeft],
            y: this.camCenterY + config.height/2 - uiUnit*5 + 34,
            duration: 1500,
            ease: "Quad.easeOut",
            delay: 750
        });

        this.add.tween({
            targets: [this.tutorialKeySpace],
            y: this.camCenterY + config.height/2 - uiUnit*5 + 34*2,
            duration: 1500,
            ease: "Quad.easeOut",
            delay: 750
        });
    }
}