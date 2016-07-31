import Phaser from 'phaser';

import Button from '../menuItems/Button.js';

import BgTile from '../sprites/BgTile.js';

export default class extends Phaser.State {
    create() {
        this.background = new BgTile({
            game,
            tileIndex: 134
        });
        this.game.add.existing(this.background);

        this.winSound = this.game.add.audio('lose');
        this.winSound.play();

        if (!this.menuTheme) {
            this.menuTheme = this.game.add.audio('menuTheme');
            this.menuTheme.play();
        } else {
            this.menuTheme.restart();
        }

        this.menuTheme.loopFull();

        this.button = new Button({
            game: this.game,
            x: this.game.world.centerX - 100,
            y: 240,
            action: this.restart.bind(this, this.menuTheme)
        });

        this.game.add.existing(this.button);

        this.game.add.bitmapText(this.game.world.centerX - 60, 140, 'carrier_command','Loose!', 18);
        this.game.add.bitmapText(this.game.world.centerX - 55, 270, 'carrier_command','Restart', 14);
    }

    restart(menuTheme) {
        this.game.state.start('Boot');

        menuTheme.pause();
    }
}
