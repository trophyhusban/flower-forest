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
        this.load.image("oneSprite", "./assets/gamepieces/player1.png");
        this.load.image("ritualCircleBasic", "./assets/gamepieces/ritualCircleBasic.png");
        this.load.spritesheet("ritualTree", "./assets/gamepieces/treeSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.image("small to big note UI", "./assets/ui/little_to_big_ritual.png");
        this.load.image("small to big note", "./assets/gamepieces/noteOne.png");
        this.load.spritesheet("flowerCrumb", "./assets/gamepieces/flower.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 6});
        this.load.spritesheet("puck", "./assets/gamepieces/puckSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.image("tileSheet", "./assets/tilesets/tilesheet.png");
        this.load.tilemapTiledJSON("level1", "./assets/tilesets/level1.json");
        this.load.audio("footsteps", "./assets/sound/Footsteps.wav");
        this.load.audio("talking", "./assets/sound/CharacterSpeak.wav");
    }
    create() {
        this.initializeAudio();
        this.initializeAnimations();

        this.camera = this.cameras.main;

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
            fontSize: "24px",
            color: "#050",
            align: "center",
            padding: 4,
            wordWrap: {width: config.width - uiUnit*2},
            align: "left"
        };

        //create anomaly doors
        this.warp1 = this.level1Map.findObject("triggers", obj => obj.name ==="warp1");
        this.warp2down = this.level1Map.findObject("triggers", obj => obj.name ==="warp2down");
        this.warp2up = this.level1Map.findObject("triggers", obj => obj.name ==="warp2up");

        //create first ritual
        this.ritual1DoorObj = this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual1Door");
        this.ritual1Obj = this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual1");
        this.simpleRitual1 = new Ritual(this, this.ritual1DoorObj, "ritualTree", this.ritual1Obj, "ritualCircleBasic");

        //create flower group
        this.flowerTrail = this.add.group({
            runChildUpdate: true
        });
        

        this.spawnPoint = this.level1Map.findObject("triggers", obj => obj.name === "Spawnpoint");
        this.camCenterX = this.spawnPoint.x;
        this.camCenterY = this.spawnPoint.y;
        this.camera.centerOn(this.camCenterX, this.camCenterY);

        //create player
        this.player = new One(
            this, 
            this.spawnPoint.x, 
            this.spawnPoint.y, 
            "oneSprite").setDepth(100);

        //create doppelganger
        this.doppelganger = new Other(
            this, 
            (Math.floor(gridSize / 2) - 1) * gridUnit, 
            Math.floor(gridSize / 2) * gridUnit, 
            "oneSprite");
        this.input.keyboard.on("keydown-M", () => {
            this.doppelganger.mirrorMode = !this.doppelganger.mirrorMode;
        });

        //this.openDialogue(uiUnit, 64, textJSON.puck1, textConfig);

        this.testNote = new NPC(
            this,
            this.player,
            2572 - 128 - 64,
            1695 + 64,
            ["small to big note"],
            0,
            "small to big note UI",
            "note"
        );
        
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

        
    }

    update() {
        console.log(this.player.nextToNPC);
        this.updateFootsteps();

        this.player.update();
        this.doppelganger.update();
        this.testNote.update();
        this.puckNPC1.update();
        

        this.physics.world.collide(this.player, this.wallLayer);
        this.physics.world.collide(this.player, this.ritual1Door);
        this.physics.world.collide(this.doppelganger, this.wallLayer);

        this.simpleRitual1.update();


        this.doorCheck = this.level1Map.getTileAtWorldXY(this.player.x, this.player.y, false, this.camera, "doors");
        if(this.doorCheck != null) {
            if(this.doorCheck.properties.direction == "up") {
                this.camCenterY -= (gridSize * gridUnit);
                this.player.y -= 3 * gridUnit;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("door up");
            }
            else if(this.doorCheck.properties.direction == "down") {
                this.camCenterY += (gridSize * gridUnit);
                this.player.y += 3 * gridUnit;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("door down");
            }
            else if(this.doorCheck.properties.direction == "left") {
                this.camCenterX -= (gridSize * gridUnit);
                this.player.x -= 3 * gridUnit;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("door left");
            }
            else if(this.doorCheck.properties.direction == "right") {
                this.camCenterX += (gridSize * gridUnit);
                this.player.x += 3 * gridUnit;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("door right");
            }
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.warp1.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.warp1.y) {
            this.camCenterX += 4 * (gridSize * gridUnit);
            this.player.x += (4 * (gridSize * gridUnit)) - (2 * gridUnit);
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            console.log("warp1");
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.warp2down.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.warp2down.y) {
            this.camCenterY += 2 * (gridSize * gridUnit);
            this.player.y += (gridSize * gridUnit) + (3 * gridUnit);
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            console.log("warp2down");
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.warp2up.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.warp2up.y) {
            this.camCenterY -= 2 * (gridSize * gridUnit);
            this.player.y -= (gridSize * gridUnit) + (3 * gridUnit);
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            console.log("warp2up");
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
            frameRate: 6,
            repeat: -1
        });
    }


}