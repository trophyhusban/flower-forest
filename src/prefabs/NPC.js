class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y, texture, frame, content, kind) {
        super(scene, x, y, texture[0], frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.body.setImmovable();
        this.content = content;
        if (this.kind == "note") {
            this.content = content[0];
        }
        this.player = player;
        this.talking = false;
        this.setOrigin(0, 0);
        this.x -= this.x%gridUnit;
        this.y -= this.y%gridUnit;
        this.gridX = this.x/gridUnit + 1;
        this.gridY = this.y/gridUnit + 1;
        if (kind == "NPC") {
            this.static = texture[0];
            this.talkingAnimation = texture[1];
        }
        this.kind = kind;
        this.align = "up";

        this.justPressedKey = false;
    }

    update() {

        if (this.checkNextToPlayer()) {
            this.player.nextToNPC = true;
        }
        
        this.scene.physics.world.collide(this, this.player);

        this.justPressedKey = false;
        if (keySPACE.isDown && this.justPressedKey == false) {
            this.justPressedkey = true;


             if (this.checkNextToPlayer()) {

                if (this.kind == "NPC"){
                    
                    if (this.player.y > this.y) {
                        this.align = "up";
                    } else {
                        this.align = "down";
                    }

                    this.openDialogue(
                        this.x + this.width/2,
                        this.content,
                        this.config,
                        this.align
                    ); 
                } else if (this.kind == "note") {
                    this.openNote();
                }
             }
        }
    }

    openDialogue(tailX, text, config, align) {
        textBox.tailX = tailX - this.scene.camCenterX + game.config.width/2;
        textBox.text = text;
        textBox.config = config;
        textBox.align = align;
        this.scene.scene.pause();
        this.scene.scene.launch("dialogueScene");
    }

    openNote() {
        noteGlobal = this.content;
        this.scene.scene.pause();
        this.scene.scene.launch("noteScene");
    }

    checkNextToPlayer() {
        if (this.gridY == this.player.gridY) { // if y is the same, check x
            if (this.gridX == this.player.gridX + 1 || this.gridX == this.player.gridX - 1) {
                return true;
            }
        } else if (this.gridX == this.player.gridX) {
            if (this.gridY == this.player.gridY + 1 || this.gridY == this.player.gridY - 1) {
                return true;
            }
        }
        return false;
    }
    
}