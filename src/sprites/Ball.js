import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset }) {
        super(game, x, y, 'ball');

        this.game = game;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.scale.setTo(0.5, 0.5);
    }

    update() {
        //this.angle += 10;
    }
}
