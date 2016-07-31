import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset }) {
        super(game, x, y, 'goldBrick');

        this.game = game;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
    }
}
