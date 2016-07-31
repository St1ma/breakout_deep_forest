import 'pixi';
import 'p2';
import Phaser from 'phaser';

import Menu    from './states/Menu';
import Boot    from './states/Boot';
import Preload from './states/Preload';
import Game    from './states/Game';
import GameOver from './states/GameOver';
import Win      from './states/Win';

class Main extends Phaser.Game {
    constructor () {
        let width = document.documentElement.clientWidth > 700 ? 700 : document.documentElement.clientWidth;
        let height = document.documentElement.clientHeight > 400 ? 400 : document.documentElement.clientHeight;

        super(width, height, Phaser.AUTO, 'content', null);

        this.state.add('Menu', Menu, false);
        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('Game', Game, false);
        this.state.add('GameOver', GameOver, false);
        this.state.add('Win', Win, false);

        this.state.start('Preload');
    }
}

window.game = new Main()
