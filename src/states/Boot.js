import Phaser from 'phaser';

export default class extends Phaser.State {
    create() {
        if (!this.theme) {
            this.theme = game.add.audio('theme');
        } else {
            this.theme.restart();
        }

        this.theme.loopFull();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.world.enableBody = true;

        this.state.start('Game', true, false, { theme: this.theme });
    }
}
