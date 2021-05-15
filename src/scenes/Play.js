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
        this.load.spritesheet("flowerCrumb", "./assets/gamepieces/flower.png", 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 6});
        this.load.image("tileSheet", "./assets/tilesets/tilesheet.png");
        this.load.tilemapTiledJSON("level1", "./assets/tilesets/level1.json");
    }
    create() {
        this.camera = this.cameras.main;

        //this.add.rectangle(0, 0, config.width, config.height, 0xDDFFDD).setOrigin(0,0);
        this.level1Map = this.make.tilemap({key: "level1"});
        this.tileSet = this.level1Map.addTilesetImage("tilesheet", "tileSheet");

        this.groundLayer = this.level1Map.createLayer("floor", this.tileSet, -(33 * gridUnit) - (gridUnit / 2), -(22 * gridUnit) - (gridUnit / 2));
        this.wallLayer = this.level1Map.createLayer("terrain", this.tileSet, -(33 * gridUnit) - (gridUnit / 2), -(22 * gridUnit) - (gridUnit / 2));
        this.wallLayer.setCollisionByProperty({wall: true});

        //debug hitboxes for wall tiles
        this.debugGraphics = this.add.graphics().setAlpha(0.75);
        this.wallLayer.renderDebug(this.debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
          });

        textConfig = {
            fontFamily: "express",
            fontSize: "24px",
            color: "#050",
            align: "center",
            padding: 4,
            wordWrap: {width: config.width - uiUnit*2},
            align: "left"
        };

        this.dialogue = new DialogueBox(
            this,
            uiUnit,
            64,
            textJSON.example,
            textConfig
        );


        this.input.keyboard.on("keydown-SPACE", () => {
            this.dialogue.nextPage();
        });

        //create flower group
        this.flowerTrail = this.add.group({
            runChildUpdate: true
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

        //create player
        this.player = new One(
            this, 
            (Math.floor(gridSize / 2) + 1) * gridUnit, 
            Math.floor(gridSize / 2) * gridUnit, 
            "oneSprite");

        //create doppelganger
        this.doppelganger = new Other(
            this, 
            (Math.floor(gridSize / 2) - 1) * gridUnit, 
            Math.floor(gridSize / 2) * gridUnit, 
            "oneSprite");
        this.input.keyboard.on("keydown-M", () => {
            this.doppelganger.mirrorMode = !this.doppelganger.mirrorMode;
        });
        
        this.drawGrid();
    }

    update() {
        if (this.dialogue.currentText != undefined) {
            this.dialogue.nextLetter();
        }
        this.player.update();
        this.doppelganger.update();

        this.physics.world.collide(this.player, this.wallLayer);
        this.physics.world.collide(this.doppelganger, this.wallLayer);
        
        this.currentObj = this.level1Map.getTileAt(this.player.gridX * gridUnit, this.player.gridY * gridUnit, false, "triggers");
        if(this.currentObj != null) {
            if(this.currentObj.exitLeft) {
                this.camera.setPosition(this.camera.x - (12 * gridUnit), this.camera.y);
                if(this.currentObj.shunt) {this.player.x -= gridUnit;}
                this.player.x -= 2 * gridUnit;
                console.log("moving left");
            }
            else if(this.currentObj.exitRight) {
                this.camera.setPosition(this.camera.x + (12 * gridUnit), this.camera.y);
                if(this.currentObj.shunt) {this.player.x += gridUnit;}
                this.player.x += 2 * gridUnit;
                console.log("moving right");
            }
            else if(this.currentObj.exitUp) {
                this.camera.setPosition(this.camera.x, this.camera.y - (12 * gridUnit));
                if(this.currentObj.shunt) {this.player.y -= gridUnit;}
                this.player.y -= 2 * gridUnit;
                console.log("moving up");
            }
            else if(this.currentObj.exitDown) {
                this.camera.setPosition(this.camera.x, this.camera.y + (12 * gridUnit));
                if(this.currentObj.shunt) {this.player.y += gridUnit;}
                this.player.y += 2 * gridUnit;
                console.log("moving down");
            }
        }
    }

    drawGrid() {
        for(this.j = 0; this.j <= gridSize; this.j++) {
            this.add.line(
                this.j * gridUnit - (gridUnit / 2),
                (gridSize * gridUnit) / 2 - (gridUnit / 2),
                0,
                0,
                0,
                gridSize * gridUnit,
                0x000000,
                0.15);
        }
        for(this.i = 0; this.i <= gridSize; this.i++) {
            this.add.line(
                (gridSize * gridUnit) / 2 - (gridUnit / 2),
                this.i * gridUnit - (gridUnit / 2),
                0,
                0,
                gridSize * gridUnit,
                0,
                0x000000,
                0.15);
        }
    }
}