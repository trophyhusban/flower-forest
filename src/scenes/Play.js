// this is the scene where most of the gameplay takes place

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
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        keyTHREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        keyFOUR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
        keyFIVE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
        keyEIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EIGHT);
        keyNINE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);
        keyZERO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO);
        this.tileAnimTicker = 0;
        this.tileAnimToggle = false;
    }

    preload() {

        this.cameras.main.fadeIn(250);

        this.loadingScreenObjects = []

        this.loadingScreenRect = this.add.rectangle(0, 0, config.width, config.height, 0x00d585).setOrigin(0, 0).setDepth(200);

        this.loadingScreenObjects.push(this.loadingScreenRect);

        this.loadingScreenFlower1 = this.add.sprite(
            config.width/2 - uiUnit*6, 
            config.height/2,
            "yoyoCrumb2",
            0
        ).setScale(4).play("yoyoCrumb2").setDepth(201);

        this.loadingScreenObjects.push(this.loadingScreenFlower1);

        this.loadingScreenFlower2 = this.add.sprite(
            config.width/2, 
            config.height/2,
            "yoyoCrumb"
        ).setScale(4).play("yoyoCrumb").setDepth(201);

        this.loadingScreenObjects.push(this.loadingScreenFlower2);

        this.loadingScreenFlower3 = this.add.sprite(
            config.width/2 + uiUnit*6, 
            config.height/2,
            "yoyoCrumb3"
        ).setScale(4).play("yoyoCrumb3").setDepth(201);

        this.loadingScreenObjects.push(this.loadingScreenFlower3);
        
        this.load.image("ritualCircleBasic", "./assets/gamepieces/ritualCircleBasic.png");
        this.load.spritesheet("ritualTree", "./assets/gamepieces/treeSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.spritesheet("ritualDoor", "./assets/gamepieces/door-Sheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
        this.load.image("ritualHalfTopLeft", "./assets/gamepieces/halfNoteB/halfNoteupperLeft.png");
        this.load.image("ritualHalfTopMid", "./assets/gamepieces/halfNoteB/halfNoteUpperMid.png");
        this.load.image("ritualHalfTopRight", "./assets/gamepieces/halfNoteB/halfNoteUpperRight.png");
        this.load.image("ritualHalfMidLeft", "./assets/gamepieces/halfNoteB/halfNoteMidLeft.png");
        this.load.image("ritualHalfMidMid", "./assets/gamepieces/halfNoteB/halfNoteMidMid.png");
        this.load.image("ritualHalfMidRight", "./assets/gamepieces/halfNoteB/halfNoteMidRight.png");
        this.load.image("ritualHalfBotLeft", "./assets/gamepieces/halfNoteB/halfNoteBottomleft.png");
        this.load.image("ritualHalfBotMid", "./assets/gamepieces/halfNoteB/halfNoteBottomMid.png");
        this.load.image("ritualHalfBotRight", "./assets/gamepieces/halfNoteB/halfNoteBottomRight.png");
        this.load.image("ritualLittleBig1", "./assets/gamepieces/little2BigA/little2BigA1.png");
        this.load.image("ritualLittleBig2", "./assets/gamepieces/little2BigA/little2BigA2.png");
        this.load.image("ritualLittleBig3", "./assets/gamepieces/little2BigA/little2BigA3.png");
        this.load.image("ritualLittleBig4", "./assets/gamepieces/little2BigA/little2BigA4.png");
        this.load.image("ritualSliced1", "./assets/gamepieces/slicedC/slicedC1.png");
        this.load.image("ritualSliced2", "./assets/gamepieces/slicedC/slicedC2.png");
        this.load.image("ritualSliced3", "./assets/gamepieces/slicedC/slicedC3.png");
        this.load.image("ritualSliced4", "./assets/gamepieces/slicedC/slicedC4.png");
        this.load.image("level3ritual1_1-1", "./assets/gamepieces/level three/1/1left1.png");
        this.load.image("level3ritual1_1-2", "./assets/gamepieces/level three/1/1left2.png");
        this.load.image("level3ritual1_1-3", "./assets/gamepieces/level three/1/1left3.png");
        this.load.image("level3ritual2_1", "./assets/gamepieces/level three/2/2left1.png");
        this.load.image("level3ritual2_2", "./assets/gamepieces/level three/2/2left2.png");
        this.load.image("level3ritual2_3", "./assets/gamepieces/level three/2/2right1.png");
        this.load.image("level3ritual3_1", "./assets/gamepieces/level three/3/3left1.png");
        this.load.image("level3ritual3_2", "./assets/gamepieces/level three/3/3right1.png");
        this.load.image("level3ritual3_3", "./assets/gamepieces/level three/3/3right2.png");
        this.load.image("level3ritual1_2-1", "./assets/gamepieces/level three/1/1right1.png");
        this.load.image("level3ritual1_2-2", "./assets/gamepieces/level three/1/1right2.png");
        this.load.image("level3ritual1_2-3", "./assets/gamepieces/level three/1/1right3.png");
        this.load.image("level3ritual4_1-4", "./assets/gamepieces/level three/4/4left1.png");
        this.load.image("level3ritual4_1-1", "./assets/gamepieces/level three/4/4left2.png");
        this.load.image("level3ritual4_1-2", "./assets/gamepieces/level three/4/4left3.png");
        this.load.image("level3ritual4_1-3", "./assets/gamepieces/level three/4/4left4.png");
        this.load.image("level3ritual4_2-4", "./assets/gamepieces/level three/4/4right1.png");
        this.load.image("level3ritual4_2-1", "./assets/gamepieces/level three/4/4right2.png");
        this.load.image("level3ritual4_2-2", "./assets/gamepieces/level three/4/4right3.png");
        this.load.image("level3ritual4_2-3", "./assets/gamepieces/level three/4/4right4.png");
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
        this.load.image("1 key", "./assets/ui/one_key.png");
        this.load.image("2 key", "./assets/ui/two_key.png");
        this.load.image("3 key", "./assets/ui/three_key.png");
        this.load.image("4 key", "./assets/ui/four_key.png");
        
        this.load.spritesheet("puck", "./assets/gamepieces/puckSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet("titania", "./assets/gamepieces/titannaSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet("flowerfae", "./assets/gamepieces/flowerfaeSheet.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.image("tileSheet", "./assets/tilesets/tilesheet.png");
        this.load.image("riverTiles", "./assets/tilesets/riverTile.png");
        this.load.image("moatTiles", "./assets/tilesets/moatTileSheet.png");
        this.load.image("towerTiles", "./assets/tilesets/tower/tower5.png");
        this.load.tilemapTiledJSON("level1", "./assets/tilesets/level1.json");
        this.load.audio("footsteps", "./assets/sound/Footsteps.wav");
        this.load.audio("ritualFootsteps", "./assets/sound/TreeWalk.wav");
        this.load.audio("level one music", "./assets/sound/BackgroundMusic.wav");
        this.load.audio("speaking", "./assets/sound/CharacterSpeak.wav");
        this.load.audio("plant flower audio", "./assets/sound/PlantFlower.wav");
        this.load.audio("plant flower reverse audio", "./assets/sound/PlantFlowerReverse.wav");
        this.load.spritesheet("oneSheet", "./assets/gamepieces/playerAtlas.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 15});
        this.load.spritesheet("otherSheet", "./assets/gamepieces/dopplAtlas.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 15});

        this.load.image("menu box", "./assets/ui/menu_box.png");
        this.load.image("menu select", "./assets/ui/menu_select.png");
        this.load.image("volume box", "./assets/ui/volume_box.png");
        this.load.image("volume select", "./assets/ui/volume_select.png");
        this.load.image("choice box", "./assets/ui/choice_box.png");
        this.load.image("choice select", "./assets/ui/choice_select.png");
        this.load.spritesheet("alert", "./assets/ui/alert.png",
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.image("up arrow", "./assets/ui/up_arrow.png");

        this.load.image("textbox0", "./assets/ui/textboxes/textbox0.png");
        this.load.image("textbox1", "./assets/ui/textboxes/textbox1.png");
        this.load.image("textbox2", "./assets/ui/textboxes/textbox2.png");
        this.load.image("textbox3", "./assets/ui/textboxes/textbox3.png");
        this.load.image("textbox4", "./assets/ui/textboxes/textbox4.png");
        this.load.image("textbox5", "./assets/ui/textboxes/textbox5.png");
        this.load.image("textbox6", "./assets/ui/textboxes/textbox6.png");
        this.load.image("textbox7", "./assets/ui/textboxes/textbox7.png");
        this.load.image("textbox tail0", "./assets/ui/textboxes/textbox_tail0.png");
        this.load.image("textbox tail1", "./assets/ui/textboxes/textbox_tail1.png");
        this.load.image("textbox tail2", "./assets/ui/textboxes/textbox_tail2.png");
        this.load.image("textbox tail3", "./assets/ui/textboxes/textbox_tail3.png");
        this.load.image("textbox tail4", "./assets/ui/textboxes/textbox_tail4.png");
        this.load.image("textbox tail5", "./assets/ui/textboxes/textbox_tail5.png");
        this.load.image("textbox tail6", "./assets/ui/textboxes/textbox_tail6.png");
        this.load.image("textbox tail7", "./assets/ui/textboxes/textbox_tail7.png");

        this.load.audio("talking puck", "./assets/sound/CharacterSpeak.wav");
        this.load.audio("talking titania", "./assets/sound/TalkingTitania.wav");
        this.load.audio("talking flowerfae", "./assets/sound/TalkingFlower.wav");

        this.load.image("inventory box", "./assets/ui/inventory_box.png");

        this.load.image("altar", "./assets/gamepieces/altar.png");
        this.load.spritesheet("pond", "./assets/gamepieces/altarPond.png",
            {frameWidth: 64, frameHeight:64, startFrame:0, endFrame: 1});
    }
    create() {

        //fade out from the loading screen
        this.cameras.main.fadeOut(250).on("camerafadeoutcomplete", () => {

            // when it's done fading in, it deletes all the objects that made up the loading screen
            for (let i = 0; i < this.loadingScreenObjects.length; i++) {
                this.loadingScreenObjects[i].destroy();
            }

            // it starts at zoom 8, really close up. i tween it to zoom 1 after a short delay
            if(currentLevel == 1) {
                this.camera.zoom = 8;
            }
            this.zoomedOut = false;
            
            // fade in from black from the Menu scene
            this.camera.fadeIn(500).on("camerafadeincomplete", () => {
                //zooms out the camera so it looks normal lol
                this.cameraZoomOut = this.tweens.add({
                    targets: [this.camera],
                    zoom: 1,
                    duration: 2500,
                    delay: 2000,
                    ease: "Quad.easeInOut"
                }).on("complete", () => {
                    // when the camera is finished zooming out, tween the tutorial keys on screen. that way u can actually see them tween
                    this.tutorialKeysTweens();  
                });
            })
            
        });


        this.currentDialogueBox = undefined;

        this.input.keyboard.on("keydown-R", () => {
            this.scene.start("creditsScene");
        });

        // the camera variable that we use in the rest of it
        this.camera = this.cameras.main;    

        this.level1Map = this.make.tilemap({key: "level1"});
        this.tileSet = this.level1Map.addTilesetImage("tilesheet", "tileSheet");
        this.riverTiles = this.level1Map.addTilesetImage("river", "riverTiles");
        this.moatTiles = this.level1Map.addTilesetImage("moat", "moatTiles");
        this.towerTiles = this.level1Map.addTilesetImage("tower5", "towerTiles");
        levelWidth = 10;
        levelHeight = 10;
        this.camera.setBounds(0, 0, this.level1Map.displayWidth, this.level1Map.displayHeight);

        this.groundLayer = this.level1Map.createLayer("floor", this.tileSet, 0, 0);
        this.wallLayer = this.level1Map.createLayer("terrain", this.tileSet, 0, 0);
        this.wallLayer.setCollisionByProperty({wall: true});
        this.riverLayer1 = this.level1Map.createLayer("riverVisuals1", this.riverTiles, 0, 0);
        this.riverLayer2 = this.level1Map.createLayer("riverVisuals2", this.riverTiles, 0, 0).setAlpha(0);
        this.moatLayer1 = this.level1Map.createLayer("moatVisuals1", this.moatTiles, 0, 0);
        this.moatLayer2 = this.level1Map.createLayer("moatVisuals2", this.moatTiles, 0, 0).setAlpha(0);
        this.towerLayer = this.level1Map.createLayer("towerVisuals", this.towerTiles, 0, 0);
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
            align: "left",
            lineHeight: "normal"
        };

        //create anomaly doors
        this.warp1 = this.level1Map.findObject("triggers", obj => obj.name ==="warp1");
        this.warp2down = this.level1Map.findObject("triggers", obj => obj.name ==="warp2down");
        this.warp2up = this.level1Map.findObject("triggers", obj => obj.name ==="warp2up");
        this.dopplSend = this.level1Map.findObject("triggers", obj => obj.name ==="dopplWarpSend");
        this.dopplRecieve = this.level1Map.findObject("triggers", obj => obj.name ==="dopplWarpRecieve");
        this.warpLvl2_1 = new WarpDoor(this,
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send1-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get1-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam1-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send1-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get1-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam1-2")
        );
        this.warpLvl2_2 = new WarpDoor(this,
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send2-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get2-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam2-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send2-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get2-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam2-2")
        );
        this.warpLvl2_3 = new WarpDoor(this,
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send3-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get3-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam3-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send3-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get3-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam3-2")
        );
        this.warpLvl2_4 = new WarpDoor(this,
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send4-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get4-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam4-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send4-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get4-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam4-2")
        );
        this.warpLvl2_5 = new WarpDoor(this,
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send5-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get5-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam5-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send5-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get5-2"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam5-2")
        );
        this.warpLvl2_6 = new WarpDoor(this,
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Send6-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Get6-1"),
            this.level1Map.findObject("triggers", obj => obj.name ==="warpLvl2Cam4-1")
        );

        //create end of level triggers
        this.endLevel1 = this.level1Map.findObject("triggers", obj => obj.name ==="levelEnd");
        this.endLevel2 = this.level1Map.findObject("triggers", obj => obj.name ==="Level2End");

        //create simple rituals
        this.simpleRitual1 = new Ritual(this, 
            this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual1Door"), "ritualTree", "up", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual1"), "ritualCircleBasic"]]);
        this.simpleRitual2 = new Ritual(this, 
            this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual2Door"), "ritualTree", "down", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual2"), "ritualCircleBasic"]]);
        this.simpleRitual3 = new Ritual(this, 
            this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual3Door"), "ritualTree", "right", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual3"), "ritualCircleBasic"]]);
        this.simpleRitual4 = new Ritual(this, 
            this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual4Door"), "ritualTree", "left", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual4"), "ritualCircleBasic"]]);
        this.simpleRitual5 = new Ritual(this, 
            this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual5Door"), "ritualTree", "down", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="SimpleRitual5"), "ritualCircleBasic"]]);
        
        //level 1 rituals
        //create halfNote ritual
        this.halfNoteRitual = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="halfdoor"), "ritualDoor", "up", [
            [this.level1Map.findObject("rituals", obj => obj.name ==="half7"), "ritualHalfBotLeft"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="half3"), "ritualHalfTopRight"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="half9"), "ritualHalfBotRight"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="half5"), "ritualHalfMidMid"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="half1"), "ritualHalfTopLeft"]], [
                [this.level1Map.findObject("rituals", obj => obj.name ==="half2"), "ritualHalfTopMid"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="half4"), "ritualHalfMidLeft"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="half6"), "ritualHalfMidRight"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="half8"), "ritualHalfBotMid"]
            ]);
        
        //create little2Big ritual
        this.littleBigRitual = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="little2bigdoor"), "ritualTree", "right", [
            [this.level1Map.findObject("rituals", obj => obj.name ==="little2big1"), "ritualLittleBig1"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="little2big3"), "ritualLittleBig3"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="little2big2"), "ritualLittleBig2"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="little2big4"), "ritualLittleBig4"]]);
        
        //create sliced ritual
        this.slicedRitual = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="sliceddoor"), "ritualTree", "up", [
            [this.level1Map.findObject("rituals", obj => obj.name ==="sliced2"), "ritualSliced2"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="sliced3"), "ritualSliced3"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="sliced4"), "ritualSliced4"],
            [this.level1Map.findObject("rituals", obj => obj.name ==="sliced1"), "ritualSliced1"]]);


        //level 2 rituals
        //


        //level 3 rituals
        //ritual 1
        this.lvl3Ritual1_1 = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual1door2"), "ritualDoor", "up", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual1circle1-3"), "level3ritual1_1-3"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual1circle1-1"), "level3ritual1_1-1"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual1circle1-2"), "level3ritual1_1-2"]]);
        this.lvl3Ritual1_2 = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual1door1"), "ritualDoor", "up", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual1circle2-3"), "level3ritual1_2-3"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual1circle2-1"), "level3ritual1_2-1"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual1circle2-2"), "level3ritual1_2-2"]]);

        //ritual 2
        this.lvl3Ritual2 = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual2door"), "ritualDoor", "right", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual2circle3"), "level3ritual2_2"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual2circle2"), "level3ritual2_3"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual2circle1"), "level3ritual2_1"]]);
        
        //ritual 3
        this.lvl3Ritual3 = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual3door"), "ritualDoor", "up", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual3circle1"), "level3ritual3_2"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual3circle2"), "level3ritual3_1"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual3circle3"), "level3ritual3_3"]]);

        //ritual 4
        this.lvl3Ritual4_1 = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4door2"), "ritualDoor", "up", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4circle1-4"), "level3ritual4_1-4"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4circle1-1"), "level3ritual4_1-1"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4circle1-3"), "level3ritual4_1-3"]], [
                    [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4circle1-2"), "level3ritual4_1-2"]
                ]);
        this.lvl3Ritual4_2 = new Ritual(this,
            this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4door1"), "ritualDoor", "up", [
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4circle2-4"), "level3ritual4_2-4"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4circle2-1"), "level3ritual4_2-1"],
                [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4circle2-3"), "level3ritual4_2-3"]], [
                    [this.level1Map.findObject("rituals", obj => obj.name ==="lvl3ritual4circle2-2"), "level3ritual4_2-2"]
                ]);
        
        //create flower group
        this.flowerTrail = this.add.group({
            runChildUpdate: true
        });

        this.initializeAnimations();    // create all the animations

        this.spawnPoint = this.level1Map.findObject("triggers", obj => obj.name === "Spawnpoint");
        this.camCenterX = this.spawnPoint.x;
        this.camCenterY = this.spawnPoint.y;
        this.camera.centerOn(this.camCenterX, this.camCenterY);

        // move the loading screen stuff to the new camera center 
        this.loadingScreenRect.x = this.camCenterX - config.width/2;
        this.loadingScreenRect.y = this.camCenterY - config.height/2;

        this.loadingScreenFlower1.x = this.camCenterX - uiUnit*6;
        this.loadingScreenFlower1.y = this.camCenterY;

        this.loadingScreenFlower2.x = this.camCenterX;
        this.loadingScreenFlower2.y = this.camCenterY;

        this.loadingScreenFlower3.x = this.camCenterX + uiUnit*6;
        this.loadingScreenFlower3.y = this.camCenterY;

        //create player
        this.player = new One(
            this, 
            this.spawnPoint.x, 
            this.spawnPoint.y, 
            "oneSheet",
            0).setDepth(105);

        //create doppelganger
        this.dopple1Obj = this.level1Map.findObject("triggers", obj => obj.name === "dopplTest");
        this.doppelganger = new Other(
            this, 
            this.dopple1Obj.x, 
            this.dopple1Obj.y, 
            "otherSheet",
            0).setDepth(105);
        // this.time.delayedCall(5000, () => {
        //     this.doppelganger.startScript(["right", "down", "right", "down", "right", "up", "left", "up", "plant", "up", "stop", "right"]);
        // });

        //set up doppelganger scares
        this.scare1Done = false;
        this.scare1Going = false;
        this.scare2Done = false;
        this.scare2Going = false;
        this.scareBehindDoorDone = false;
        this.scareBehindDoorGoing = false;

        // this.input.keyboard.on("keydown-M", () => {
        //     this.doppelganger.mirrorMode = !this.doppelganger.mirrorMode;
        // });

        //this.openDialogue(uiUnit, 64, textJSON.puck1, textConfig);

        this.initializeNPCs();   // create all the NPC objects. there are a lot of them!
        
        // i create the color overlay rectangle. currentColor is set in main.js
        this.coloredRectangle = this.add.rectangle(
            0,
            0,
            this.level1Map.width*64,
            this.level1Map.height*64,
            currentColor,
            overlayAlpha
        ).setOrigin(0, 0).setDepth(100);

        //secret cheat code :-). press c quickly to engage rave mode 
        this.input.keyboard.on("keydown-C", () => {
            this.changeColor();
        });

        this.createTutorialKeys();  // adds all the keys that appear on screen to let the player know what buttons u can press

        this.initializeAudio();     // all the making of the audio variables go in here

        this.noteManager = new NoteManager(this);

        this.input.keyboard.on("keydown-ESC", () => {
            this.scene.pause();
            this.scene.launch("pauseScene");
        });

        this.input.keyboard.on("keydown-L", () => {
            this.nextColor();
        });

        // the "inventory" is just four sprites that have the note sprites on top of them
        // the main function of the inventory is to visually show players how many notes they have collected
        // it also tells the players exactly what the tutorial keys for the note manager do
        this.initializeInventory();

        //this.camera.fadeIn(500);

        this.changeLevel(currentLevel);
        this.events.on("shutdown", () => {
            if (music.isPlaying) {
                music.stop();
            }
        });
        
    }

    update() {

        this.updateDialogueBox();   // updates the dialogue box if there is one

        this.updateSFXVolume();     // changes the SFX volume to the global variable masterSFXVolume

        this.updateFootsteps();     // manages the footstep sounds

        this.updateObjects();       // updates a bunch of objects

        this.updateRituals(); // updates all rituals

        this.updateWarpDoors(); // updates all warp door objects

        this.physics.world.collide(this.player, this.wallLayer);
        this.physics.world.collide(this.player, this.ritual1Door);
        this.physics.world.collide(this.doppelganger, this.wallLayer);
        this.physics.world.collide(this.doppelganger, this.player, (other, one) => {
            if(other.violent) {
                //reset player if the doppelganger is in kill mode
                console.log("kill!");
            }
        });

        this.checkScares();

        
        //keep the doppelganger and player synchronized through level 3
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.dopplSend.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.dopplSend.y) {
            this.doppelganger.x = this.dopplRecieve.x;
            this.doppelganger.y = this.dopplRecieve.y;
            console.log("doppl sent");
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="syncCheck1").x 
            && this.player.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="syncCheck1").y) {
            this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="syncPlace1").x;
            this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="syncPlace1").y;
            console.log("doppl sent");
        }
        if(this.doppelganger.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="syncCheck2").x 
            && this.doppelganger.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="syncCheck2").y) {
            this.player.x = this.level1Map.findObject("triggers", obj => obj.name ==="syncPlace2").x;
            this.player.y = this.level1Map.findObject("triggers", obj => obj.name ==="syncPlace2").y;
            this.camCenterY -= (gridSize * gridUnit);
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            this.changeColor();
        }
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="syncCheck3").x 
            && this.player.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="syncCheck3").y) {
            this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="syncPlace3").x;
            this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="syncPlace3").y;
            console.log("doppl sent");
        }
        if(this.doppelganger.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="syncPlace3").x 
            && this.doppelganger.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="syncPlace3").y
            && !this.zoomedOut) {
            //zoom out camera to catch tower
            this.zoomedOut = true;
            this.cameraZoomOut2 = this.tweens.add({
                targets: [this.camera],
                zoom: 0.85,
                scrollY: this.camera.worldView.y - (gridUnit / 2),
                duration: 2500,
                delay: 1000,
                ease: "Quad.easeOut"
            }).on("complete", () => {
                this.cameraZoomIn = this.tweens.add({
                    targets: [this.camera],
                    zoom: 1,
                    scrollY: this.camera.worldView.y + (gridUnit / 2),
                    duration: 2500,
                    delay: 4000,
                    ease: "Quad.easeInOut"
                });
            });
        }

        //check to see if player is going through a door
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

        //go to level 1 when cheat is called
        if(keyEIGHT.isDown) {
            this.changeLevel(1);
        }
        // go to level 2 at end of level 1 OR when cheat is called
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.endLevel1.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.endLevel1.y || 
            keyNINE.isDown) {
            this.changeLevel(2);
        }
        //go to level 3 at end of level 2 OR when cheat is called
        if(this.player.gridX * gridUnit - (gridUnit / 2) == this.endLevel2.x && this.player.gridY * gridUnit - (gridUnit / 2) == this.endLevel2.y || 
        keyZERO.isDown) {
            this.changeLevel(3);
        }


        //check to see if doppl is going through a door
        this.doorCheck2 = this.level1Map.getTileAtWorldXY(this.doppelganger.x, this.doppelganger.y, false, this.camera, "doors");
        if(this.doorCheck2 != null) {
            if(this.doorCheck2.properties.direction == "up") {
                this.doppelganger.y -= 3 * gridUnit;
                console.log("door up");
            }
            else if(this.doorCheck2.properties.direction == "down") {
                this.doppelganger.y += 3 * gridUnit;
                console.log("door down");
            }
            else if(this.doorCheck2.properties.direction == "left") {
                this.doppelganger.x -= 3 * gridUnit;
                console.log("door left");
            }
            else if(this.doorCheck2.properties.direction == "right") {
                this.doppelganger.x += 3 * gridUnit;
                console.log("door right");
            }
        }

        //animate animated tiles
        if(this.tileAnimTicker >= 30) {
            this.tileAnimToggle = !this.tileAnimToggle;
            this.tileAnimTicker = 0;
        }
        if(this.tileAnimToggle) {
            this.riverLayer2.setAlpha(1);
            this.moatLayer2.setAlpha(1);
        } else {
            this.riverLayer2.setAlpha(0);
            this.moatLayer2.setAlpha(0);
        }
        this.tileAnimTicker++;

        // moves the inventory every frame relative to the center of the camera so that it is in the same place
        this.updateInventoryLocation();
    }

    changeLevel(target) {
        //move to the specified level

        if(target == 1) {
            currentLevel = 1;
            this.camCenterX = this.spawnPoint.x;
            this.camCenterY = this.spawnPoint.y;
            this.player.x = this.spawnPoint.x;
            this.player.y = this.spawnPoint.y;
            this.player.calculateGridCoords();
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            this.changeColor();
        }
        else if(target == 2) {
            currentLevel = 2;
            this.camCenterX = this.level1Map.findObject("triggers", obj => obj.name ==="SpawnpointLvl2").x;
            this.camCenterY = this.level1Map.findObject("triggers", obj => obj.name ==="SpawnpointLvl2").y;
            this.player.x = this.level1Map.findObject("triggers", obj => obj.name ==="SpawnpointLvl2").x;
            this.player.y = this.level1Map.findObject("triggers", obj => obj.name ==="SpawnpointLvl2").y;
            this.player.calculateGridCoords();
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            this.changeColor();
        }
        else if(target == 3) {
            currentLevel = 3;
            this.camCenterX = this.level1Map.findObject("triggers", obj => obj.name ==="cameraLvl3Start").x;
            this.camCenterY = this.level1Map.findObject("triggers", obj => obj.name ==="cameraLvl3Start").y;
            this.player.x = this.level1Map.findObject("triggers", obj => obj.name ==="playerLvl3Start").x;
            this.player.y = this.level1Map.findObject("triggers", obj => obj.name ==="playerLvl3Start").y;
            this.player.calculateGridCoords();
            this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="doplLvl3Start").x;
            this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="doplLvl3Start").y;
            this.doppelganger.mirrorMode = true;
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            this.changeColor();
        }
    }

    updateDialogueBox() {
        if (this.currentDialogueBox != undefined) {
            this.currentDialogueBox.nextLetter();
            if (this.currentDialogueBox.allTextRead && this.currentDialogueBox != undefined) {
                delete this.currentDialogueBox;
                this.currentDialogueBox = undefined;
            }
        }
    }

    updateRituals() {
        this.simpleRitual1.update();
        this.simpleRitual2.update();
        this.simpleRitual3.update();
        this.simpleRitual4.update();
        this.simpleRitual5.update();
        this.halfNoteRitual.update();
        this.littleBigRitual.update();
        this.slicedRitual.update();
        this.lvl3Ritual1_1.update();
        this.lvl3Ritual1_2.update();
        this.lvl3Ritual2.update();
        this.lvl3Ritual3.update();
        this.lvl3Ritual4_1.update();
        this.lvl3Ritual4_2.update();
    }

    updateWarpDoors() {
        this.warpLvl2_1.update();
        this.warpLvl2_2.update();
        this.warpLvl2_3.update();
        this.warpLvl2_4.update();
        this.warpLvl2_5.update();
        this.warpLvl2_6.update();
    }

    checkScares() {
        if(!this.scare1Done) { //Scare 1
            if(this.player.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scare1TriggerLeft").x &&
                this.player.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scare1TriggerLeft").y) { //left trigger
                    this.scare1Done = true;
                    this.scare1Going = true;
                    this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="scare1Left").x;
                    this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="scare1Left").y;
                    this.doppelganger.startScript(["right", "right", "right", "right"]);
            } 
            else if(this.player.gridX * gridUnit - (gridUnit / 2) == this.warp2down.x &&
            this.player.gridY * gridUnit - (gridUnit / 2) == this.warp2down.y) { //warp trigger
                this.scare1Done = true;
                this.scare1Going = true;
                this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="scare1Left").x;
                this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="scare1Left").y;
                this.doppelganger.startScript(["right", "right", "right", "right"]);
            }
            else if(this.player.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scare1TriggerRight").x &&
                this.player.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scare1TriggerRight").y) { //right trigger
                    this.scare1Done = true;
                    this.scare1Going = true;
                    this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="scare1Right").x;
                    this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="scare1Right").y;
                    this.doppelganger.startScript(["left", "left", "left", "left"]);
            }
        }
        if(this.scare1Going && !this.doppelganger.scriptedMode) { //hide doppelganger once scare 1 is over
            this.scare1Going = false;
            this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="dopplTest").x;
            this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="dopplTest").y;
        }

        if(!this.scare2Done) { //Scare 2
            if(this.player.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scare2TriggerLeft").x &&
                this.player.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scare2TriggerLeft").y) { //left trigger
                    this.scare2Done = true;
                    this.scare2Going = true;
                    this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="scare2").x;
                    this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="scare2").y;
                    this.doppelganger.startScript(["up", "up", "up", "up"]);
            }
            else if(this.player.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scare2TriggerRight").x &&
                this.player.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scare2TriggerRight").y) { //right trigger
                    this.scare2Done = true;
                    this.scare2Going = true;
                    this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="scare2").x;
                    this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="scare2").y;
                    this.doppelganger.startScript(["up", "up", "up", "up"]);
            }
        }
        if(this.scare2Going && !this.doppelganger.scriptedMode) { //hide doppelganger once scare 2 is over
            this.scare2Going = false;
            this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="dopplTest").x;
            this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="dopplTest").y;
        }

        if(!this.scareBehindDoorDone) { //Scare behind door
            if(this.player.gridX * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scareBehindDoorTrigger").x &&
                this.player.gridY * gridUnit - (gridUnit / 2) == this.level1Map.findObject("triggers", obj => obj.name ==="scareBehindDoorTrigger").y) { //left trigger
                    this.scareBehindDoorDone = true;
                    this.scareBehindDoorGoing = true;
                    this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="scareBehindDoor").x;
                    this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="scareBehindDoor").y;
                    this.doppelganger.startScript(["right", "right", "right", "right", "right"]);
            }
        }
        if(this.scareBehindDoorGoing && !this.doppelganger.scriptedMode) { //hide doppelganger once scare 2 is over
            this.scareBehindDoorGoing = false;
            this.doppelganger.x = this.level1Map.findObject("triggers", obj => obj.name ==="dopplTest").x;
            this.doppelganger.y = this.level1Map.findObject("triggers", obj => obj.name ==="dopplTest").y;
        }
    }
    
    updateFootsteps() {
        // if the player is walking and the footsteps aren't playing, play them
        if (this.player.walking && this.footsteps.isPlaying == false) {
            this.footsteps.resume();
        }

        // if the player is not walking and the footsteps are playing, pause them
        if (this.player.walking == false && this.footsteps.isPlaying) {
            this.footsteps.pause();
        }
    }

    initializeAudio() {
        this.sounds = [];
        this.footsteps = this.sound.add("footsteps");
        this.talkingPuck = this.sound.add("talking puck");
        this.talkingTitania = this.sound.add("talking titania");
        this.talkingFlowerfae = this.sound.add("talking flowerfae");
        this.select = this.sound.add("select");

        this.sounds.push(this.footsteps);
        this.sounds.push(this.player.plantFlowerAudio);
        this.sounds.push(this.player.plantFlowerReverseAudio);
        this.sounds.push(this.select);
        this.sounds.push(this.talkingPuck);
        this.sounds.push(this.talkingTitania);
        this.sounds.push(this.talkingFlowerfae);

        music = this.sound.add("level one music");

        music.setLoop(true);
        
        music.volume = 0;

        this.tweens.add({
            targets: [music],
            volume: masterMusicVolume,
            duration: 2500,
            ease: "Quad.easeInOut",
            delay: 2000
        }).on("start", () => {
            music.play();
        });

        // i play the footsteps and then pause them immediately so i can play them later lol
        this.footsteps.setLoop(true);
        this.footsteps.play();
        this.footsteps.pause();
        this.footsteps.setRate(1.5);
    }

    updateSFXVolume() {
        for (let i = 0; i < this.sounds.length; i++) {
            this.sounds[i].volume = masterSFXVolume;
        }
    }

    initializeAnimations() {
        //configure player animations
        this.anims.create({
            key: "one_reset",
            frames: this.anims.generateFrameNumbers("oneSheet", 
            {start: 0, end: 0, first: 0}),
            frameRate: 1000
        });
        this.anims.create({
            key: "oneWalk_Down",
            frames: this.anims.generateFrameNumbers("oneSheet", 
            {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "oneWalk_Left",
            frames: this.anims.generateFrameNumbers("oneSheet", 
            {start: 4, end: 7, first: 4}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "oneWalk_Right",
            frames: this.anims.generateFrameNumbers("oneSheet", 
            {start: 8, end: 11, first: 8}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "oneWalk_Up",
            frames: this.anims.generateFrameNumbers("oneSheet", 
            {start: 12, end: 15, first: 12}),
            frameRate: 6,
            repeat: -1
        });

        //configure doppelganger animations
        this.anims.create({
            key: "other_reset",
            frames: this.anims.generateFrameNumbers("otherSheet", 
            {start: 0, end: 0, first: 0}),
            frameRate: 1000
        });
        this.anims.create({
            key: "otherWalk_Down",
            frames: this.anims.generateFrameNumbers("otherSheet", 
            {start: 0, end: 3, first: 0}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "otherWalk_Right",
            frames: this.anims.generateFrameNumbers("otherSheet", 
            {start: 4, end: 7, first: 4}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "otherWalk_Left",
            frames: this.anims.generateFrameNumbers("otherSheet", 
            {start: 8, end: 11, first: 8}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "otherWalk_Up",
            frames: this.anims.generateFrameNumbers("otherSheet", 
            {start: 12, end: 15, first: 12}),
            frameRate: 6,
            repeat: -1
        });

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
            frameRate: 4
        });
        this.anims.create({
            key: 'killCrumb3',
            frames: this.anims.generateFrameNumbers("flowerCrumb3", 
                {start: 4, end: 0, first: 4}),
            frameRate: 4
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
            key: 'treeSit',
            frames: this.anims.generateFrameNumbers("ritualTree",
                {start: 2, end: 0, first: 2}),
            frameRate: 6
        });
        this.anims.create({
            key: 'treeWalk',
            frames: this.anims.generateFrameNumbers("ritualTree",
                {start: 3, end: 4, first: 3}),
            frameRate: 6,
            repeat: -1
        });

        //create ritual door anim
        this.anims.create({
            key: 'doorStand',
            frames: this.anims.generateFrameNumbers("ritualDoor",
                {start: 0, end: 2, first: 0}),
            frameRate: 6
        });
        this.anims.create({
            key: 'doorSit',
            frames: this.anims.generateFrameNumbers("ritualDoor",
                {start: 2, end: 0, first: 2}),
            frameRate: 6
        });
        this.anims.create({
            key: 'doorWalk',
            frames: this.anims.generateFrameNumbers("ritualDoor",
                {start: 3, end: 4, first: 3}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: "alert",
            frames: this.anims.generateFrameNumbers("alert",
                {start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: "pond",
            frames: this.anims.generateFrameNumbers("pond",
                {start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });
    }

    changeColor() {

        // changes the color to another random color
        // the while loop makes sure that you don't get the same color twice
        while (prevColor == currentColor) {
            colorIndex = Phaser.Math.RND.integerInRange(0, 7);
            currentColor = colors[colorIndex];
        }

        // prevColor is to keep track of the last color so we don't get it twice
        prevColor = currentColor;

        // actually changes the color of the rectangle 
        this.coloredRectangle.fillColor = currentColor;
    }

    nextColor() {
        colorIndex++;
        if (colorIndex == 8) colorIndex = 0;
        currentColor = colors[colorIndex];
        console.log(colorIndex);
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
        // i put them in specific places so that when the tweens go off it looks good and everything
        this.tutorialKeyUp = new TutorialKey(
            this,                                                   // scene
            this.camCenterX,                                        // x
            this.camCenterY + config.height/2 - uiUnit*5 + 400,     // y
            "arrow key up",                                         // texture
            0,                                                      // frame
            "up",                                                   // angle
            "up"                                                    // key
            ).setDepth(106);                                        // depth to 106 so it's above the player
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

        // i make it blink a little to draw the player's attention >:-)
        this.add.tween({
            targets: [
                this.tutorialKeyUp, 
                this.tutorialKeyDown, 
                this.tutorialKeyLeft, 
                this.tutorialKeyRight, 
                this.tutorialKeySpace],
            alpha: {from: 1, to: .5},
            duration: 250,
            repeat: 4,
            yoyo: true,
            delay: 750
            });

        // i tween the keys so they go into place correctly
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

    initializeNPCs() {
        // creates all the NPCs and adds them to an array so i can update them all easily
        // the x and y values i took from the tiled file. i round them automatically in the NPC create function so i don't have to
        // do it myself
        this.NPCArray = [];

        this.testNote = new NPC(
            this,                   // scene
            this.player,            // player
            3868,                   // x
            2406,                   // y
            ["little big note"],    // content (image or array of strings)
            0,                      // frame
            "little big UI",        // texture
            "note"                  // kind of NPC ("NPC" or "note")
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
            482 - 64,
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

        this.puckNPC2 = new NPC(
            this,
            this.player,
            224,
            1060,
            ["puck", "puckTalking"],
            0,
            textJSON.puck2,
            "NPC"
        );

        this.NPCArray.push(this.puckNPC2);

        this.altar = new NPC(
            this,
            this.player,
            2462,
            4636,
            ["altar"],
            0,
            textJSON.altar,
            "choice"
        ).setDepth(5);

        this.NPCArray.push(this.altar);

        this.pond = this.add.sprite(
            this.altar.x,
            this.altar.y,
            "pond"
        ).setOrigin(0, 0).play("pond");
    }

    initializeInventory() {

        // an array of sprites that are below the sprites for the notes
        this.inventoryBoxArray = [];

        // an array of sprites that is the notes, above the box array
        this.inventoryNoteArray = [];

        // adds four identical sprites to the top left of the screen
        for (let i = 0; i < 4; i++) {
            this.inventoryBoxArray.push(this.add.sprite(
                this.camCenterX - config.width/2 + i*64,    // starting from the left side of the screen
                this.camCenterY - config.height/2,          // the top of the screen
                "inventory box"
            ).setOrigin(0, 0).setDepth(150).setAlpha(.5));
        }
    }

    updateInventoryLocation() {
        for (let i = 0; i < this.inventoryBoxArray.length; i++) {
            this.inventoryBoxArray[i].x = this.camCenterX - config.width/2 + i*64;
            this.inventoryBoxArray[i].y = this.camCenterY - config.height/2;
        }
        for (let i = 0; i < this.inventoryNoteArray.length; i++) {
            this.inventoryNoteArray[i].x = this.camCenterX - config.width/2 + i*64;
            this.inventoryNoteArray[i].y = this.camCenterY - config.height/2;
        }
    }
}