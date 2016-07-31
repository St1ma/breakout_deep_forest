import Phaser from 'phaser'

export default class extends Phaser.TileSprite {

    constructor ({ game, x, y, width, height, tileIndex, angle }) {
        super(game, x || 0, y || 0, width || game.world.width, height || game.world.height, 'background', tileIndex);

        this.game = game;

        this.game.physics.enable(this, Phaser.Physics.ARCADE);

        if (angle) this.angle = angle;
    }
}
