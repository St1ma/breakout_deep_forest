import Phaser from 'phaser'

export default class extends Phaser.Button {

    constructor ({ game, x, y, action, audio }) {
        super(game, x, y, 'button', action, null, 0, 2, 1);

        this.game = game;
        this.audio = audio;

        this.scale.setTo(0.5, 0.5);

        console.log(this)
    }
}
