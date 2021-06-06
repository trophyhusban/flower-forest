class WarpDoor {
    constructor(scene, startObj, endObj, cameraTarget, startObj2, endObj2, cameraTarget2) {
        this.scene = scene;
        this.startObj = startObj;
        this.endObj = endObj;
        this.cameraTarget = cameraTarget;
        if(startObj2 && endObj2 && cameraTarget2) {
            this.startObj2 = startObj2;
            this.endObj2 = endObj2;
            this.cameraTarget2 = cameraTarget2;
        }
    }

    update() {
        //warp player
        if(this.scene.player.gridX * gridUnit - (gridUnit / 2) == this.startObj.x && this.scene.player.gridY * gridUnit - (gridUnit / 2) == this.startObj.y) {
            this.scene.camCenterX = this.cameraTarget.x;
            this.scene.camCenterY = this.cameraTarget.y;
            this.scene.player.x = this.endObj.x;
            this.scene.player.y = this.endObj.y;
            this.camera.centerOn(this.camCenterX, this.camCenterY);
            console.log("warped there");
            this.changeColor();
        }
        //warp doppelganger
        if(this.scene.doppelganger.gridX * gridUnit - (gridUnit / 2) == this.startObj.x && this.scene.doppelganger.gridY * gridUnit - (gridUnit / 2) == this.startObj.y) {
            this.scene.doppelganger.x = this.endObj.x;
            this.scene.doppelganger.y = this.endObj.y;
            console.log("warped doppl there");
        }

        //if warp door is two-way, handle warping back
        if(this.startObj2 && this.endObj2 && this.cameraTarget2) {
            //warp player
            if(this.scene.player.gridX * gridUnit - (gridUnit / 2) == this.startObj2.x && this.scene.player.gridY * gridUnit - (gridUnit / 2) == this.startObj2.y) {
                this.scene.camCenterX = this.cameraTarget2.x;
                this.scene.camCenterY = this.cameraTarget2.y;
                this.scene.player.x = this.endObj2.x;
                this.scene.player.y = this.endObj2.y;
                this.camera.centerOn(this.camCenterX, this.camCenterY);
                console.log("warped back");
                this.changeColor();
            }
            //warp doppelganger
            if(this.scene.doppelganger.gridX * gridUnit - (gridUnit / 2) == this.startObj2.x && this.scene.doppelganger.gridY * gridUnit - (gridUnit / 2) == this.startObj2.y) {
                this.scene.doppelganger.x = this.endObj2.x;
                this.scene.doppelganger.y = this.endObj2.y;
                console.log("warped doppl back");
            }
        }
    }
}