class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y, texture, frame, text) {
        super(scene, x, y, texture[0], frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.body.setImmovable();
        this.text = text;
        this.player = player;
        this.talking = false;
        this.setOrigin(0, 0);
        this.x -= this.x%gridUnit;
        this.y -= this.y%gridUnit;
        this.gridX = this.x/gridUnit + 1;
        this.gridY = this.y/gridUnit + 1;
        this.static = texture[0];
        this.talkingAnimation = texture[1];
    }

    update() {
        this.scene.physics.world.collide(this, this.player);

        this.player.nextToNPC = false;
        if (this.gridY == this.player.gridY) { // if y is the same, check x
            if (this.gridX == this.player.gridX + 1 || this.gridX == this.player.gridX - 1) {
                this.player.nextToNPC = true;
            }
        } else if (this.gridX == this.player.gridX) {
            if (this.gridY == this.player.gridY + 1 || this.gridY == this.player.gridY - 1) {
                this.player.nextToNPC = true;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // check if the player is one gridUnit left, right, up, or down of the NPC
            if (this.gridY == this.player.gridY) { // if y is the same, check x
                if (this.gridX == this.player.gridX + 1 || this.gridX == this.player.gridX - 1) {
                    this.openDialogue(
                        this.x + this.width/2,
                        this.text,
                        textConfig,
                        "down"
                    );
                }
            } else if (this.gridX == this.player.gridX) {
                if (this.gridY == this.player.gridY + 1 || this.gridY == this.player.gridY - 1) {
                    this.openDialogue(
                        this.x + this.width/2,
                        this.text,
                        textConfig,
                        "down"
                    );
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
}