var ManFloorCollision = function ManFloorCollision(man,floor) {
    this.man = man;
    this.floor = floor;
}

ManFloorCollision.prototype.checkCollision = function(game) {
    game.physics.arcade.collide(this.man.sprite,this.floor.sprite, function() { 
        if (this.man.falling) {
            this.man.sprite.loadTexture("stickman_flat");
            this.man.sprite.animations.add('hitting');
            this.man.sprite.animations.play('hitting', 40, false);
            this.man.falling = false;
            
            
            var blood = game.add.sprite(this.man.sprite.position.x+10, this.floor.sprite.position.y-this.floor.sprite.height, "blood");
            blood.smoothed = false;
            blood.scale.set(4,4);
            blood.anchor.setTo(0.5, 0);
    
            blood.animations.add('spreading');
            blood.animations.play('spreading', 10, false);

            var splat = game.add.audio('splat');
            splat.onDecoded.add(function () {
                splat.play();
            });
            
            game.physics.arcade.gravity.y = 1000000;
        }
    },null,this);
}

module.exports = ManFloorCollision;