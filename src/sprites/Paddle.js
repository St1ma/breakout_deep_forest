import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset }) {
        super(game, x, y, 'paddle');

        this.game = game;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        this.scale.setTo(0.2, 0.2);
    }

    update () {
    }

}
