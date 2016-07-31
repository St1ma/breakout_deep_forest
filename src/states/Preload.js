import Phaser from 'phaser';

export default class extends Phaser.State {
    preload() {
        this.game.load.image('bg', 'assets/bg.png');
        this.game.load.image('paddle', 'assets/platform.png');
        this.game.load.image('brick', 'assets/brick.png');
        this.game.load.image('goldBrick', 'assets/goldBrick.png');
        this.game.load.image('ball', 'assets/axe.png');

        this.game.load.spritesheet('button', 'assets/Button2.png', 400, 172);
        this.game.load.spritesheet('background', 'assets/TileSet.png', 32, 32);

        this.game.load.audio('hit', 'assets/media/wood_hit.wav');
        this.game.load.audio('menuTheme', 'assets/media/menu_theme.ogg');
        this.game.load.audio('theme', 'assets/media/base_theme.ogg');
        this.game.load.audio('win', 'assets/media/send.ogg');
        this.game.load.audio('lose', 'assets/media/lose.ogg');

        this.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    }

    create() {
        this.state.start('Menu');
    }
}
