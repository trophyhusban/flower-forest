class Note extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, player, x, y, texture, frame, note) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.body.setImmovable();
        this.player = player;
        this.setOrigin(0, 0);
        this.x -= this.x%gridUnit;
        this.y -= this.y%gridUnit;
        this.gridX = this.x/gridUnit + 1;
        this.gridY = this.y/gridUnit + 1;
        this.note = note;
        console.log(this.player);
    }

    update() {
        this.scene.physics.world.collide(this, this.player);

        this.player.nextToNPC = false;
        if (this.gridY == this.player.gridY) { // if y is the same, check x
            if (this.gridX == this.player.gridX + 1 || this.gridX == this.player.gridX - 1) {
                this.player.nextToNPC = true;
            }
        } else if (this.gridX == this.player.gridX) { // if x is the same, check y
            if (this.gridY == this.player.gridY + 1 || this.gridY == this.player.gridY - 1) {
                this.player.nextToNPC = true;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // check if the player is one gridUnit left, right, up, or down of the NPC
            if (this.gridY == this.player.gridY) { // if y is the same, check x
                if (this.gridX == this.player.gridX + 1 || this.gridX == this.player.gridX - 1) {
                    this.openNote(this.note);
                }
            } else if (this.gridX == this.player.gridX) { // if x is the same, check y
                if (this.gridY == this.player.gridY + 1 || this.gridY == this.player.gridY - 1) {
                    this.openNote(this.note);
                }
            }
        }
    }
    openDialogue(note) {
        noteGlobal = note;
        this.scene.scene.pause();
        this.scene.scene.launch("noteScene");
    }
}