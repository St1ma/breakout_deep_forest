import Phaser from 'phaser';

import Paddle    from '../sprites/Paddle.js';
import Brick     from '../sprites/Brick.js';
import GoldBlick from '../sprites/GoldBrick.js';
import Ball      from '../sprites/Ball.js';

import BgTile from '../sprites/BgTile.js';

export default class extends Phaser.State {
    init(parameters) {
        this.theme = parameters.theme;
    }

    create() {
        this.prepareBackground();

        this.setPaddle();

        this.setBricks();

        this.setBall();

        this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.countHitted = 0;

        this.hitSound = game.add.audio('hit');

        this.scoreValue = 0;
        this.score = this.game.add.bitmapText(20, 10, 'carrier_command','Score: 0', 14);
    }

    update() {
        this.movePaddle();

        this.collide();
    }

    prepareBackground() {
        this.background = new BgTile({
            game,
            tileIndex: 12
        });
        this.game.add.existing(this.background);

        this.rect = new Phaser.Rectangle(this.game.world.centerX - 300, 0, 600, this.game.world.height);
        this.rectBgLeft = new BgTile({
            game,
            x: this.rect.left,
            y: this.rect.top,
            width: 32,
            height: this.rect.height,
            tileIndex: 4
        });
        this.rectBg = new BgTile({
            game,
            x: this.rect.left + 32,
            y: this.rect.top,
            width: this.rect.width - 33,
            height: this.rect.height,
            tileIndex: 0
        });
        this.rectBgRight = new BgTile({
            game,
            x: this.rect.width + 18,
            y: this.rect.top,
            width: 32,
            height: this.rect.height,
            tileIndex: 5
        });
        this.game.add.existing(this.rectBgLeft);
        this.game.add.existing(this.rectBg);
        this.game.add.existing(this.rectBgRight);
    }

    setPaddle() {
        this.paddle = new Paddle({
            game: this.game,
            x: 300,
            y: 325
        });

        this.game.add.existing(this.paddle);

        this.paddle.body.immovable = true;
        this.paddle.inputEnabled = true;

        console.log(this.paddle.input)
        this.paddle.input.enableDrag();
        this.paddle.input.allowVerticalDrag = false;
    }

    setBricks() {
        this.bricks = this.game.add.group();

        var sumGoldBrick = 0;

        for (var i = 0; i < (this.rect.width/80 - 1); i++) {
            for (var j = 0; j < 3; j++) {

                var CurrentBrick = Brick;

                if (Math.random() > 0.87 && sumGoldBrick < 4) {
                    CurrentBrick = GoldBlick;
                    sumGoldBrick += 1;
                }

                var brick = new CurrentBrick({
                    game: this.game,
                    x: this.rect.left + 32 + i*80,
                    y: 55 + j*35
                });

                brick.body.immovable = true;

                this.bricks.add(brick);
            }
        }
    }

    setBall() {
        this.ball = new Ball({
            game: this.game,
            x: 300,
            y: 300
        });

        this.game.add.existing(this.ball);

        this.ball.body.velocity.x = 250;
        this.ball.body.velocity.y = 260;

        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;
    }

    movePaddle() {
        if (this.left.isDown) this.paddle.body.velocity.x = -350;
        else if (this.right.isDown) this.paddle.body.velocity.x = 350;
        else this.paddle.body.velocity.x = 0;

        this.paddle.body.collideWorldBounds = true;
    }

    collide() {
        game.physics.arcade.collide(this.paddle, this.ball, this.changeDirection, null, this);

        game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

        if (this.ball.y > this.paddle.y) {
            this.theme.pause();
            this.game.state.start('GameOver');
        }
    }

    hit(ball, brick) {
        brick.kill();

        this.scoreValue += brick.key === 'goldBrick' ? 20 : 10;

        this.countHitted += 1;

        this.hitSound.play();

        if (this.countHitted === this.bricks.length) {
            this.theme.pause();
            this.game.state.start('Win');
        }

        this.score.text = 'Score: ' + this.scoreValue;
    }

    changeDirection(paddle, ball) {
        if (this.left.isDown) this.ball.body.velocity.x = -200;
        else if (this.right.isDown) this.ball.body.velocity.x = 200;
    }
}
