var gyro = require('../../lib/gyro.min.js')


var Fallingman = function Fallingman(game, posx, posy, maxVelY) {
    this.game = game;
    this.sprite = null;
    this.posx = posx;
    this.posy = posy;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.rotation = null;
    this.falling = true;
    this.bouncing = false;
    this.maxVelY = maxVelY;
    this.dragged = false;
    this.playing = false;
}

Fallingman.prototype.create= function() {
    this.sprite = this.game.add.sprite(this.posx, this.posy, 'stickman');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.allowGravity = true;
    this.sprite.smoothed = false;
    this.sprite.scale.set(3,3);
    this.sprite.anchor.setTo(0.5, 1);
    
    this.sprite.animations.add('falling');
    this.sprite.animations.play('falling', 15, true);

    gyro.startTracking(function(o) {
        this.rotation = o.gamma;
    }.bind(this));
}

Fallingman.prototype.update = function() {
    
    var incr = 50;
    var maxVelX = 500;
    if (!this.bouncing) {
        if (this.falling && !this.dragged) {
            if (this.rotation != null ) 
                this.sprite.body.velocity.x = this.rotation*10;
            else if(this.cursors.left.isDown) {
                this.maybeAudio();
                this.sprite.body.velocity.x -= incr;
            } else if(this.cursors.right.isDown) {
                this.maybeAudio();
                this.sprite.body.velocity.x += incr;
            } else 
                    this.sprite.body.velocity.x *= 0.95;

            if (this.sprite.body.velocity.x < -maxVelX)
                this.sprite.body.velocity.x  = -maxVelX;

            if (this.sprite.body.velocity.x > maxVelX)
                this.sprite.body.velocity.x = maxVelX;
        } else {
            this.sprite.body.velocity.x = 0;
        }
    }

    if (this.sprite.body.velocity.y > this.maxVelY && !this.dragged) {
        this.sprite.body.velocity.y = this.maxVelY;
    }
    
    this.sprite.angle = this.sprite.body.velocity.x/6;
    
    if (this.dragged)
        this.sprite.animations.stop();
}

Fallingman.prototype.maybeAudio = function() {
    if (this.playing) {return;}
    var game = this.game;
    this.playing = true;
    var swosh = 'swosh' + game.rnd.integer() % 8;
    var audio = game.add.audio(swosh);
    audio.onDecoded.add(function() {audio.play()});
    audio.onStop.add((function() {this.playing = false;}).bind(this));
};

module.exports = Fallingman;