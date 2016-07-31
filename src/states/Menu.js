import Phaser from 'phaser';

import Button from '../menuItems/Button.js';
import BgTile from '../sprites/BgTile.js';

export default class extends Phaser.State {
    create() {
        this.background = new BgTile({
            game,
            tileIndex: 15
        });

        this.game.add.existing(this.background);

        if (!this.menuTheme) {
            this.menuTheme = game.add.audio('menuTheme');
            this.menuTheme.play();
        } else {
            this.menuTheme.restart();
        }

        this.menuTheme.loopFull();

        this.button = new Button({
            game: this.game,
            x: this.game.world.centerX - 100,
            y: 240,
            action: this.startGame.bind(this, this.menuTheme)
        });

        this.game.add.existing(this.button);

        this.game.add.bitmapText(this.game.world.centerX - 105, 60, 'carrier_command','Deep Forest', 18);
        this.game.add.bitmapText(this.game.world.centerX - 70, 270, 'carrier_command','Start game', 12);
    }

    startGame(menuTheme) {
        this.game.state.start('Boot');

        menuTheme.pause();
    }
}
